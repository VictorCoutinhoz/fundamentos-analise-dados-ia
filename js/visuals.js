/* Visualização baseada exclusivamente nos registros locais, sem IA. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const brl = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(value);
  const number = (value) => new Intl.NumberFormat('pt-BR').format(value);
  function formatValue(value, unit = 'number', digits = unit === 'percent' ? 2 : 6) {
    if (value === null) return '—';
    if (unit === 'currency') return brl(value);
    const percent = unit === 'percent',
      displayed = Math.abs(value) * (percent ? 100 : 1);
    // Não exibir zero quando a consulta retornou uma fração pequena, mas não nula.
    const tiny = displayed > 0 && displayed < 0.5 * 10 ** -digits;
    return new Intl.NumberFormat('pt-BR', {
      style: percent ? 'percent' : 'decimal',
      maximumFractionDigits: tiny ? 3 : digits,
      notation: tiny ? 'scientific' : 'standard',
    }).format(value);
  }
  function svgTag(name, attrs = {}, text = '') {
    const el = document.createElementNS(NS, name);
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
    if (text !== '') el.textContent = text;
    return el;
  }
  function plotBars(host, labels, values, title, { unit = 'currency' } = {}) {
    host.replaceChildren();
    if (!values.length) {
      const e = document.createElement('div');
      e.className = 'chart-empty';
      e.textContent = 'Sem dados para representar.';
      host.append(e);
      return;
    }
    if (values.some((value) => value !== null && !Number.isFinite(Number(value)))) {
      const e = document.createElement('p');
      e.className = 'chart-empty';
      e.textContent = 'Há valores que não podem ser representados como números.';
      host.append(e);
      return;
    }
    const format = (value) => formatValue(value, unit);
    const width = 720,
      top = 20,
      left = 126,
      right = 15;
    const count = labels.length,
      graphWidth = width - left - right,
      slot = graphWidth / count,
      rotated =
        count > 8 || labels.some((label) => Math.min(String(label).length, 18) * 9.6 > slot - 4),
      height = rotated ? 285 : 240,
      bottom = rotated ? 100 : 55;
    const graphHeight = height - top - bottom;
    const nums = values.map((v) => (v === null ? 0 : Number(v)));
    const min = Math.min(0, ...nums),
      max = Math.max(0, ...nums) || (min < 0 ? 0 : 1),
      range = max - min;
    const yFor = (value) => top + ((max - value) / range) * graphHeight;
    const baseline = yFor(0);
    const svg = svgTag('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      'aria-label': title,
    });
    svg.append(svgTag('title', {}, title));
    for (let tick = 0; tick <= 3; tick++) {
      const y = top + (graphHeight * tick) / 3;
      svg.append(
        svgTag('line', {
          x1: left,
          y1: y,
          x2: width - right,
          y2: y,
          stroke: '#D8E2DC',
          'stroke-width': 1,
        }),
      );
      const tickValue = max - (range * tick) / 3;
      const tickLabel = formatValue(tickValue, unit, 2);
      svg.append(
        svgTag(
          'text',
          {
            x: left - 5,
            y: y + 3,
            'text-anchor': 'end',
            'font-size': 14,
            fill: '#3D7A6E',
            'font-family': 'monospace',
          },
          tickLabel,
        ),
      );
    }
    const barWidth = Math.min(58, slot * 0.6);
    for (let i = 0; i < count; i++) {
      const val = nums[i];
      const bh = Math.abs(yFor(val) - baseline);
      const x = left + slot * i + (slot - barWidth) / 2;
      const y = Math.min(yFor(val), baseline);
      const bar = svgTag('rect', {
        x,
        y,
        width: barWidth,
        height: bh,
        rx: 2,
        fill: val === max ? '#E07A5F' : '#3D7A6E',
      });
      const tooltip = values[i] === null ? 'Sem valor' : format(val);
      bar.append(svgTag('title', {}, `${labels[i]}: ${tooltip}`));
      svg.append(bar);
      const label = String(labels[i]);
      const short = label.length > 18 ? label.substring(0, 17) + '…' : label;
      const labelX = x + barWidth / 2,
        labelY = height - bottom + 17;
      const labelNode = svgTag(
        'text',
        {
          x: labelX,
          y: labelY,
          'text-anchor': rotated ? 'end' : 'middle',
          transform: rotated ? `rotate(-35 ${labelX} ${labelY})` : '',
          'font-size': rotated ? (count > 8 ? 10 : 12) : 16,
          'font-family': 'monospace',
          fill: '#1D3532',
        },
        short,
      );
      labelNode.append(svgTag('title', {}, label));
      svg.append(labelNode);
    }
    svg.append(
      svgTag('line', {
        x1: left,
        y1: baseline,
        x2: width - right,
        y2: baseline,
        stroke: '#1D3532',
        'stroke-width': 1,
      }),
    );
    host.append(svg);
  }
  function initExplore() {
    const rows = window.SALES_DATA || [];
    const filter = document.getElementById('category-filter');
    if (!filter || !rows.length) return;
    filter.replaceChildren(new Option('Todas as categorias', ''));
    [...new Set(rows.map((r) => r.categoria))].sort().forEach((x) => filter.add(new Option(x, x)));
    const tbody = document.querySelector('#explore-table tbody');
    const render = () => {
      const selected = filter.value;
      const subset = selected ? rows.filter((r) => r.categoria === selected) : rows;
      const sum = (k) => subset.reduce((total, row) => total + Number(row[k] || 0), 0);
      document.getElementById('metric-records').textContent = number(subset.length);
      document.getElementById('metric-units').textContent = number(sum('quantidade'));
      document.getElementById('metric-revenue').textContent = brl(sum('receita'));
      document.getElementById('metric-profit').textContent = brl(sum('lucro_bruto'));
      const months = [...new Set(rows.map((x) => x.mes))].sort();
      const monthly = months.map((month) =>
        subset.filter((x) => x.mes === month).reduce((a, b) => a + b.receita, 0),
      );
      plotBars(
        document.getElementById('explore-chart'),
        months.map((x) => x.slice(5) + '/' + x.slice(2, 4)),
        monthly,
        'Receita após descontos por mês, em reais',
      );
      tbody.replaceChildren();
      subset.slice(0, 8).forEach((row) => {
        const tr = document.createElement('tr');
        [row.mes, row.categoria, row.produto, brl(row.receita)].forEach((v) => {
          const td = document.createElement('td');
          td.textContent = v;
          tr.append(td);
        });
        tbody.append(tr);
      });
      document.getElementById('table-count').textContent =
        `${Math.min(8, subset.length)} de ${number(subset.length)}`;
    };
    filter.addEventListener('change', render);
    render();
  }
  window.CourseViz = { plotBars, initExplore, brl, number, formatValue };
})();
