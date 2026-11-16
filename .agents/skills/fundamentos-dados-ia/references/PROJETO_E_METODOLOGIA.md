# Visão do curso e metodologia

## Identidade
- **Nome oficial:** Fundamentos de Análise de Dados e Aplicações em IA.
- **Público:** universitários iniciantes; não exigir Python, SQL, Power BI ou experiência prévia em análise de dados.
- **Formato:** a mesma oficina completa é ministrada em **dois dias consecutivos**, das **19h às 22h**, com público/turmas próprios de cada dia. **Não** dividir o conteúdo em dia 1 e dia 2.
- **Duração:** três horas por turma.
- **Equipe:** oito estudantes organizadores: quatro apresentadores e quatro auxiliares para dúvidas e apoio nas atividades.
- **Artefato educacional:** apresentação web com slides estáticos, animações pontuais, gráficos, laboratório SQL e exercícios sobre uma planilha fictícia.

## Tese pedagógica
> Neste curso, não vamos começar aprendendo a pedir respostas à inteligência artificial. Vamos começar aprendendo a fazer perguntas que valham a pena responder.

> A principal habilidade de um analista não é apenas responder perguntas, mas saber formular boas perguntas a partir dos dados.

- A IA é auxiliar, não substituto do raciocínio analítico.
- Perguntas orientam indicadores; indicadores orientam quais campos dos dados serão necessários.
- Uma conclusão precisa ser sustentada por valores e contexto, e pode ser contestada/verificada.
- Cuidado para não ensinar “prompt bom = resposta certa”.

## Fluxo central
1. Abrir o caso da Loja Horizonte: a gerência percebe mudanças nas vendas e precisa decidir o que investigar primeiro.
2. Apresentar os fundamentos como apoios à investigação: dado, informação e dados estruturados/não estruturados/semiestruturados.
3. Usar os tipos de análise como mapa de perguntas: descritiva (“o que aconteceu?”), diagnóstica (“o que pode explicar?”), preditiva (“o que pode acontecer?”), prescritiva (“o que devemos fazer, sob quais restrições?”).
4. Retomar o problema e formular perguntas úteis, específicas, respondíveis e verificáveis.
5. Seleção dos indicadores e dos campos necessários.
6. Apresentação e exploração da base de vendas.
7. Introdução a ferramentas de IA e planilhas.
8. Demonstração didática de SQL/SELECT e execução real sobre dados.
9. Gráficos, interpretação e confronto com dados originais.
10. Comunicação de conclusões, suas limitações e próxima investigação, retomando o caso inicial.

Os quatro tipos não são uma sequência obrigatória de quatro análises. Cada conceito deve responder a uma necessidade que a investigação criou. Antes da ferramenta, decidir o que queremos descobrir.

## Conceitos a explicitar com exemplos
- Dado: registro de um fato, observação ou medida. Informação: interpretação contextualizada.
- Uma pintura ou um texto contém dados analisáveis, mas não é automaticamente uma tabela.
- Pergunta vaga “Como estão as vendas?” → pergunta específica “Qual foi a receita após descontos por mês, de maio a outubro de 2026?”.
- Pergunta: “Qual foi a receita de junho?”; indicador: soma da receita após desconto; fonte: registros daquele mês.
- O lucro bruto simplificado não informa lucro líquido da empresa.
- Diagnóstico associa padrões e levanta hipóteses; não atribuir causalidade sem evidência.
- Predição exige método e quantificação da incerteza; evitar vender extrapolação rasa como certeza.

## Proposta de dinâmica para três horas (flexível)
- 15 min (slides 1–5): abertura do caso, dados e informação.
- 20 min (6–8): modelos de análise, verificação e analogia.
- 20 min (9–12): problema, perguntas, indicadores e verificação.
- 15 min (13–14): base e exploração.
- 30 min (15–19): ferramentas e prática guiada NotebookLM → Planilhas.
- 30 min (20–29): SQL progressivo, verificação e laboratório.
- 10 min (30–32): leitura crítica de gráficos e critérios de avaliação.
- 30 min (33): investigação autônoma em duplas.
- 10 min (34–35): defesa da conclusão e próxima investigação.
- Total: 180 min. Adaptar ao nível da turma, sem sacrificar a parte prática.

O [roteiro da aula](../../../../ROTEIRO_DA_AULA.md) contém a distribuição e as falas exportadas dos módulos. Ensaiar o tempo real das ferramentas nas contas da turma.

## Apoio e avaliação
- **Eu faço:** o apresentador demonstra como transformar uma pergunta em análise.
- **Nós fazemos:** a turma usa o mesmo CSV e confere a receita mensal.
- **Vocês fazem:** as duplas escolhem outra pergunta e defendem sua própria conclusão.
- Quatro verificações, após modelos, indicadores, SELECT e escalas: 30 segundos individuais e um minuto em dupla, com feedback explicado.
- Avaliar pergunta, indicador, visualização e interpretação. Exigir um valor conferido, uma limitação e uma próxima pergunta; aparência do gráfico não comprova o raciocínio.

## Atividade prática
- Entregar planilha fictícia aos participantes.
- Solicitar 2 a 3 perguntas analíticas antes de usar ferramentas.
- Solicitar o indicador associado a pelo menos uma pergunta, e quais colunas são necessárias.
- Explorar a pergunta com auxílio de IA e/ou SQL.
- Gerar um gráfico legível, identificar a unidade e apresentar um achado sustentado pelos dados.
- Verificar pelo menos um valor diretamente na planilha ou por consulta independente.

## Ferramentas do curso (papéis distintos)
- **Google Sheets:** fonte visível para filtros, tabelas, fórmulas e validação de resultados.
- **NotebookLM / Gemini Notebook (ou ferramenta similar, após confirmar disponibilidade):** auxílio para questionar fontes, interpretar informação, formular perguntas, sugerir consultas e discutir limitações. Conferir qualquer número na fonte; não afirmar que a ferramenta executou SQL sem isso ter ocorrido.
- **Laboratório SQL da apresentação:** consultas reais executadas em SQLite local no navegador, isolado em Worker; não é uma ferramenta de IA.
- **DataGrip/PostgreSQL:** fora do escopo básico; só demonstrar se houver justificativa e tempo.

## Limite da atividade
A apresentação web atual não integra API de IA. Se alguém pedir que “a IA execute o SELECT”, esclarecer: IA pode sugerir a consulta, mas a execução real requer mecanismo SQL; o gráfico do laboratório é feito em SVG com os valores retornados pela consulta sobre a base fictícia.
