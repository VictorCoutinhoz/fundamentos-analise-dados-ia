/* SELECT sobre a base local. SQLite calcula; o navegador desenha o resultado. */
(function () {
  'use strict';
  const LIMIT = 20;
  const examples = {
    primeiras: 'SELECT produto, quantidade, receita\nFROM vendas\nLIMIT 5;',
    filtro: "SELECT mes, produto, receita\nFROM vendas\nWHERE categoria = 'Informática'\nLIMIT 10;",
    contagem: 'SELECT COUNT(*) AS registros, SUM(quantidade) AS unidades\nFROM vendas;',
    mensal:
      'SELECT mes, ROUND(SUM(receita), 2) AS receita_total\nFROM vendas\nGROUP BY mes\nORDER BY mes;',
    categoria:
      'SELECT categoria, ROUND(SUM(receita), 2) AS receita_total\nFROM vendas\nGROUP BY categoria\nORDER BY receita_total DESC;',
    canal: 'SELECT canal, COUNT(*) AS pedidos\nFROM vendas\nGROUP BY canal\nORDER BY pedidos DESC;',
  };
  let lastResult = null,
    executionGeneration = 0,
    executingGeneration = null;
  const el = (id) => document.getElementById(id);
  function status(text, error = false) {
    el('sql-status').textContent = text;
    el('sql-status').classList.toggle('status-error', error);
  }
  async function initSQL() {
    if (executionGeneration === 0) status('Preparando as consultas…');
    el('retry-sql').hidden = true;
    try {
      await window.CourseSqlEngine.prepare(window.SALES_DATA);
      if (executionGeneration === 0) status('Base pronta · 475 registros.');
    } catch (error) {
      el('retry-sql').hidden = false;
      if (executionGeneration === 0)
        status(error.message || 'Não foi possível preparar as consultas. Tente novamente.', true);
      throw error;
    }
  }
  function cancelPendingQuery() {
    if (executingGeneration === null) return;
    window.CourseSqlEngine.reset();
    executingGeneration = null;
  }
  function emptyChart(message) {
    el('sql-chart').replaceChildren();
    const p = document.createElement('p');
    p.className = 'chart-empty';
    p.textContent = message;
    el('sql-chart').append(p);
    el('sql-chart-label').textContent = '—';
  }
  function clearResult(message) {
    lastResult = null;
    el('sql-results').querySelector('thead').replaceChildren();
    el('sql-results').querySelector('tbody').replaceChildren();
    el('sql-count').textContent = '—';
    el('sql-display-note').textContent = '';
    for (const id of ['sql-category', 'sql-value', 'sql-unit']) el(id).disabled = true;
    emptyChart(message);
  }
  function drawChart() {
    if (!lastResult) return;
    const { columns, values } = lastResult;
    const valueIdx = el('sql-value').value === '' ? -1 : Number(el('sql-value').value);
    const unit = el('sql-unit').value,
      format = window.CourseViz.formatValue;
    let shares = null,
      denominator = null,
      invalidShare = '';
    if (unit === 'share' && valueIdx >= 0) {
      const numbers = values.map((row) => row[valueIdx]).filter((value) => value !== null);
      denominator = numbers.reduce((sum, value) => sum + value, 0);
      if (numbers.some((value) => value < 0))
        invalidShare =
          'Participação no total requer valores não negativos. Use número ou reais para representar saldos.';
      else if (!Number.isFinite(denominator) || denominator <= 0)
        invalidShare =
          'Não há participação calculável: o total precisa ser positivo, maior que zero.';
      else
        shares = values.map((row) => (row[valueIdx] === null ? null : row[valueIdx] / denominator));
    }
    renderTable(columns, values, valueIdx, unit, shares);
    let note =
      values.length > LIMIT
        ? `Tabela e gráfico mostram as primeiras ${LIMIT} de ${values.length} linhas, na ordem da consulta.`
        : 'Fonte: base fictícia Loja Horizonte. Tabela e gráfico usam as mesmas linhas do resultado.';
    if (shares) {
      const totalUnit = metricKind(columns[valueIdx]) === 'currency' ? 'currency' : 'number';
      note += ` Participação = valor ÷ total de todas as ${values.length} linhas retornadas pelo SELECT (${format(denominator, totalUnit)}).`;
    } else if (unit === 'percent' && valueIdx >= 0)
      note += ' Taxa em fração: 0,25 é exibido como 25%. A taxa deve ser calculada na consulta.';
    el('sql-display-note').textContent = note;
    if (!values.length) {
      emptyChart('Nenhum registro encontrado com esse filtro. Experimente alterar o WHERE.');
      return;
    }
    if (invalidShare) {
      emptyChart(invalidShare);
      return;
    }
    if (valueIdx < 0) {
      emptyChart('A consulta não retornou uma coluna numérica para representar no gráfico.');
      return;
    }
    if (!el('sql-category').value) {
      emptyChart('Para comparar no gráfico, retorne também uma coluna de categoria na consulta.');
      return;
    }
    const labelIdx = Number(el('sql-category').value),
      plotUnit = unit === 'share' ? 'percent' : unit;
    const unitLabel = {
      currency: 'R$',
      count: 'contagem',
      number: 'número',
      percent: 'taxa (%)',
      share: 'participação (%)',
    }[unit];
    const entries = values.slice(0, LIMIT),
      chartValues = shares ? shares.slice(0, LIMIT) : entries.map((row) => row[valueIdx]);
    const title = `${columns[valueIdx]} por ${columns[labelIdx]} · ${unitLabel}`;
    window.CourseViz.plotBars(
      el('sql-chart'),
      entries.map((row) => String(row[labelIdx] ?? 'Sem categoria')),
      chartValues,
      title,
      { unit: plotUnit },
    );
    el('sql-chart-label').textContent = `${columns[valueIdx]} · ${unitLabel}`;
  }
  function renderTable(columns, values, valueIdx, unit, shares) {
    const table = el('sql-results'),
      head = table.querySelector('thead'),
      body = table.querySelector('tbody'),
      tr = document.createElement('tr');
    head.replaceChildren();
    body.replaceChildren();
    for (const [i, col] of columns.entries()) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent =
        col +
        (i === valueIdx && unit === 'currency'
          ? ' (R$)'
          : i === valueIdx && unit === 'percent'
            ? ' (%)'
            : '');
      tr.append(th);
    }
    if (shares) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = 'Participação no total (%)';
      tr.append(th);
    }
    head.append(tr);
    for (const [rowIdx, vals] of values.slice(0, LIMIT).entries()) {
      const line = document.createElement('tr');
      for (const [i, value] of vals.entries()) {
        const td = document.createElement('td');
        td.textContent =
          typeof value === 'number'
            ? window.CourseViz.formatValue(
                value,
                i === valueIdx && unit !== 'share' ? unit : 'number',
              )
            : String(value ?? '—');
        line.append(td);
      }
      if (shares) {
        const td = document.createElement('td');
        td.textContent = window.CourseViz.formatValue(shares[rowIdx], 'percent');
        line.append(td);
      }
      body.append(line);
    }
    el('sql-count').textContent = `${values.length} linha(s)`;
  }
  function renderResult(columns, values) {
    clearResult('Nenhum registro encontrado com esse filtro. Experimente alterar o WHERE.');
    lastResult = { columns, values };
    const numeric = columns
      .map((_, i) => i)
      .filter(
        (i) =>
          values.some((r) => typeof r[i] === 'number' && Number.isFinite(r[i])) &&
          values.every((r) => r[i] === null || (typeof r[i] === 'number' && Number.isFinite(r[i]))),
      );
    function choices(id, indices) {
      const select = el(id);
      select.replaceChildren(new Option('Escolha…', ''));
      for (const i of indices) select.add(new Option(columns[i], String(i)));
      select.disabled = !indices.length;
    }
    choices('sql-value', numeric);
    const preferred =
      numeric.find((i) =>
        /receita|lucro|custo|faturamento|pedidos|registros|contagem/i.test(columns[i]),
      ) ?? numeric[numeric.length - 1];
    el('sql-value').value = preferred === undefined ? '' : String(preferred);
    el('sql-unit').disabled = !numeric.length;
    el('sql-category').value = '';
    chooseCategories();
    inferUnit();
    drawChart();
  }
  function chooseCategories() {
    if (!lastResult) return;
    const { columns, values } = lastResult,
      selectedValue = el('sql-value').value,
      select = el('sql-category'),
      previous = select.value;
    const categories = columns
      .map((_, i) => i)
      .filter((i) => String(i) !== selectedValue && values.some((row) => row[i] !== null));
    select.replaceChildren(new Option('Escolha…', ''));
    for (const i of categories) select.add(new Option(columns[i], String(i)));
    select.disabled = !categories.length;
    const preferred =
      categories.find((i) => values.some((row) => typeof row[i] === 'string')) ??
      (values.length > 1 ? categories[0] : undefined);
    select.value = categories.some((i) => String(i) === previous)
      ? previous
      : preferred === undefined
        ? ''
        : String(preferred);
  }
  function metricKind(column) {
    if (/margem|taxa|percent|propor[cç][aã]o|participa[cç][aã]o/i.test(column)) return 'percent';
    if (/pedidos|registros|unidades|quantidade|contagem/i.test(column)) return 'count';
    if (/receita|lucro|custo|faturamento|pre[cç]o/i.test(column)) return 'currency';
    return 'number';
  }
  function inferUnit() {
    const column = lastResult?.columns[Number(el('sql-value').value)] || '',
      kind = metricKind(column);
    const values =
      lastResult?.values
        .map((row) => row[Number(el('sql-value').value)])
        .filter((value) => value !== null) || [];
    for (const option of el('sql-unit').options) {
      option.disabled =
        (option.value === 'currency' && (kind === 'count' || kind === 'percent')) ||
        (option.value === 'count' && (kind === 'currency' || kind === 'percent')) ||
        (option.value === 'percent' &&
          (kind === 'count' ||
            kind === 'currency' ||
            (kind === 'number' && values.some((value) => Math.abs(value) > 1)))) ||
        (option.value === 'share' && kind === 'percent');
    }
    el('sql-unit').value = kind;
  }
  function validateSelect(sql) {
    // Ignora literais e comentários para validar o formato; executa o texto original.
    const cleaned = sql
      .replace(/'(?:''|[^'])*'|"(?:""|[^"])*"|--[^\n]*|\/\*[\s\S]*?\*\//g, ' ')
      .trim();
    if (!/^select\s/i.test(cleaned))
      throw new Error('Nesta atividade, comece com SELECT para consultar os dados.');
    if (cleaned.replace(/;\s*$/, '').includes(';'))
      throw new Error('Execute apenas uma consulta SELECT por vez.');
    if (sql.length > 5000) throw new Error('Consulta muito longa para esta demonstração.');
    return sql;
  }
  async function run() {
    const button = el('run-sql'),
      generation = ++executionGeneration;
    cancelPendingQuery();
    button.disabled = true;
    status('Executando SELECT…');
    try {
      const query = validateSelect(el('sql-editor').value);
      await initSQL();
      if (generation !== executionGeneration) return;
      executingGeneration = generation;
      const result = await window.CourseSqlEngine.execute(query);
      if (generation !== executionGeneration) return;
      renderResult(result.columns, result.values);
      status(`Consulta executada · ${result.values.length} linha(s) retornada(s).`);
    } catch (error) {
      if (generation !== executionGeneration) return;
      clearResult(
        'A consulta não produziu um resultado válido. Confira a mensagem acima e tente novamente.',
      );
      status(`Erro: ${error.message}`, true);
    } finally {
      if (executingGeneration === generation) executingGeneration = null;
      if (generation === executionGeneration) button.disabled = false;
    }
  }
  function init() {
    if (!el('sql-editor')) return;
    el('sql-editor').value = examples.mensal;
    document.querySelectorAll('[data-query]').forEach((button) =>
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-query]').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        el('sql-editor').value = examples[button.dataset.query];
        run();
      }),
    );
    el('run-sql').addEventListener('click', run);
    el('retry-sql').addEventListener('click', () => {
      el('retry-sql').hidden = true;
      run();
    });
    el('sql-category').addEventListener('change', drawChart);
    el('sql-value').addEventListener('change', () => {
      chooseCategories();
      inferUnit();
      drawChart();
    });
    el('sql-unit').addEventListener('change', drawChart);
    el('sql-editor').addEventListener('input', () => {
      executionGeneration++;
      cancelPendingQuery();
      document.querySelectorAll('[data-query]').forEach((b) => b.classList.remove('active'));
      clearResult('Execute a consulta alterada para ver a tabela e o gráfico correspondentes.');
      status('Consulta alterada. Execute SELECT para atualizar o resultado.');
      el('run-sql').disabled = false;
    });
    el('sql-editor').addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        run();
      }
    });
    initSQL()
      .then(() => {
        if (executionGeneration === 0) run();
      })
      .catch(() => {});
  }
  window.SqlLab = { init };
})();
