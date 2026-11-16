# Plano de continuidade e backlog para Codex

## P0 — corrigir laboratório SQL (primeira tarefa)
- Reproduzir o erro WASM em navegador de teste (não basta dizer “funciona no Node”).
- Testar ambiente servido via HTTP local.
- Reparar loader `sql.js` e seu asset WASM; considerar build inline para simplificar distribuição.
- Garantir feedback de status e botão de tentativa novamente.
- Garantir execução determinística sem conexão com serviços de IA.
- Verificar `SELECT COUNT(*) FROM vendas` = 475 e consultas de receita.
**Critério de aceite:** laboratório executa pelo menos três SELECTs do curso, gera tabela e gráfico, e informa falhas sem travar a navegação.

## P1 — corrigir a sequência didática SQL
- Novo slide ou sequência antes do editor: “O que é SQL? Por que fazemos consultas?”
- Mostrar tabela imaginária com linhas/colunas e consulta `SELECT produto, receita FROM vendas LIMIT 5;`.
- Acrescentar pergunta natural → SQL com `WHERE` → tabela resultante.
- Só depois: agregação `SUM`, agrupamento `GROUP BY`, gráfico.
- Introduzir `SELECT` de forma progressiva; evitar excesso de sintaxe.
**Critério de aceite:** um universitário sem programação entende o papel de SQL/SELECT antes de ver o editor.

## P2 — preencher lacunas de pensamento analítico
- Complementar slides: identificação do problema, boas perguntas e definição de indicadores.
- Provocar a turma: “O que querem descobrir?”, “Qual período?”, “Qual indicador?”, “A base tem essa informação?”.
- Exibir pergunta vaga e sua versão precisa.
- Conectar exemplo diretamente à Loja Horizonte.
- Preservar os quatro modelos de análise e a analogia original com suas ressalvas.
**Critério de aceite:** o aluno encontra indicação do que é problema, pergunta e indicador no deck antes da prática.

## P3 — dados e gráficos
- Introduzir uma fonte única: CSV e XLSX na raiz do repositório.
- Automatizar a conversão do CSV com BOM e `;` para `js/data.js` sem editar registros manualmente.
- Escrever teste de consistência de linhas (475) e agregados mensais.
- Exibir unidades e rótulos completos em gráficos; corrigir seleção de colunas quando consultas retornarem múltiplos números.
- Testar estados vazios e valores não positivos.
**Critério de aceite:** os indicadores no deck, no SQLite e nas planilhas convergem, sem divergência de dados.

## P4 — aprimoramento visual e manutenção
- Preservar paleta e tipografia.
- Garantir leitura em projetor, 16:9, controles acessíveis, movimento discreto e `prefers-reduced-motion`.
- Fornecer script de build ou documentação para regenerar `apresentacao_arquivo_unico.html`.
- Acrescentar testes automatizados para SQL/agregações e smoke tests de navegador se o ambiente permitir.
- Incluir instruções claras de inicialização via servidor local (Node ou Python).
**Critério de aceite:** qualquer apresentador da equipe abre, navega e demonstra sem conhecimento da implementação.

## P5 — integrações opcionais (não começar sem decisão do usuário)
- Possível exportação de gráficos, upload de outras planilhas fictícias, questionário dos alunos.
- Integração com API de IA somente se houver consentimento, chave fornecida pelo usuário e discussão sobre custos e privacidade.
- Não forçar Power BI, frameworks web, serviços cloud ou modo offline.

## Estratégia de implementação
Uma tarefa por vez: compreender → alterar → testar → apresentar diff → aguardar próxima etapa. Antes de grandes mudanças, registrar arquivos afetados e critérios de aceite.
