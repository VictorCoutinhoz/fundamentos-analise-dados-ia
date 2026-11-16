# Base de dados e laboratório SQL

## Arquivos canônicos
- `base_vendas_analise_com_ia.csv` na raiz (CSV UTF-8 com BOM e separador `;`).
- `base_vendas_analise_com_ia.xlsx` na raiz (planilha equivalente, inclui conteúdo didático).
- Ambas são **fictícias** e adequadas à divulgação ao público.
- `data/` e `js/data.js` ainda carregam cópias da mesma fonte; documentar e automatizar atualização para não haver divergência.

## Perfil do dataset confirmado
- 475 linhas/transações de vendas, 16 colunas.
- Período: maio a outubro de 2026, seis meses.
- Distribuição de registros por mês: 2026-05 (65), 2026-06 (75), 2026-07 (88), 2026-08 (94), 2026-09 (82), 2026-10 (71).
- Sem dados reais de estudantes, pacientes ou clientes.

## Colunas originais (nome exato da planilha)
1. `ID_pedido` — identificação da venda.
2. `Data` — data em ISO (AAAA-MM-DD).
3. `Mês` — competência AAAA-MM.
4. `Canal` — canal de venda.
5. `Região` — região.
6. `Categoria` — categoria do produto.
7. `Produto` — nome do produto.
8. `Quantidade` — unidades na linha.
9. `Preço_unitário_R$` — preço de venda unitário.
10. `Desconto_%` — taxa de desconto em fração (ex.: 0,05 = 5%).
11. `Custo_unitário_R$` — custo unitário.
12. `Faturamento_bruto_R$` — antes do desconto.
13. `Receita_após_desconto_R$` — receita após desconto.
14. `Custo_produtos_R$` — custo agregado dos produtos.
15. `Lucro_bruto_simplificado_R$` — receita após desconto menos custo dos produtos.
16. `Margem_bruta_%` — margem em fração (não é lucro líquido).

Não presumir que a soma de `Margem_bruta_%` representa margem agregada. Para margens totais, calcular `SUM(lucro_bruto)/SUM(receita)` quando denominador > 0.

## Mapeamento SQLite implementado
A tabela SQL local se chama `vendas`, com 13 colunas simplificadas (não iguais aos cabeçalhos do CSV):

```
id_pedido, data, mes, canal, regiao, categoria, produto,
quantidade, preco_unitario, receita, faturamento_bruto,
custo_produtos, lucro_bruto
```

Mapeamento principal: `receita` = `Receita_após_desconto_R$`; `lucro_bruto` = `Lucro_bruto_simplificado_R$`.
As colunas `Desconto_%`, `Custo_unitário_R$` e `Margem_bruta_%` não são expostas diretamente na tabela atual.

## Exemplos de consultas didáticas (SQLite)

### Nível 1 — reconhecer tabela e seleção
```sql
SELECT produto, quantidade, receita
FROM vendas
LIMIT 5;
```
Explique: `SELECT` escolhe colunas, `FROM` seleciona a tabela, `LIMIT` limita linhas exibidas.

### Nível 2 — filtrar
```sql
SELECT mes, categoria, receita
FROM vendas
WHERE categoria = 'Informática'
LIMIT 10;
```
Explique: `WHERE` restringe os registros observados.

### Nível 3 — indicador e agrupamento
```sql
SELECT mes, ROUND(SUM(receita), 2) AS receita_total
FROM vendas
GROUP BY mes
ORDER BY mes;
```
Explique: `SUM` soma, `GROUP BY` agrupa por mês, `ORDER BY` ordena.

### Nível 4 — gráfico
Executar a consulta do nível 3 → usar `mes` como eixo horizontal e `receita_total` como eixo vertical; rótulo obrigatório: `Receita após descontos (R$)`.

### Nível 5 — comparação por categoria
```sql
SELECT categoria, ROUND(SUM(receita), 2) AS receita_total
FROM vendas
GROUP BY categoria
ORDER BY receita_total DESC;
```

## Verificações obrigatórias
- `SELECT COUNT(*) AS registros FROM vendas;` deve retornar 475.
- Agregados por mês devem refletir exatamente os números no CSV, considerando arredondamentos da planilha.
- Não alterar preços ou quantidades arbitrariamente para obter gráficos visualmente interessantes.
- Exigir consulta tabular antes do gráfico para permitir auditoria.
- Não confundir **pedidos/registros** com **unidades vendidas**: `COUNT(*)` vs `SUM(quantidade)`.
- Não confundir receita após descontos com faturamento bruto.

## Erro atual e investigação
Usuário observou `both async and sync fetching of the wasm failed` ao executar `SELECT`.

Arquivos relevantes:
- `index.html`: `<script defer src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.16.0/sql-wasm.js"></script>`.
- `js/sql-lab.js`: `const SQL_CDN='https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.16.0/';` e `initSqlJs({locateFile:file=>SQL_CDN+file})`.

Causas possíveis, a confirmar em console/Network (sem deduzir uma única causa): arquivo `.wasm` inacessível, URL/versão incorreta, bloqueio da CDN, CORS, política `file://` ou incompatibilidade de loader.

Alternativas:
- Abrir o site por `http://localhost:5500` (ou outra porta local), via servidor estático.
- Hospedar `sql-wasm.js` e `sql-wasm.wasm` na mesma distribuição e ajustar `locateFile`.
- Migrar para `sql-wasm-inline.js` (WASM embutido) e dispensar `locateFile` se compatível com a versão escolhida.
- Mensagem de falha clara e opção de tentar novamente. O `readyPromise` atual pode reter uma promessa rejeitada: permitir retry se a origem falhou temporariamente.

Testes em navegador real, com DevTools e rede:
1. Carregar apresentação pelo servidor local.
2. Verificar console e requisições WASM (200, Content-Type e origem válida).
3. Verificar `COUNT(*) = 475`.
4. Testar cada exemplo; conferir se gráfico usa a coluna numérica correta.
5. Testar erro de sintaxe, retorno zero linhas, troca de slide e uso das setas enquanto digita.
6. Simular falha de CDN e garantir mensagem compreensível.
