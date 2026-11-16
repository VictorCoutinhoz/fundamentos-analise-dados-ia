# Aula guiada e laboratório SQL — 15/11/2026

> Registro histórico de planejamento. Não descreve o estado atual nem uma lista de tarefas pendentes. Quantidade de slides, caminhos e testes citados abaixo podem ter sido substituídos. Para modificar o projeto, comece pelo [guia de manutenção](README.md) e pela [validação atual](validacao-aula.md).

Pedido: desenvolver o roteiro fornecido em PDF e HTML como aula conversacional para iniciantes e corrigir WASM, nova tentativa e gráficos. Os documentos anexados são referências de conteúdo; a autorização de alteração vem do pedido do usuário.

Decisões: manter HTML/CSS/JS e os seis slides originais; ampliar a continuação em passos curtos, com notas de fala. Usar a geladeira como analogia conceitual, sem misturar seus exemplos com os registros de vendas. Explicar SELECT como seleção do resultado, FROM como origem e WHERE como condição. SQL é uma linguagem com outros comandos; a oficina permite somente consultas SELECT.

Sequência: fundamentos → problema → perguntas → indicadores → conhecer e explorar a base → ferramentas e IA → SQL progressivo → laboratório → validação → atividade e conclusão. A mesma oficina cabe em 180 minutos, com pausas para participação.

## Execução e verificação

- [x] Reproduzir a inicialização atual no Edge via localhost e registrar carregamento e erros. A falha WASM original não se reproduziu; loader e WASM remotos responderam 200.
- [x] Adicionar testes de execução de SELECT, totais do CSV, recuperação após falha e seleção/unidade dos gráficos; observar as falhas antes das correções.
- [x] Distribuir sql.js com WASM incorporado, versão fixa e licença; permitir nova tentativa e limpar resultados após erro.
- [x] Desenvolver slides, notas de fala e roteiro completo. Exemplos SQL usam os campos reais e os dados da raiz.
- [x] Permitir escolher eixos e unidade do gráfico, informar limites de exibição e representar valores negativos.
- [x] Automatizar geração de data.js e HTML único; validar cópias e agregados contra CSV.
- [x] Validar navegação, foco no editor, typewriter, estados vazios, SQL inválido, falha/recuperação, 1280×720 e 1920×1080 no navegador real. Também verificado 390×844.

Arquivos principais: js/slides.js, js/sql-lab.js, js/visuals.js, css/theme.css, index.html, js/app.js, js/animations.js. Apoio: vendor/, scripts/, tests/, README.md, ROTEIRO_DA_AULA.md e apresentacao_arquivo_unico.html. Os CSV/XLSX originais serão preservados. A pasta atual não possui Git; não haverá commit ou worktree.
