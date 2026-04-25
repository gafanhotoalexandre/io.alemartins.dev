import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const projectRoot = process.cwd();
const postsDir = path.join(projectRoot, 'content', 'posts');
const outputDir = path.join(projectRoot, 'src', 'app', 'data', 'generated');
const outputFile = path.join(outputDir, 'blog-posts.generated.ts');

const markdown = new MarkdownIt({
	html: false,
	linkify: true,
	typographer: false,
});

async function main() {
	const fileNames = (await fs.readdir(postsDir)).filter((fileName) => fileName.endsWith('.md')).sort();
	const posts = [];

	for (const fileName of fileNames) {
		const filePath = path.join(postsDir, fileName);
		const rawContent = await fs.readFile(filePath, 'utf8');
		const { data, content } = matter(rawContent);
		const frontmatter = validateFrontmatter(data, filePath);

		if (frontmatter.draft) {
			continue;
		}

		posts.push({
			title: frontmatter.title,
			slug: frontmatter.slug,
			description: frontmatter.description,
			publishedAt: frontmatter.publishedAt,
			readingTime: frontmatter.readingTime,
			tags: frontmatter.tags,
			blocks: parseBlocks(content, filePath),
		});
	}

	posts.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

	await fs.mkdir(outputDir, { recursive: true });
	await fs.writeFile(
		outputFile,
		[
			"import type { BlogPost } from '../blog';",
			'',
			'export const BLOG_POSTS = ',
			`${JSON.stringify(posts, null, 2)} satisfies readonly BlogPost[];`,
			'',
		].join('\n'),
		'utf8',
	);

	console.log(`Generated ${posts.length} blog post(s) into ${path.relative(projectRoot, outputFile)}`);
}

function validateFrontmatter(data, filePath) {
	const title = readString(data.title, 'title', filePath);
	const slug = readString(data.slug, 'slug', filePath);
	const description = readString(data.description, 'description', filePath);
	const publishedAt = readDate(data.publishedAt, 'publishedAt', filePath);
	const readingTime = readNumber(data.readingTime, 'readingTime', filePath);
	const draft = readBoolean(data.draft ?? false, 'draft', filePath);
	const tags = readTags(data.tags, filePath);

	if (!/^[a-z0-9-]+$/.test(slug)) {
		throw new Error(`Invalid slug in ${filePath}. Use only lowercase letters, numbers and hyphens.`);
	}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
		throw new Error(`Invalid publishedAt in ${filePath}. Expected YYYY-MM-DD.`);
	}

	return { title, slug, description, publishedAt, readingTime, draft, tags };
}

function readString(value, fieldName, filePath) {
	if (typeof value !== 'string' || value.trim().length === 0) {
		throw new Error(`Missing or invalid ${fieldName} in ${filePath}.`);
	}

	return value.trim();
}

function readNumber(value, fieldName, filePath) {
	if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
		throw new Error(`Missing or invalid ${fieldName} in ${filePath}.`);
	}

	return value;
}

function readDate(value, fieldName, filePath) {
	if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value;
	}

	if (value instanceof Date && !Number.isNaN(value.getTime())) {
		return value.toISOString().slice(0, 10);
	}

	throw new Error(`Missing or invalid ${fieldName} in ${filePath}.`);
}

function readBoolean(value, fieldName, filePath) {
	if (typeof value !== 'boolean') {
		throw new Error(`Missing or invalid ${fieldName} in ${filePath}.`);
	}

	return value;
}

function readTags(value, filePath) {
	if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || item.trim().length === 0)) {
		throw new Error(`Missing or invalid tags in ${filePath}.`);
	}

	return value.map((item) => item.trim());
}

function parseBlocks(content, filePath) {
	const lines = content.replace(/\r\n/g, '\n').split('\n');
	const blocks = [];
	let currentKind = null;
	let currentLines = [];
	let sawExplicitBlock = false;

	const flushBlock = () => {
		if (!currentKind) {
			return;
		}

		const source = currentLines.join('\n').trim();
		if (source.length > 0) {
			blocks.push({ kind: currentKind, html: markdown.render(source) });
		}

		currentKind = null;
		currentLines = [];
	};

	for (const line of lines) {
		const startMatch = line.match(/^:::(core|context)\s*$/);

		if (startMatch) {
			if (currentKind) {
				throw new Error(`Nested blog block found in ${filePath}.`);
			}

			sawExplicitBlock = true;
			currentKind = startMatch[1];
			currentLines = [];
			continue;
		}

		if (/^:::\s*$/.test(line)) {
			if (!currentKind) {
				throw new Error(`Closing blog block without opener in ${filePath}.`);
			}

			flushBlock();
			continue;
		}

		if (!currentKind) {
			if (line.trim().length === 0) {
				continue;
			}

			if (sawExplicitBlock) {
				throw new Error(`Found content outside :::core/:::context blocks in ${filePath}.`);
			}
			continue;
		}

		currentLines.push(line);
	}

	if (currentKind) {
		throw new Error(`Unclosed blog block in ${filePath}.`);
	}

	if (!sawExplicitBlock) {
		const source = content.trim();
		return source ? [{ kind: 'core', html: markdown.render(source) }] : [];
	}

	return blocks;
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
