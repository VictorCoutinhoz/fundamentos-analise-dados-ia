---
name: fundamentos-dados-ia
description: "Desenvolver, corrigir e ampliar a apresentação web interativa do curso Fundamentos de Análise de Dados e Aplicações em IA, usando estética Retro-Tech & Matcha, didática para iniciantes, planilha fictícia, gráficos e laboratório SQL SELECT."
---

# Skill: Fundamentos de Análise de Dados e Aplicações em IA

## Quando aplicar
Use esta skill para qualquer solicitação envolvendo o curso: revisão de roteiro, criação de slides, interações didáticas, gráficos, tratamento da planilha, SQL/SQLite WASM, layout, refatorações, testes e preparação para apresentação.

## Orientação principal
Este é **um curso introdutório para universitários sem pré-requisitos de programação**, não um treinamento avançado de IA ou de bancos de dados. A competência prioritária é **formular boas perguntas e validar respostas baseadas em dados**. A tecnologia serve à pergunta, e não o contrário.

Leia as referências conforme a tarefa:
- `references/PROJETO_E_METODOLOGIA.md`: público, duração, pedagogia, objetivos, temas e organização dos apresentadores.
- `references/DESIGN_E_ARQUITETURA.md`: paleta, acessibilidade, motion, arquivos, arquitetura atual e diretrizes de expansão.
- `references/DADOS_E_SQL.md`: base canônica, campos, modelagem SQLite e desafios `SELECT`.
- `references/PLANO_DE_TRABALHO.md`: falha atual, ordem de correção, aceitação e roadmap.

## Estado atual (não confundir com funcionalidades planejadas)
- O projeto **já possui oito slides**: seis slides de introdução/fundamentos e dois laboratórios (exploração e SQL).
- Foi derivado de uma apresentação HTML/CSS/JS original de seis slides. A versão modular usa `index.html`, `css/theme.css`, `js/*.js` e possui uma cópia HTML única.
- O tema e os gráficos já aparecem no código. O laboratório SQL usa `sql.js` e SQLite em memória, mas **há falha de carregamento do `.wasm` reportada pelo usuário**.
- Falta a introdução pedagógica de SQL, `SELECT`, `FROM`, `WHERE`, agregação e agrupamento antes de mostrar o editor.
- Há cópias dos dados em CSV/XLSX e um `window.SALES_DATA` incorporado em `js/data.js`; a sincronização precisa ser controlada.
- O usuário continuará a elaborar o roteiro, e o conteúdo novo deve ser adicionado sem sobrescrever sua narrativa.

## Processo obrigatório em cada alteração
1. Inspecione o projeto existente e confirme o estado de `git status`, arquivos, dependências e dados. Não recomece a implementação do zero.
2. Resuma brevemente o comportamento atual e indique os arquivos que pretende alterar.
3. Se a solicitação for ampla, faça implementação em pequenas etapas: correção técnica → fundamentação → interatividade → acabamento.
4. Preserve a semântica dos exemplos, os arquivos CSV/XLSX e os slides originais. Distingua alteração de conteúdo aprovado de sugestão nova.
5. Valide em navegador, não apenas com checagem sintática. Para dados e SQL, compare com cálculos independentes feitos sobre o CSV.
6. Entregue resumo de alterações, testes efetivos, limitações e instruções de execução. Não declare erros corrigidos sem teste.

