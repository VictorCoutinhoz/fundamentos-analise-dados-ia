/* SQLite isolado: consultas demoradas não interrompem os controles da apresentação. */
(function () {
  'use strict';
  const INIT_TIMEOUT = 15000,
    QUERY_TIMEOUT = 8000;
  let worker = null,
    workerUrl = null,
    ready = false,
    readyPromise = null,
    nextId = 0;
  const pending = new Map();

  function sqlWorker() {
    let db = null;
    self.onmessage = async ({ data: { id, type, rows, query } }) => {
      try {
        if (type === 'prepare') {
          const SQL = await self.initSqlJs(),
            candidate = new SQL.Database();
          try {
            candidate.run(`CREATE TABLE vendas (
              id_pedido TEXT, data TEXT, mes TEXT, canal TEXT, regiao TEXT,
              categoria TEXT, produto TEXT, quantidade INTEGER, preco_unitario REAL,
              receita REAL, faturamento_bruto REAL, custo_produtos REAL, lucro_bruto REAL
            ); BEGIN TRANSACTION;`);
            const statement = candidate.prepare(
              'INSERT INTO vendas VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            );
            try {
              for (const row of rows)
                statement.run([
                  row.id_pedido,
                  row.data,
                  row.mes,
                  row.canal,
                  row.regiao,
                  row.categoria,
                  row.produto,
                  row.quantidade,
                  row.preco_unitario,
                  row.receita,
                  row.faturamento_bruto,
                  row.custo_produtos,
                  row.lucro_bruto,
                ]);
            } finally {
              statement.free();
            }
            candidate.run('COMMIT; PRAGMA query_only = ON;');
            db = candidate;
          } catch (error) {
            candidate.close();
            throw error;
          }
          self.postMessage({ id, result: null });
        } else {
          if (!db) throw new Error('Prepare a base antes de executar a consulta.');
          const result = db.exec(query)[0] || { columns: [], values: [] };
          self.postMessage({ id, result });
        }
      } catch (error) {
        self.postMessage({ id, error: error.message || 'Não foi possível executar a consulta.' });
      }
    };
  }

  function stop(target, error) {
    if (worker !== target) return;
    worker?.terminate();
    if (workerUrl) URL.revokeObjectURL(workerUrl);
    worker = workerUrl = null;
    ready = false;
    readyPromise = null;
    for (const request of pending.values()) {
      clearTimeout(request.timer);
      request.reject(error);
    }
    pending.clear();
  }

  function start() {
    if (typeof Worker !== 'function')
      throw new Error(
        'Este navegador não permite preparar o laboratório SQL. Use um navegador atual.',
      );
    const embedded = document.getElementById('sql-vendor-source')?.textContent;
    const library = embedded
      ? embedded
      : `importScripts(${JSON.stringify(new URL('vendor/sql.js/sql-wasm-inline.js', document.baseURI).href)});`;
    const url = URL.createObjectURL(
      new Blob([library, '\n(', sqlWorker.toString(), ')();'], { type: 'application/javascript' }),
    );
    let target;
    try {
      target = new Worker(url);
    } catch {
      URL.revokeObjectURL(url);
      throw new Error(
        'Não foi possível iniciar o laboratório SQL. Reabra a apresentação e tente novamente.',
      );
    }
    worker = target;
    workerUrl = url;
    target.onmessage = ({ data }) => {
      if (worker !== target) return;
      const request = pending.get(data.id);
      if (!request) return;
      clearTimeout(request.timer);
      pending.delete(data.id);
      if (data.error) request.reject(new Error(data.error));
      else request.resolve(data.result);
    };
    target.onerror = (event) => {
      event.preventDefault();
      stop(
        target,
        new Error(
          'Não foi possível carregar o mecanismo SQL. Mantenha a pasta vendor junto da apresentação e tente novamente.',
        ),
      );
    };
    return target;
  }

  function request(target, type, payload, timeout, message) {
    return new Promise((resolve, reject) => {
      const id = ++nextId;
      const timer = setTimeout(() => stop(target, new Error(message)), timeout);
      pending.set(id, { resolve, reject, timer });
      try {
        target.postMessage({ id, type, ...payload });
      } catch (error) {
        stop(target, error);
      }
    });
  }

  function prepare(rows) {
    if (ready) return Promise.resolve();
    if (readyPromise) return readyPromise;
    if (!Array.isArray(rows) || rows.length !== 475)
      return Promise.reject(
        new Error(
          'A base do curso não está completa. Reabra a apresentação com os arquivos de dados.',
        ),
      );
    let target;
    try {
      target = start();
    } catch (error) {
      return Promise.reject(error);
    }
    readyPromise = request(
      target,
      'prepare',
      { rows },
      INIT_TIMEOUT,
      'O mecanismo SQL demorou mais de 15 segundos para carregar. Tente novamente.',
    )
      .then(() => {
        if (worker !== target) throw new Error('A preparação SQL foi cancelada. Tente novamente.');
        ready = true;
      })
      .catch((error) => {
        stop(target, error);
        throw error;
      });
    return readyPromise;
  }

  function execute(query) {
    if (!worker || !ready)
      return Promise.reject(
        new Error('Prepare a base antes de executar a consulta. Tente novamente.'),
      );
    return request(
      worker,
      'execute',
      { query },
      QUERY_TIMEOUT,
      'A consulta ultrapassou 8 segundos e foi interrompida. Simplifique o SELECT e tente novamente.',
    );
  }

  function reset() {
    stop(worker, new Error('O mecanismo SQL foi reiniciado. A consulta pendente foi cancelada.'));
  }

  window.CourseSqlEngine = { prepare, execute, reset };
})();
