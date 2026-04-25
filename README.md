# io.alemartins.dev

Este é o meu portfólio pessoal, construído com Angular 21, Standalone Components e prerendering. O projeto combina páginas estáticas para o portfólio com uma área de blog alimentada por Markdown versionado no repositório.

## Sobre o projeto

Hoje a aplicação é organizada com rotas reais prerenderizadas:

- `/`
- `/experience`
- `/stack`
- `/contact`
- `/blog`
- `/blog/:slug`

O conteúdo principal do portfólio continua centralizado em [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts). Já o blog usa arquivos Markdown em [content/posts](content/posts), convertidos em build-time para dados consumidos pelo Angular.

Além da navegação real por rota, o projeto já possui uma camada de SEO por página com canonical, Open Graph, Twitter Cards e JSON-LD.

## Tecnologias

- Angular 21
- Standalone Components
- Signals
- Control flow nativo do Angular (`@if`, `@for`, `@switch`)
- Tailwind CSS v4
- SSR/SSG com hydration
- Markdown + geração de conteúdo em build-time
- Vitest
- Fonte local com `@fontsource/inter`

## Estrutura

- [src/app/app.ts](src/app/app.ts): shell principal da aplicação, troca de layout entre portfólio e blog e metadata por rota
- [src/app/app.routes.ts](src/app/app.routes.ts): rotas prerenderizadas do portfólio e do blog
- [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts): dados tipados do portfólio
- [src/app/data/blog.ts](src/app/data/blog.ts): tipos e helpers do blog
- [src/app/data/generated/blog-posts.generated.ts](src/app/data/generated/blog-posts.generated.ts): conteúdo gerado a partir do Markdown
- [content/posts](content/posts): posts em Markdown com frontmatter
- [scripts/generate-blog-content.mjs](scripts/generate-blog-content.mjs): pipeline de geração do conteúdo do blog
- [src/app/components/](src/app/components): componentes de header, navegação mobile e seções
- [src/styles.css](src/styles.css): estilos globais, utilitários e animações da interface

## Como rodar localmente

```bash
npm install
npm start
```

Depois disso, eu acesso a aplicação em `http://localhost:4200/`.

## Scripts úteis

```bash
npm start
npm run build
npm run watch
npm run build:blog-content
npm test
```

### O que cada script faz

- `npm run build:blog-content`: lê os arquivos Markdown em `content/posts`, valida o frontmatter, converte o conteúdo para HTML, atualiza `src/app/data/generated/blog-posts.generated.ts` e também atualiza `public/sitemap.xml`.
- `npm start`: executa `prestart`, então o conteúdo do blog é gerado antes de subir o servidor de desenvolvimento com `ng serve`.
- `npm run build`: executa `prebuild`, então gera os dados do blog antes do build de produção com `ng build`.
- `npm run watch`: executa `prewatch`, gera o conteúdo uma vez e depois entra no watch do Angular.
- `npm test`: executa `pretest`, então os testes sempre partem do Markdown mais recente antes do `ng test`.

Esses scripts existem para evitar drift entre o Markdown, o arquivo gerado e o build final. Na prática, a ideia é que você não precise lembrar de um comando manual antes de servir, testar ou buildar o projeto.

## Atualizando o conteúdo

Quando eu quiser alterar o portfólio, normalmente eu mexo primeiro em [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts). A partir dali eu consigo atualizar textos, experiências, stack, links e CTA sem precisar reorganizar a interface.

Para o blog, eu escrevo ou edito arquivos em [content/posts](content/posts). O build gera automaticamente o módulo tipado em [src/app/data/generated/blog-posts.generated.ts](src/app/data/generated/blog-posts.generated.ts).

## Fluxo editorial do blog

### Criando um novo post

1. Criar um arquivo `.md` em [content/posts](content/posts).
2. Usar de preferência a convenção `YYYY-MM-DD-slug.md`.

Exemplo:

```text
content/posts/2026-05-20-meu-novo-post.md
```

Essa nomenclatura não é exigida pelo gerador, mas é a melhor convenção no contexto atual porque deixa o repositório organizado por data e reduz ambiguidade editorial.

3. Preencher o frontmatter com o contrato mínimo atual:

```md
---
title: "Meu novo post"
slug: meu-novo-post
description: "Resumo curto para listagem e SEO."
publishedAt: 2026-05-20
readingTime: 6
tags:
	- "Angular"
	- "Arquitetura"
draft: false
---
```