## Regras pedagógicas
- Explicar conceitos em linguagem simples, com pergunta para a turma, exemplo e aplicação.
- Progressão: **dado → informação → problema → boa pergunta → indicador → base → análise → representação gráfica → validação → conclusão**.
- Os quatro tipos de análise: descritiva, diagnóstica, preditiva e prescritiva. Ensinar que hipótese não é causa provada; projeção simples não é previsão robusta; recomendação depende de objetivos e restrições.
- Manter distinção explícita entre ferramentas: IA pode ajudar a formular consultas, mas SQLite executa `SELECT` e o navegador desenha o gráfico; não alegar que a IA executou algo sem ter executado.
- Antes do slide SQL interativo: abordar o que é SQL, o que é uma tabela, papel de `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `SUM` e `ORDER BY` em exemplos simples. Mostrar de maneira crescente, sem transformar a oficina em curso de bancos de dados.
- Pergunta em linguagem natural → tradução para SQL (com ou sem apoio de IA) → execução real → tabela → gráfico → verificação.
- Encerramento do aluno: formular pergunta, escolher indicador, produzir gráfico, explicar conclusão e validar um valor.

## Regras técnicas
- Preferir HTML/CSS/JS já existentes; TypeScript, ferramentas de build ou framework só se houver benefício explícito e baixo custo de manutenção.
- Preservar o tema Retro-Tech & Matcha e a navegação por teclado; não trocar por apresentação em vídeo ou PowerPoint.
- A aplicação usa internet no local do curso; não investir em modo offline sem solicitação. Ainda assim, o SQL deve carregar e funcionar com estabilidade.
- Executar SQL localmente no navegador, sem SGBD remoto e sem transmitir registros fictícios a serviços externos.
- Manter a base `base_vendas_analise_com_ia.csv` e `.xlsx` na raiz como referência canônica. Evitar versões divergentes entre `js/data.js`, `data/` e a raiz.
- As consultas fornecidas devem ser compatíveis com **SQLite** e com o esquema real; documentar diferenças de PostgreSQL/SQL padrão quando necessário.
- Não construir gráficos sobre dados inventados. Não assumir lucro líquido a partir do campo de lucro bruto simplificado.
- Novas telas interativas devem ter estado de carregamento, estado vazio, erro legível e uma saída verificável.
- Manter os dados locais fictícios e o código seguro: sem segredos, credenciais, eval ou execução de SQL que altere dados.

## Principal bug — WASM
Sintoma reportado: `both async and sync fetching of the wasm failed` ao executar `SELECT`.

Priorizar diagnóstico:
1. Verifique como a página foi aberta (`file://` vs `http://localhost`), console, Network (URL do `.wasm`, HTTP status, CORS, MIME), CDN de `sql.js` e a versão do loader.
2. Inspecione `index.html` e `js/sql-lab.js`. Atualmente o loader é `sql-wasm.js` via CDNJS, e `locateFile` resolve o arquivo WASM nessa CDN.
3. Uma alternativa robusta é `sql-wasm-inline.js`, que contém o WASM no JS e dispensa fetch separado; valide a disponibilidade da distribuição/versão antes de migrar. Outra alternativa é hospedar o `.wasm` com o JS dentro do projeto.
4. Sirva a aplicação em `http://localhost`, teste com conexão à internet e relate claramente o que corrigiu.
5. Teste `SELECT COUNT(*) FROM vendas;` → `475`; confirme consulta agregada e gráfico.
6. Não marque resolvido apenas porque trocou o endereço do CDN.

## Critérios mínimos para considerar a tarefa concluída
- O usuário consegue abrir a apresentação no navegador e navegar por todos os slides.
- A sequência conceitual é ensinada antes do laboratório SQL.
- As consultas `SELECT` de exemplo retornam resultados numéricos compatíveis com o CSV.
- Gráficos possuem rótulos, unidade, origem e não confundem receita com lucro.
- A interação funciona no projetor em 16:9 e não captura as setas quando a pessoa está digitando no editor SQL.
- Erros de conexão e consultas inválidas geram mensagens que orientam o aluno, sem travar a apresentação.

## Arquivos prioritários
- `index.html`: HTML principal e dependências.
- `css/theme.css`: tokens visuais, proporção 16:9, responsividade.
- `js/slides.js`: textos e conteúdos dos slides.
- `js/app.js`: navegação, contador e fullscreen.
- `js/animations.js`: máquina de escrever.
- `js/visuals.js`: indicadores e gráficos SVG.
- `js/sql-lab.js`: inicialização do SQL.js, consultas, tabela/gráfico e erros.
- `js/data.js`: cópia convertida e incorporada da base.
- `base_vendas_analise_com_ia.csv` / `.xlsx`: fontes na raiz.
- `apresentacao_arquivo_unico.html`: versão empacotada; regenerar quando o projeto modular mudar.

## Comportamentos a evitar
- Não inventar recursos de IA ao vivo onde não há integração real.
- Não usar `SELECT *` como demonstração final de análise sem justificar o uso.
- Não adicionar cinco ferramentas no curso de três horas.
- Não modificar dados para forçar gráficos interessantes.
- Não incluir novas fases gigantes sem caber nas três horas.
