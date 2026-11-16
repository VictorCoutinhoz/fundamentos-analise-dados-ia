# Ferramentas na prática — 15/11/2026

> Registro histórico de planejamento. Não descreve o estado atual nem uma lista de tarefas pendentes. Downloads, caminhos de módulos e divisão de tempo citados abaixo foram revistos. Para modificar o projeto, comece pelo [guia de manutenção](README.md) e pela [validação atual](validacao-aula.md).

Pedido: tornar acionável o uso de NotebookLM e Sheets, oferecer prompt com a base, verificar compatibilidade gratuita e retirar SYS.INIT em favor de 8º semestre.

- Manter a mesma pergunta sobre receita mensal antes e depois do SQL.
- Inserir quatro telas antes do SQL: abrir/importar, prompt copiável, tabela dinâmica/gráfico e confronto da resposta com a fonte.
- NotebookLM: CSV como envio direto, compatibilidade confirmada na documentação oficial; não realizar upload na conta do usuário. Sheets: importar o mesmo CSV respeitando ponto decimal (localidade Estados Unidos na importação, exibição Brasil depois). Não usar o XLSX como fonte desta prática: fórmulas sem arredondamento por registro somam R$52.841,89, contra R$52.841,96 do CSV.
- Fornecer guia do aluno e prompts baixáveis. Vincular os tipos de análise às perguntas e aos limites da base nas falas e no guia.
- Manter 180 minutos: introdução15, modelos20, perguntas/indicadores20, base15, ferramentas guiadas30, SQL30, autonomia35, conclusão15.
- Testar copiar prompt no Edge via localhost, links/downloads locais, apresentação completa em 720p/1080p/celular, SQL e HTML único. A prática em contas externas continuará pendente de ensaio.

Arquivos: js/slides.js, js/lesson.js, js/activities.js, js/app.js, css/theme.css, index.html, scripts/export-roteiro.cjs, testes e documentação. Regenerar roteiro e HTML único. CSV/XLSX não serão alterados.
