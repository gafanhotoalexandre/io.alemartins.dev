# io.alemartins.dev

Este é o meu portfólio pessoal, construído com Angular 21, Standalone Components, Signals e prerendering/SSG. A ideia do projeto é manter uma base simples de atualizar, com o conteúdo do currículo separado da interface e a navegação entre seções controlada por estado reativo.

## Sobre o projeto

Eu organizei a aplicação como uma landing page com quatro seções principais:

- Sobre
- Experiência
- Stack
- Contato

A troca entre as seções é feita por tabs com `signal`, e a URL acompanha a aba ativa via hash. Isso permite links diretos e mantém a experiência rápida tanto no desktop quanto no mobile.

O conteúdo textual, links e metadados ficam centralizados em [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts), então eu não preciso mexer no HTML principal para atualizar informações do portfólio.

## Tecnologias

- Angular 21
- Standalone Components
- Signals
- Control flow nativo do Angular (`@if`, `@for`, `@switch`)
- Tailwind CSS v4
- SSR/SSG com hydration
- Vitest
- Fonte local com `@fontsource/inter`

## Estrutura

- [src/app/app.ts](src/app/app.ts): shell principal da aplicação e controle das tabs
- [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts): dados tipados do portfólio
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
npm test
```

## Atualizando o conteúdo

Quando eu quiser alterar o portfólio, normalmente eu mexo primeiro em [src/app/data/portfolio-data.ts](src/app/data/portfolio-data.ts). A partir dali eu consigo atualizar textos, experiências, stack, links e CTA sem precisar reorganizar a interface.

## Observações de implementação

- A aplicação já está preparada para prerendering/SSG.
- O layout foi pensado para desktop e mobile.
- A foto de perfil vem de uma URL externa do GitHub.
- O projeto usa Tailwind diretamente pelo pipeline do Angular, sem config manual extra do Tailwind.
