/* Material do aluno. A apresentação não envia arquivos nem chama uma API de IA. */
(function () {
  'use strict';
  const prompts = {
    analise: `Estou investigando a base fictícia da Loja Horizonte que adicionei como fonte. A gerência quer entender as mudanças nas vendas e decidir o que investigar primeiro. Use somente essa fonte. O CSV usa ponto e vírgula como separador e ponto decimal (exemplo: 84.9).

Minha pergunta é: qual foi a receita após descontos por mês, de maio a outubro de 2026?

1. Identifique os campos necessários pelos nomes originais: Mês e Receita_após_desconto_R$. Diferencie receita, faturamento bruto e lucro bruto simplificado.
2. Explique como montar uma tabela dinâmica no Google Planilhas: campos, soma, ordem dos meses e gráfico adequado. Explique como conferir um mês e o total na fonte.
3. Se apresentar números, mostre o recorte e um procedimento de cálculo que eu possa reproduzir. Se não conseguir calcular com segurança, diga isso; não invente valores.
4. Separe observações de hipóteses. Uma variação não prova sua causa. Proponha uma pergunta de aprofundamento e diga quais dados faltariam para respondê-la.

Responda em português, passo a passo, como para um iniciante. Separe achado, evidência, limitação e próxima investigação. Vou conferir o resultado na planilha antes de aceitar a conclusão.`,
    sql: `Quero escrever uma consulta SQL para responder à mesma pergunta sobre a base fictícia da Loja Horizonte: qual foi a receita após descontos por mês, de maio a outubro de 2026?

No laboratório, a tabela vendas tem as colunas: id_pedido, data, mes, canal, regiao, categoria, produto, quantidade, preco_unitario, receita, faturamento_bruto, custo_produtos, lucro_bruto. receita corresponde a Receita_após_desconto_R$ do CSV. mes é um texto no formato AAAA-MM.

Escreva uma única consulta iniciada por SELECT, agrupada e ordenada por mes, usando ROUND(SUM(receita), 2) AS receita_total. Explique cada parte em linguagem simples, diga quantas linhas esperamos para seis meses e como conferir um valor na planilha. Não use nomes de colunas que não existem. Não afirme que executou a consulta: vou executá-la no laboratório e comparar com o Google Planilhas.`,
  };
  function init() {
    document.querySelectorAll('[data-check]').forEach((section) => {
      section.querySelectorAll('[data-choice]').forEach((button) =>
        button.addEventListener('click', () => {
          section
            .querySelectorAll('[data-choice]')
            .forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
          const correct = button.dataset.choice === section.dataset.correct;
          const feedback = section.querySelector('[data-check-feedback]');
          feedback.dataset.state = correct ? 'correct' : 'retry';
          feedback.textContent =
            (correct ? 'Isso mesmo. ' : 'Vamos revisar. ') + section.dataset.explanation;
        }),
      );
    });
    const button = document.getElementById('copy-activity-prompt');
    button?.addEventListener('click', async () => {
      const field = document.getElementById('activity-prompt'),
        status = document.getElementById('activity-copy-status');
      try {
        await navigator.clipboard.writeText(field.value);
        status.textContent = 'Prompt copiado. Cole na conversa do NotebookLM e adapte a pergunta.';
      } catch {
        field.focus();
        field.select();
        status.textContent =
          'O navegador não permitiu copiar automaticamente. O texto está selecionado: use Ctrl+C ou a opção Copiar.';
      }
    });
  }
  window.CourseActivities = { prompts, init };
})();
