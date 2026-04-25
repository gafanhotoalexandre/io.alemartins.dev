---
title: "Performance e prevenção de abuso em uma plataforma jurídica"
slug: performance-e-prevencao-de-abuso-em-uma-plataforma-juridica
description: "Como atacar gargalos de leitura e endurecer rotas públicas de autenticação sem criar uma solução pesada demais para o backend."
publishedAt: 2026-05-02
readingTime: 7
tags:
  - ".NET 10"
  - "EF Core"
  - "Performance"
  - "Segurança"
draft: false
---

:::context
Em uma plataforma jurídica, dois problemas apareciam ao mesmo tempo: consultas críticas sofriam com leituras pouco eficientes e as rotas públicas de autenticação exigiam uma camada melhor de proteção contra abuso automatizado.

O tipo de situação que cobra disciplina de engenharia é justamente essa combinação. Se eu tratasse performance e segurança como frentes isoladas, acabaria corrigindo sintomas sem fortalecer a base do sistema.
:::

:::core
## Diagnóstico inicial

O primeiro eixo estava nas queries mais acessadas. Havia sinais claros de carregamento desnecessário e um padrão compatível com N+1 em partes sensíveis do fluxo de leitura.

O segundo eixo aparecia nas tentativas repetidas de autenticação. A superfície pública aceitava mais volume do que deveria antes de impor atrito real ao atacante.

![Mapa do fluxo de leitura e proteção por IP](/blog/legal-platform-performance-map.svg)
:::

:::core
## Abordagem adotada

No backend, a estratégia foi manter o escopo enxuto e atacar o que movia resultado de verdade:

- refatoração das queries críticas com Entity Framework Core para reduzir carregamentos redundantes;
- revisão da modelagem de leitura para deixar mais claro o que precisava ser trazido de fato;
- bloqueio progressivo por IP nas rotas públicas de autenticação;
- reforço da documentação via OpenAPI para acelerar integração e onboarding.

```csharp
var query = dbContext.Processos
    .AsNoTracking()
    .Where(item => item.Status == StatusProcesso.Ativo)
    .Select(item => new ProcessoResumoDto(
        item.Id,
        item.Numero,
        item.Cliente.Nome,
        item.UltimaMovimentacaoEm
    ));
```

O ponto importante foi resistir à tentação de criar uma arquitetura paralela só para esse caso. A solução precisava aumentar a confiabilidade, não inaugurar uma nova fonte de complexidade operacional.
:::

:::context
Boa parte do ganho veio da combinação entre clareza de leitura e redução de superfície vulnerável. Em sistemas críticos, quase sempre existe valor em preferir uma solução menor, mas previsível, antes de partir para algo mais sofisticado do que o contexto realmente exige.
:::

:::core
## Impacto observado

- redução estimada de 15% no tempo médio de resposta das consultas otimizadas;
- mitigação mais consistente das tentativas automatizadas de brute force;
- onboarding mais ágil por causa da documentação mais padronizada.

O case reforçou uma regra que tento aplicar com frequência: quando performance e segurança competem por atenção, a melhor resposta costuma ser escolher uma intervenção pequena e bem posicionada em cada frente, em vez de uma reformulação grandiosa e lenta demais para produzir valor.
:::
