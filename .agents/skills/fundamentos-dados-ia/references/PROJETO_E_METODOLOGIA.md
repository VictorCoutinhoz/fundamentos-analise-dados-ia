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
1. Fundamentos: o que é dado, informação, dado estruturado/não estruturado/semiestruturado.
2. Tipos de análise: descritiva (“o que aconteceu?”), diagnóstica (“por que aconteceu?”), preditiva (“o que pode acontecer?”), prescritiva (“o que devemos fazer?”).
3. Identificação de um problema relevante.
4. Formulação de perguntas úteis, específicas, respondíveis e verificáveis.
5. Seleção dos indicadores e dos campos necessários.
6. Apresentação e exploração da base de vendas.
7. Introdução a ferramentas de IA e planilhas.
8. Demonstração didática de SQL/SELECT e execução real sobre dados.
9. Gráficos, interpretação e confronto com dados originais.
10. Comunicação de conclusões e suas limitações.

## Conceitos a explicitar com exemplos
- Dado: registro de um fato, observação ou medida. Informação: interpretação contextualizada.
- Uma pintura ou um texto contém dados analisáveis, mas não é automaticamente uma tabela.
- Pergunta vaga “Como estão as vendas?” → pergunta específica “Qual foi a receita após descontos por mês, de maio a outubro de 2026?”.
- Pergunta: “Qual foi a receita de junho?”; indicador: soma da receita após desconto; fonte: registros daquele mês.
- O lucro bruto simplificado não informa lucro líquido da empresa.
- Diagnóstico associa padrões e levanta hipóteses; não atribuir causalidade sem evidência.
- Predição exige método e quantificação da incerteza; evitar vender extrapolação rasa como certeza.

## Proposta de dinâmica para três horas (flexível)
- 15 min: apresentação, dados vs informação.
- 25 min: tipos de análise e analogias.
- 25 min: problema, perguntas e indicadores.
- 20 min: explorar base/planilha.
- 25 min: aplicações de IA, introdução a SQL e SELECT.
- 55 min: atividade prática, consultas, gráficos e interpretação.
- 15 min: conferência, dúvidas e conclusões.
- Total: 180 min. Adaptar ao nível da turma, sem sacrificar a parte prática.

## Atividade prática
- Entregar planilha fictícia aos participantes.
- Solicitar 2 a 3 perguntas analíticas antes de usar ferramentas.
- Solicitar o indicador associado a pelo menos uma pergunta, e quais colunas são necessárias.
- Explorar a pergunta com auxílio de IA e/ou SQL.
- Gerar um gráfico legível, identificar a unidade e apresentar um achado sustentado pelos dados.
- Verificar pelo menos um valor diretamente na planilha ou por consulta independente.

## Ferramentas do curso (papéis distintos)
- **Google Sheets:** fonte visível para filtros, tabelas, fórmulas e validação de resultados.
- **NotebookLM / Gemini Notebook (ou ferramenta similar, após confirmar disponibilidade):** auxílio para questionar fontes, interpretar informação, formular perguntas e, se disponível, gerar visualizações. Não prometer execução SQL ou gráficos exatos sem testar a conta.
- **Laboratório SQL da apresentação:** emulação didática de consultas reais com SQLite local no navegador, não ferramenta de IA.
- **DataGrip/PostgreSQL:** fora do escopo básico; só demonstrar se houver justificativa e tempo.

## Limite da atividade
A apresentação web atual não integra API de IA. Se alguém pedir que “a IA execute o SELECT”, esclarecer: IA pode sugerir a consulta, mas a execução real requer mecanismo SQL; o gráfico do laboratório é feito em SVG com dados reais da consulta.
