# Identidade visual e arquitetura técnica

## Paleta Retro-Tech & Matcha (imutável sem solicitação)
| Função | Cor | HEX |
|---|---|---|
| Fundo creme analógico | Creme | `#FBFBF8` |
| Grids e divisórias | Pistache suave | `#D8E2DC` |
| Texto principal | Verde-petróleo profundo | `#1D3532` |
| Destaque estrutural | Jade/verdigris | `#3D7A6E` |
| Acento para IA/alertas | Coral vintage | `#E07A5F` |

## Tipografia e estilo
- Lora (editorial, títulos), Space Mono (código e elementos técnicos), via Google Fonts.
- Aparência de apostila de laboratório/terminal vintage; grid fino, pequenos rótulos monoespaçados, bordas precisas, sombras secas, espaços em branco generosos.
- Não transformar o deck em tema cyberpunk/neon. Coral deve ser acento pontual.
- Evitar ruído/granulação muito intensa; não afetar legibilidade no projetor.
- Layout 16:9, ocupação segura e margens adequadas para projetores; não permitir corte de conteúdo.

## Motion graphics
- Primariamente slides estáticos com animação didática apenas onde ajuda explicar transformações.
- Movimento stepped/mecânico, microtransições sem bounce; efeito typewriter com cursor `_` ou bloco para revelar definições/comandos curtos.
- Mostrar dado bruto → tabela → indicador → gráfico, ou pergunta → SELECT → resultado → gráfico.
- Suportar preferência de redução de movimento (`prefers-reduced-motion`).
- Animações não devem disputar atenção com códigos longos nem impedir avanço manual.

## Código atual conferido
A apresentação possui 35 slides em HTML, CSS e JS puro. Tailwind e Google Fonts usam internet; SQLite é distribuído localmente. Não há framework, backend ou instalação de pacotes necessária para executar o deck.

```text
index.html                           # Shell e dependências
css/theme.css                        # Paleta e estilos/ratio
js/app.js                            # Navegação e fullscreen
js/slides.js                         # Conteúdo, falas e montagem dos 35 slides
js/animations.js                     # Efeito typewriter
js/visuals.js                        # Gráficos SVG + indicadores
js/activities.js                     # Prompts, cópia e verificações de aprendizagem
js/sql-lab.js                        # Editor, exemplos, resultados e estados da interface
js/sql-engine.js                     # SQLite em Worker, cancelamento e timeouts
js/data.js                           # Array 475 registros derivados
scripts/build.py                     # Dados, versões de recursos e HTML único opcional
scripts/export-roteiro.cjs           # Roteiro e prompts derivados dos módulos
vendor/sql.js/                       # sql-wasm-inline.js e licença MIT
apresentacao_arquivo_unico.html       # Exportação local opcional, ignorada pelo Git
base_vendas_analise_com_ia.csv      # Base canônica na raiz
base_vendas_analise_com_ia.xlsx      # Apoio original preservado, com precisão diferente
```

### Organização dos slides
- 1–5: abertura do caso, dados e informação.
- 6–8: modelos de análise, verificação e analogia.
- 9–12: problema, perguntas, indicadores e verificação.
- 13–14: base e laboratório de exploração.
- 15–19: ferramentas e prática guiada NotebookLM → Planilhas.
- 20–29: SQL progressivo, verificação e laboratório.
- 30–32: leitura crítica de gráficos e critérios de avaliação.
- 33: investigação autônoma em duplas.
- 34–35: conferência, conclusão e próxima investigação.

`js/slides.js` monta `window.DECK_SLIDES` e `window.LESSON_NOTES`; `js/app.js` injeta os slides e controla a navegação. Preserve IDs únicos e a correspondência entre slides e falas. O botão Roteiro mostra as notas na própria tela projetada; não é uma segunda tela privada.

### Execução SQL
- `CourseSqlEngine.prepare(rows)`, `execute(query)` e `reset()` são a interface entre o laboratório e o Worker.
- O Worker cria a tabela a partir dos 475 registros de `SALES_DATA`, ativa `PRAGMA query_only` e executa SQLite em memória.
- Preparação: até 15 segundos. Consulta: até 8 segundos. Timeout/reset encerra o Worker, rejeita promessas pendentes e libera a URL Blob; uma nova preparação permite retry.
- O modular usa `importScripts()` com URL absoluta do vendor local. O build do HTML único guarda o vendor em `script type="text/plain" id="sql-vendor-source"` para compor o Worker, sem executar a biblioteca no thread principal.
- `js/sql-lab.js` invalida respostas obsoletas e cancela a execução ao editar ou iniciar outra consulta. Preserve essa proteção de concorrência.

## Regras de engenharia
- No curto prazo, manter HTML/CSS/JS puro; separar conteúdo de renderização.
- Não editar dados, roteiro ou HTML único derivados manualmente; use os scripts existentes. O CSV é a referência numérica; o XLSX original não coincide centavo a centavo.
- Manter a fonte editável nos módulos, a formatação de `.prettierrc.json` e a biblioteca do fornecedor intacta. Não adicionar `node_modules` ao repositório.
- Testar navegação com teclado e pointer, acessibilidade de estados, legibilidade em 1280×720 e 1920×1080.
- Setas, PageUp/PageDown e Home/End navegam; F alterna tela cheia; N abre roteiro. No editor e seletores, preserve o teclado nativo; Ctrl+Enter executa SQL.
- Não usar bibliotecas só pelo efeito visual: preferir gráficos SVG simples existentes.
- Testes e comandos de manutenção disponíveis estão em `PLANO_DE_TRABALHO.md`; não há suíte `npm test` no projeto.