4. Escrever o corpo usando, quando fizer sentido, os blocos editoriais:

- `:::core`: conteúdo essencial, que continua visível no Modo Objetivo.
- `:::context`: contexto, narrativa e aprofundamento, que ficam ocultos no Modo Objetivo.

Exemplo:

```md
:::context
Aqui entra a motivação, a história ou o enquadramento do problema.
:::

:::core
## Solução

Aqui entra a parte mais objetiva do artigo.
:::
```

Se você não usar esses blocos, o gerador trata o conteúdo inteiro como `core`.

5. Rodar qualquer um destes fluxos:

- `npm start`
- `npm run build`
- `npm test`
- `npm run build:blog-content` se você quiser apenas validar a geração do conteúdo

6. Depois da geração:

- o arquivo [src/app/data/generated/blog-posts.generated.ts](src/app/data/generated/blog-posts.generated.ts) é atualizado;
- o [public/sitemap.xml](public/sitemap.xml) passa a refletir os slugs publicados;
- a listagem em `/blog` passa a consumir esse novo post;
- a rota `/blog/:slug` entra no prerender automaticamente.

### Editando um post já publicado

O fluxo é o mesmo: você edita o `.md` original e roda um fluxo que acione a geração do blog.

Ou seja, a fonte de verdade é sempre o Markdown em [content/posts](content/posts), não o arquivo gerado. O arquivo gerado só espelha o estado atual do conteúdo para o Angular conseguir listar, navegar e prerenderizar os artigos.

## O que acontece por baixo dos panos

O pipeline atual é este:

```text
content/posts/*.md
-> scripts/generate-blog-content.mjs
-> src/app/data/generated/blog-posts.generated.ts
-> src/app/data/blog.ts
-> /blog e /blog/:slug
-> prerender via src/app/app.routes.server.ts
```

Na prática:

- a listagem do blog lê os posts do módulo gerado;
- a página do artigo busca o post pelo `slug`;
- o prerender usa os mesmos slugs para gerar as rotas estáticas.

Isso evita múltiplas fontes de verdade para o mesmo conteúdo.

## Arquivos versionados ou ignorados

- `scripts/generate-blog-content.mjs` deve subir para o repositório. Ele faz parte do código-fonte do projeto e define como o blog existe.
- `src/app/data/generated/blog-posts.generated.ts` continua versionado no Git nesta fase. Isso deixa o build mais reproduzível, facilita revisão de diffs e simplifica rollback de conteúdo.

Neste momento, a recomendação não é colocar nenhum dos dois no `.gitignore`.

Se o blog crescer muito no futuro, a política do arquivo gerado pode ser reavaliada. Para o contexto atual, manter versionado é a opção mais simples e previsível.

## Deploy

Hoje o projeto já está em uma situação boa para deploy.

- O build local já está passando.
- O gerador do blog já roda antes do build de produção.
- O sitemap já está sendo derivado da mesma fonte editorial.
- O projeto continua com `outputMode: server` no Angular, mas com rotas do blog prerenderizadas.

Na Vercel, o ponto importante é o comando de build continuar sendo `npm run build`.

Com isso, o fluxo fica:

```text
Vercel
-> npm run build
-> prebuild
-> npm run build:blog-content
-> ng build
```

Então, antes de subir para produção, o check recomendado continua sendo simplesmente:

```bash
npm run build
```

Se esse comando passou localmente, o deploy já está em boa condição para seguir.

## Sobre syntax highlighting

Os blocos de código já têm estilo base em [src/styles.css](src/styles.css), mas ainda não usam uma biblioteca de highlight.

Essa decisão foi consciente para manter o V1 enxuto:

- menos dependências;
- zero custo extra de runtime para highlight;
- menos moving parts no pipeline editorial.

Se os artigos começarem a depender mais de trechos de código, a melhor próxima etapa tende a ser highlight em build-time, provavelmente com Shiki, não highlight client-side. Por enquanto, a utilidade prática ainda não justificou a complexidade adicional.

## Observações de implementação

- A aplicação já está preparada para prerendering/SSG.
- O blog V1 já possui listagem, artigo por slug, busca simples e Modo Objetivo.
- O sitemap agora é gerado pelo mesmo pipeline editorial do blog.
- O layout foi pensado para desktop e mobile.
- A foto de perfil vem de uma URL externa do GitHub.
- O projeto usa Tailwind diretamente pelo pipeline do Angular, sem config manual extra do Tailwind.
