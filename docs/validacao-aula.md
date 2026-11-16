# Validação da aula — referência de 16/11/2026

Este relatório registra a auditoria da apresentação com 35 slides. Não é uma suite executável nem comprovação automática de versões futuras. Depois de modificar o código, repita as verificações pertinentes e registre o que foi executado.

## Ambiente e alcance da revisão atual

Microsoft Edge real em modo headless, com automação Playwright e inspeção de capturas. A apresentação modular foi servida por HTTP local; o HTML único foi executado por HTTP e como arquivo local. Isso não equivale a ensaio no projetor físico ou nas contas Google da turma.

Os scripts, relatórios e capturas dessa auditoria ficaram na pasta temporária do sistema, fora do repositório. Não há pasta `tests/`, `package.json` ou dependências Node da aplicação para instalar. Os comandos disponíveis no clone estão no [guia de manutenção](README.md) e no [README principal](../README.md).

## Dados de referência

Foram conferidos os 475 registros, os 16 campos do CSV e todas as 6.175 células dos 13 campos incorporados em `js/data.js`. Não houve divergência entre o CSV e essa cópia. Os IDs são distintos, e não foram encontrados campos vazios nem linhas duplicadas no CSV.

| Indicador | Resultado |
|---|---:|
| Registros de venda | 475 |
| Unidades | 909 |
| Faturamento bruto | R$ 54.812,70 |
| Receita após descontos | R$ 52.841,96 |
| Custo dos produtos | R$ 32.787,00 |
| Lucro bruto simplificado | R$ 20.054,96 |
| Margem ponderada: lucro agregado ÷ receita agregada | 37,95% |

Maio para junho: receita de R$ 7.686,24 para R$ 7.022,65, redução de R$ 663,59 ou 8,63%. A comparação de escalas usa esses mesmos valores, com bases verticais 0 e 6.800 e teto 8.000. Ela não demonstra perda de clientes nem causa da variação.

As contas somam os valores monetários já registrados por linha no CSV. Recalcular descontos com outra regra de arredondamento pode mudar centavos. O XLSX original soma R$ 52.841,89 de receita e R$ 20.054,89 de lucro, ambos R$ 0,07 abaixo do CSV, por precisão das fórmulas. Os originais foram preservados; a atividade usa o CSV em todas as ferramentas.

## Cenários exercitados na revisão atual

- As seis consultas de exemplo foram conferidas célula a célula contra o CSV: registros iniciais, filtro, contagem/unidades, receita mensal, receita por categoria e pedidos por canal. Totais e agrupamentos coincidiram com cálculos independentes.
- Número e reais mudaram a formatação da tabela, dos tooltips e do eixo, mantendo os valores e a geometria das barras. Contagens reconhecidas não receberam formatação monetária.
- Taxa já calculada em fração e participação no total foram tratadas separadamente. Participação usou todas as linhas retornadas antes do limite visual de 20, preservando os valores originais; zero e negativos não produziram participação.
- Foram exercitados categorias numéricas, troca de indicador, médias, frações pequenas, nulos, zeros e negativos. Frações pequenas não apareceram indevidamente como zero na apresentação numérica. Dois totais em uma linha não viraram automaticamente categoria e indicador de um gráfico.
- Tabela e gráfico usaram as mesmas primeiras 20 linhas, com limite informado e rótulos densos dentro do SVG. SQL inválido, coluna inexistente, retorno vazio, múltiplas instruções e tentativa de escrita produziram estados apropriados.
- Editar a consulta invalidou o resultado anterior e cancelou a execução pendente. Uma resposta antiga não substituiu o erro de uma consulta posterior.
- O SQL executou no Worker com a biblioteca local e WASM incorporado, sem fetch separado de `.wasm` nem execução do fornecedor na thread dos controles. Foram exercitados falha e recuperação, preparação concorrente, reset, erro de sintaxe e liberação de URLs de Blob.
- Preparação acima de 15 segundos e consulta acima de oito segundos encerraram o Worker e permitiram nova tentativa. Uma consulta de cerca de 50,9 bilhões de combinações foi interrompida enquanto a navegação permanecia disponível. A consulta seguinte retornou `COUNT(*) = 475`. O cenário passou na versão modular e no HTML único por HTTP e arquivo local.
- Os 35 slides e suas 35 falas foram conferidos: IDs únicos, contador, limites, títulos, botões, teclado e notas. Foram feitas 105 verificações de layout: 35 slides em 1280×720, 1920×1080 e 390×844, sem transbordamento horizontal externo.
- Os quatro quizzes tiveram erro/acerto, feedback e persistência exercitados. Typewriter passou com movimento normal/reduzido e saída/reinício. Foco no editor não acionou navegação involuntária; Ctrl+Enter executou.
- Cópia real do prompt, fallback com seleção integral e entrada/saída de tela cheia passaram no Edge headless. O explorador foi conferido para a base completa e as quatro categorias, incluindo indicadores, seis totais mensais, tooltips e geometria das barras.
- Não foram registrados erros JavaScript sem tratamento nos cenários funcionais testados. Os comandos de geração e verificação passaram para dados, versões dos recursos e HTML único.

