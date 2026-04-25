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
npm run build:blog-content
npm test
```

## Atualizando o conteúdo

Quando eu quiser alterar o portfólio, normalmente eu mexo primeiro em [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts). A partir dali eu consigo atualizar textos, experiências, stack, links e CTA sem precisar reorganizar a interface.

Para o blog, eu escrevo ou edito arquivos em [content/posts](content/posts). O build gera automaticamente o módulo tipado em [src/app/data/generated/blog-posts.generated.ts](src/app/data/generated/blog-posts.generated.ts).

## Observações de implementação

- A aplicação já está preparada para prerendering/SSG.
- O blog V1 já possui listagem, artigo por slug, busca simples e Modo Objetivo.
- O layout foi pensado para desktop e mobile.
- A foto de perfil vem de uma URL externa do GitHub.
- O projeto usa Tailwind diretamente pelo pipeline do Angular, sem config manual extra do Tailwind.
