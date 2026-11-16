# Instruções do Codex — Fundamentos de Análise de Dados e Aplicações em IA

## Fonte de contexto
Ao atuar neste repositório, use a skill `.agents/skills/fundamentos-dados-ia/SKILL.md` e consulte suas referências antes de implementar mudanças que afetem conteúdo, didática, SQL, dados, layout ou interatividade. A skill detalha o estado atual e os critérios de aceitação.

## Prioridades imediatas
1. Corrigir o erro `both async and sync fetching of the wasm failed` do laboratório SQL; demonstrar `SELECT` funcionando em navegador real e em `http://localhost`.
2. Inserir a explicação didática de SQL e `SELECT` **antes** do laboratório, sem sacrificar a sequência problema → perguntas → indicadores → dados → ferramenta → validação.
3. Garantir que consulta, tabela e gráfico reflitam a mesma base e tenham verificações numéricas.

## Limites
- Preservar a identidade Retro-Tech & Matcha, o conteúdo já existente e o tom acessível.
- Não introduzir backend, banco remoto, APIs de IA pagas, chaves ou autenticação sem pedido explícito.
- Internet estará disponível na aula; funcionamento offline não é prioridade. A robustez do carregamento do WASM continua obrigatória.
- CSV e XLSX na raiz são as fontes de dados do projeto. Não inventar dados e nunca usar dados reais de clientes/empregador.
- A apresentação executa SQL de forma determinística; não afirmar que a IA realizou consultas ou cálculos que foram executados pelo SQLite.
- Implementar mudanças pequenas, verificáveis e com descrição dos arquivos alterados.

## Verificação
- Testar comandos SQL sobre 475 linhas em navegador real; comparar agregados com CSV.
- Testar navegação, animação typewriter, editor SQL (foco e teclado), gráficos, responsividade em 16:9 e títulos.
- Sempre indicar o que foi testado de fato e o que está pendente.