A narrativa mantém problema → perguntas → indicadores → dados → ferramentas → validação, com SQL explicado antes do laboratório. Demonstração, prática guiada e investigação em duplas estão distribuídas nos 180 minutos. Hipóteses não são apresentadas como causas comprovadas, e lucro bruto simplificado não é tratado como lucro líquido.

## O que continua pendente

Projetor físico, condução com a turma, duração real dos blocos e importação/conversa nas contas Google dos participantes precisam de ensaio. Os passos das ferramentas e os formatos aceitos devem ser conferidos novamente antes da aula se houver mudança no serviço.

Não há integração de IA ao site. A validação do laboratório local não comprova que uma ferramenta externa respondeu ou calculou corretamente. O build verifica dados derivados e versões dos recursos; não substitui a execução dos cenários no navegador.

## Histórico de 15/11/2026

O registro abaixo documenta etapas anteriores. Nomes de módulos, testes, cópias de dados, downloads e contagens de slides podem ter sido substituídos; não devem ser interpretados como estrutura atual ou tarefas pendentes.

<details>
<summary>Consultar validações anteriores</summary>

### Validação anterior — 15/11/2026

Ambiente: Microsoft Edge real em modo headless, servido em http://localhost:5500. Testes executados via Playwright; capturas examinadas para leitura, títulos e layout. Não equivale a ensaio em projetor físico.

## Investigação contínua

A revisão final tem 35 slides e mantém 180 minutos. O caso da Loja Horizonte aparece antes dos fundamentos e é retomado na entrega final à gerência. Foram incluídas quatro verificações com reflexão individual, discussão em dupla e feedback explicado; a avaliação contempla pergunta, indicador, visualização e interpretação. A prática autônoma foi ajustada para 30 minutos, reservando 10 minutos para leitura crítica e critérios.

`tests/investigation.cjs` foi executado antes da implementação e falhou pelos recursos ausentes. Na versão final passou em: caso antes dos modelos, ritmo visível, respostas erradas/certas, explicação persistente sem avançar o slide, rubrica com quatro critérios e quizzes no HTML único. Os gráficos usam maio R$7.686,24 e junho R$7.022,65, conferidos independentemente no CSV. Geometria das barras validada para bases 0 e 6800, teto 8000 e mesma altura útil. Nenhuma inferência de causa ou clientes é apresentada como comprovada.

Os 35 slides foram percorridos em 1280×720, 1920×1080 e 390×844, sem corte horizontal externo e sem rolagem de slide no projetor. Tabelas/editor/prompt podem ter rolagem interna. As verificações são locais e não coletam identificação ou nota de alunos.

## Etapa anterior: ferramentas e metodologia

A apresentação agora tem 28 slides. Os slides 13–16 incluem abertura das ferramentas, envio manual do CSV pelo aluno, prompt selecionável com botão de cópia, tabela dinâmica/gráfico e conferência. A identificação SYS.INIT foi substituída por 8º semestre. O roteiro conserva 180 minutos, com demonstração, prática guiada e atividade autônoma.

`tests/activities.cjs` inicialmente falhou pela ausência de prompt visível. Após implementação, verificou cópia real da área de transferência no Edge, texto preservado (normalizando CRLF do Windows), foco sem navegação involuntária, downloads locais do guia/prompts/base e a mesma interação no HTML único.

A compatibilidade do plano gratuito com CSV e Google Planilhas foi verificada na documentação oficial em 15/11/2026. Não foi realizado upload nem teste de resposta em conta Google. O roteiro externo e seus menus precisam ser ensaiados na conta da turma.

