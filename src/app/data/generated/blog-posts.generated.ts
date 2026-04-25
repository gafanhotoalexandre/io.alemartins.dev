import type { BlogPost } from '../blog';

export const BLOG_POSTS =
[
  {
    "title": "Angular 21: Signals substituindo RxJS na prática",
    "slug": "angular-21-signals-substituindo-rxjs-na-pratica",
    "description": "Como reduzir carga cognitiva no frontend ao mover estado síncrono de Observables para Signals em cenários reais de interface.",
    "publishedAt": "2026-05-15",
    "readingTime": 8,
    "tags": [
      "Angular 21",
      "Frontend",
      "Signals"
    ],
    "blocks": [
      {
        "kind": "context",
        "html": "<p>Durante muito tempo, o Angular foi sinônimo de RxJS. Para qualquer fluxo de dados no frontend, a resposta automática era abrir um <code>Observable</code>, encadear operadores e resolver o template com <code>async</code> pipe.</p>\n<p>Esse modelo continua excelente para fluxos assíncronos orientados a tempo, mas ele também aumentou a carga cognitiva em casos onde o problema real era só refletir estado de interface. Em painéis internos, formulários multi-etapa e dashboards de telemetria, esse custo aparece rápido.</p>\n"
      },
      {
        "kind": "core",
        "html": "<h2>O cenário</h2>\n<p>O caso mais claro apareceu em um dashboard interno onde o componente precisava:</p>\n<ul>\n<li>exibir dados carregados do backend;</li>\n<li>derivar indicadores simples a partir da resposta;</li>\n<li>reagir a interações de filtro sem espalhar subscriptions pelo componente.</li>\n</ul>\n<p><img src=\"/blog/angular-signals-flow.svg\" alt=\"Diagrama comparando o fluxo entre Observable e Signal\"></p>\n<p>No modelo antigo, o componente acabava carregando responsabilidades demais: assinatura de fluxo, transformação, sincronização com template e descarte seguro do ciclo de vida.</p>\n<pre><code class=\"language-ts\">data$ = this.api.getTelemetry();\n\nefficiency$ = this.data$.pipe(\n  map((data) =&gt; data.distance / data.fuelConsumed)\n);\n</code></pre>\n"
      },
      {
        "kind": "context",
        "html": "<p>O problema não era só o código em si. Era a manutenção daqui a alguns meses. Quando um componente já nasce com esse peso para lidar apenas com estado síncrono, qualquer ajuste pequeno vira uma cadeia de operadores, subjects auxiliares e mais atenção do que o caso realmente exigia.</p>\n"
      },
      {
        "kind": "core",
        "html": "<h2>O ganho prático com Signals</h2>\n<p>Com Signals, o componente ficou mais barato de ler e de alterar. O estado assíncrono veio para um <code>signal</code>, e as derivações simples passaram a morar em <code>computed()</code>.</p>\n<pre><code class=\"language-ts\">readonly data = toSignal(this.api.getTelemetry());\n\nreadonly efficiency = computed(() =&gt; {\n  const current = this.data();\n\n  if (!current) {\n    return 0;\n  }\n\n  return current.distance / current.fuelConsumed;\n});\n</code></pre>\n<p>O efeito imediato foi este:</p>\n<ul>\n<li>menos boilerplate no componente;</li>\n<li>menos risco de <code>unsubscribe</code> esquecido;</li>\n<li>template mais direto;</li>\n<li>fronteira mais clara entre estado síncrono e fluxos realmente assíncronos.</li>\n</ul>\n<p>Signals não substituem RxJS em tudo. O ponto é outro: usar cada ferramenta na zona onde ela reduz complexidade, em vez de aumentá-la.</p>\n"
      },
      {
        "kind": "context",
        "html": "<p>Hoje eu trato RxJS como ferramenta de orquestração e integração, não como reflexo automático de qualquer estado de interface. Essa troca de mentalidade faz diferença principalmente quando o time precisa manter o mesmo código sob pressão de prazo, bugs e evolução contínua de produto.</p>\n"
      }
    ]
  },
  {
    "title": "Performance e prevenção de abuso em uma plataforma jurídica",
    "slug": "performance-e-prevencao-de-abuso-em-uma-plataforma-juridica",
    "description": "Como atacar gargalos de leitura e endurecer rotas públicas de autenticação sem criar uma solução pesada demais para o backend.",
    "publishedAt": "2026-05-02",
    "readingTime": 7,
    "tags": [
      ".NET 10",
      "EF Core",
      "Performance",
      "Segurança"
    ],
    "blocks": [
      {
        "kind": "context",
        "html": "<p>Em uma plataforma jurídica, dois problemas apareciam ao mesmo tempo: consultas críticas sofriam com leituras pouco eficientes e as rotas públicas de autenticação exigiam uma camada melhor de proteção contra abuso automatizado.</p>\n<p>O tipo de situação que cobra disciplina de engenharia é justamente essa combinação. Se eu tratasse performance e segurança como frentes isoladas, acabaria corrigindo sintomas sem fortalecer a base do sistema.</p>\n"
      },
      {
        "kind": "core",
        "html": "<h2>Diagnóstico inicial</h2>\n<p>O primeiro eixo estava nas queries mais acessadas. Havia sinais claros de carregamento desnecessário e um padrão compatível com N+1 em partes sensíveis do fluxo de leitura.</p>\n<p>O segundo eixo aparecia nas tentativas repetidas de autenticação. A superfície pública aceitava mais volume do que deveria antes de impor atrito real ao atacante.</p>\n<p><img src=\"/blog/legal-platform-performance-map.svg\" alt=\"Mapa do fluxo de leitura e proteção por IP\"></p>\n"
      },
      {
        "kind": "core",
        "html": "<h2>Abordagem adotada</h2>\n<p>No backend, a estratégia foi manter o escopo enxuto e atacar o que movia resultado de verdade:</p>\n<ul>\n<li>refatoração das queries críticas com Entity Framework Core para reduzir carregamentos redundantes;</li>\n<li>revisão da modelagem de leitura para deixar mais claro o que precisava ser trazido de fato;</li>\n<li>bloqueio progressivo por IP nas rotas públicas de autenticação;</li>\n<li>reforço da documentação via OpenAPI para acelerar integração e onboarding.</li>\n</ul>\n<pre><code class=\"language-csharp\">var query = dbContext.Processos\n    .AsNoTracking()\n    .Where(item =&gt; item.Status == StatusProcesso.Ativo)\n    .Select(item =&gt; new ProcessoResumoDto(\n        item.Id,\n        item.Numero,\n        item.Cliente.Nome,\n        item.UltimaMovimentacaoEm\n    ));\n</code></pre>\n<p>O ponto importante foi resistir à tentação de criar uma arquitetura paralela só para esse caso. A solução precisava aumentar a confiabilidade, não inaugurar uma nova fonte de complexidade operacional.</p>\n"
      },
      {
        "kind": "context",
        "html": "<p>Boa parte do ganho veio da combinação entre clareza de leitura e redução de superfície vulnerável. Em sistemas críticos, quase sempre existe valor em preferir uma solução menor, mas previsível, antes de partir para algo mais sofisticado do que o contexto realmente exige.</p>\n"
      },
      {
        "kind": "core",
        "html": "<h2>Impacto observado</h2>\n<ul>\n<li>redução estimada de 15% no tempo médio de resposta das consultas otimizadas;</li>\n<li>mitigação mais consistente das tentativas automatizadas de brute force;</li>\n<li>onboarding mais ágil por causa da documentação mais padronizada.</li>\n</ul>\n<p>O case reforçou uma regra que tento aplicar com frequência: quando performance e segurança competem por atenção, a melhor resposta costuma ser escolher uma intervenção pequena e bem posicionada em cada frente, em vez de uma reformulação grandiosa e lenta demais para produzir valor.</p>\n"
      }
    ]
  }
] satisfies readonly BlogPost[];
