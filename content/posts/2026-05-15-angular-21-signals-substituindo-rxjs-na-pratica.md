---
title: "Angular 21: Signals substituindo RxJS na prática"
slug: angular-21-signals-substituindo-rxjs-na-pratica
description: "Como reduzir carga cognitiva no frontend ao mover estado síncrono de Observables para Signals em cenários reais de interface."
publishedAt: 2026-05-15
readingTime: 8
tags:
  - "Angular 21"
  - "Frontend"
  - "Signals"
draft: false
---

:::context
Durante muito tempo, o Angular foi sinônimo de RxJS. Para qualquer fluxo de dados no frontend, a resposta automática era abrir um `Observable`, encadear operadores e resolver o template com `async` pipe.

Esse modelo continua excelente para fluxos assíncronos orientados a tempo, mas ele também aumentou a carga cognitiva em casos onde o problema real era só refletir estado de interface. Em painéis internos, formulários multi-etapa e dashboards de telemetria, esse custo aparece rápido.
:::

:::core
## O cenário

O caso mais claro apareceu em um dashboard interno onde o componente precisava:

- exibir dados carregados do backend;
- derivar indicadores simples a partir da resposta;
- reagir a interações de filtro sem espalhar subscriptions pelo componente.

![Diagrama comparando o fluxo entre Observable e Signal](/blog/angular-signals-flow.svg)

No modelo antigo, o componente acabava carregando responsabilidades demais: assinatura de fluxo, transformação, sincronização com template e descarte seguro do ciclo de vida.

```ts
data$ = this.api.getTelemetry();

efficiency$ = this.data$.pipe(
  map((data) => data.distance / data.fuelConsumed)
);
```
:::

:::context
O problema não era só o código em si. Era a manutenção daqui a alguns meses. Quando um componente já nasce com esse peso para lidar apenas com estado síncrono, qualquer ajuste pequeno vira uma cadeia de operadores, subjects auxiliares e mais atenção do que o caso realmente exigia.
:::

:::core
## O ganho prático com Signals

Com Signals, o componente ficou mais barato de ler e de alterar. O estado assíncrono veio para um `signal`, e as derivações simples passaram a morar em `computed()`.

```ts
readonly data = toSignal(this.api.getTelemetry());

readonly efficiency = computed(() => {
  const current = this.data();

  if (!current) {
    return 0;
  }

  return current.distance / current.fuelConsumed;
});
```

O efeito imediato foi este:

- menos boilerplate no componente;
- menos risco de `unsubscribe` esquecido;
- template mais direto;
- fronteira mais clara entre estado síncrono e fluxos realmente assíncronos.

Signals não substituem RxJS em tudo. O ponto é outro: usar cada ferramenta na zona onde ela reduz complexidade, em vez de aumentá-la.
:::

:::context
Hoje eu trato RxJS como ferramenta de orquestração e integração, não como reflexo automático de qualquer estado de interface. Essa troca de mentalidade faz diferença principalmente quando o time precisa manter o mesmo código sob pressão de prazo, bugs e evolução contínua de produto.
:::