Na inspeção do XLSX, foi confirmada a aba Vendas com 476 linhas (cabeçalho + 475 registros), além de Comece aqui, Dicionário e Atividade. As fórmulas de receita mantêm mais casas decimais: seus valores somam R$52.841,89, enquanto a soma dos valores do CSV é R$52.841,96. A diferença de R$0,07 não foi corrigida nos arquivos originais: toda a prática passa a usar o CSV. Ele tem ponto decimal, como 84.9; as instruções de importação respeitam esse formato antes da exibição em reais.

## Diagnóstico e correções

O erro original `both async and sync fetching of the wasm failed` não se reproduziu nesta máquina: a distribuição anterior executou a consulta mensal e as URLs remotas JS/WASM responderam HTTP 200. Não há evidência para atribuir a falha original a um CDN indisponível.

A distribuição oficial sql.js 1.16.0 com WASM incorporado foi incluída em vendor, eliminando o fetch separado do binário e a dependência de CDN para o mecanismo SQL. O teste da aplicação final não registrou nenhuma requisição `.wasm`. Uma falha do script local foi simulada: houve mensagem e botão de nova tentativa; ao restaurar o recurso, o laboratório executou novamente e COUNT(*) retornou 475.

Antes das correções, os testes demonstraram falhas de unidade monetária na contagem, ausência de seleção do indicador, resultado anterior mantido após SQL inválido, estado vazio pouco específico e ausência de retry. Após as correções, essas verificações passaram.

## Dados conferidos

- 475 registros, 16 colunas no CSV; 475 IDs distintos; 909 unidades.
- 13 campos por registro em data.js, confrontados com o CSV sem divergências.
- Receita após descontos: R$ 52.841,96; lucro bruto simplificado: R$ 20.054,96.
- Cópias CSV e XLSX em data/ idênticas, em bytes, às respectivas fontes da raiz. Isso não substitui auditoria das fórmulas internas do XLSX.

| Mês | Registros | Receita após descontos |
|---|---:|---:|
| 2026-05 | 65 | R$ 7.686,24 |
| 2026-06 | 75 | R$ 7.022,65 |
| 2026-07 | 88 | R$ 8.793,77 |
| 2026-08 | 94 | R$ 11.112,14 |
| 2026-09 | 82 | R$ 10.378,56 |
| 2026-10 | 71 | R$ 7.848,60 |

## Verificações efetivas

- SELECT COUNT(*), soma total, receita mensal e pedidos por canal no SQLite real. Receita total e mensal comparadas com cálculo independente do CSV.
- Escolha de indicador quando a consulta retorna duas colunas numéricas; unidade de contagem sem R$.
- Erro de sintaxe/campo inexistente, retorno vazio, bloqueio de DELETE e preservação de 475 registros.
- Falha de carregamento e recuperação sem recarregar a página.
- Navegação por setas, Home e End; setas/F no editor não mudam de slide; notas de fala abrem e fecham.
- Typewriter em movimento normal e conteúdo imediato com reduced-motion.
- Filtro de categorias e restauração da base completa no laboratório de exploração.
- Saída SQL com 475 linhas: tabela e gráfico mostram as mesmas primeiras 20, com aviso explícito.
- Barras negativas com geometria válida, zero e valor nulo sem fabricar quantidade.
- 28 slides percorridos em 1280×720, 1920×1080 e 390×844. Sem corte horizontal externo; sem rolagem vertical de slide nas duas resoluções de projetor. Tabelas/editor/prompt continuam podendo rolar internamente; celular usa rolagem vertical.
- HTML único executa COUNT(*) = 475 mesmo bloqueando as pastas js, css e vendor no teste; mecanismos e recursos locais estão incorporados.
- Nenhum erro JavaScript sem tratamento nos cenários funcionais normais.

## Pendente de ensaio no local

Tela cheia interativa, projetor físico, condução da aula com turma e demonstrações externas de NotebookLM/Gemini/Sheets. Não foi integrada API de IA. A divisão de 180 minutos é uma proposta pedagógica; o tempo real depende da participação da turma.

Reprodução dos testes e geração dos artefatos: README.md. Relatório de dimensões e capturas: tmp/presentation-report.json e tmp/screenshots/.

</details>
