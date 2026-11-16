# Base de dados e laboratório SQL

## Arquivos canônicos
- `base_vendas_analise_com_ia.csv` na raiz: referência numérica, UTF-8 com BOM, separador `;` e ponto decimal.
- `base_vendas_analise_com_ia.xlsx` na raiz: apoio original preservado, inclui conteúdo didático e fórmulas com precisão diferente.
- Ambas são **fictícias** e adequadas à divulgação ao público.
- `scripts/build.py` gera `js/data.js` exclusivamente do CSV; não editar o JS manualmente. Não há pasta `data/` no estado atual.
- O CSV soma **R$ 52.841,96** de receita; o XLSX original, **R$ 52.841,89**. Usar o CSV nas comparações entre ferramentas; não alterar as fontes para eliminar essa diferença.

## Perfil do dataset confirmado
- 475 linhas/transações de vendas, 16 colunas.
- Período: maio a outubro de 2026, seis meses.
- Distribuição de registros por mês: 2026-05 (65), 2026-06 (75), 2026-07 (88), 2026-08 (94), 2026-09 (82), 2026-10 (71).
- 909 unidades; receita de junho: R$ 7.022,65.
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
- Agregados por mês devem refletir os valores registrados por linha no CSV. Recalcular preço × quantidade × desconto com outra regra de arredondamento pode mudar centavos.
- Não alterar preços ou quantidades arbitrariamente para obter gráficos visualmente interessantes.
- Exigir consulta tabular antes do gráfico para permitir auditoria.
- Não confundir **pedidos/registros** com **unidades vendidas**: `COUNT(*)` vs `SUM(quantidade)`.
- Não confundir receita após descontos com faturamento bruto.

## Execução e representação atuais
- `js/sql-engine.js` carrega `vendor/sql.js/sql-wasm-inline.js` dentro de Worker. O WASM está incorporado no JS; não há fetch de `.wasm` separado nem CDN de SQLite.
- O laboratório aceita uma consulta iniciada por `SELECT` de cada vez, e a base usa `PRAGMA query_only`. Não remover essas proteções.
- A preparação tem limite de 15 segundos e a consulta, 8 segundos. Timeout/reset encerra o Worker e permite preparar novamente. Editar a consulta invalida o resultado anterior e cancela execução pendente.
- Tabela SQL e gráfico mostram as mesmas primeiras 20 linhas, na ordem da consulta, com aviso quando houver mais. O laboratório de exploração agrega toda a seleção e mostra uma amostra de oito registros.
- Categoria e indicador são selecionáveis. Categorias podem ser texto ou números; dois agregados numa linha não devem ser tratados automaticamente como categoria e indicador.
- **Reais** e **Número** formatam valores. **Taxa em fração** exibe uma taxa já calculada no SELECT: 0,25 → 25%. **Participação** calcula valor ÷ soma de todas as linhas retornadas, antes do limite visual, e adiciona coluna à tabela. Não calcular participação para negativos ou total zero.
- Conferir a unidade sugerida pelo alias. Preservar NULL como ausência de valor, sinais negativos, precisão útil para frações pequenas e rótulos legíveis para até 20 categorias.

## Verificação após mudanças em SQL/dados/gráficos
1. Servir por `http://localhost` e conferir console, carregamento local e ausência de dependência SQLite externa.
2. Executar contagem, total e agregado mensal; comparar com cálculo independente do CSV: 475 registros, 909 unidades, R$ 52.841,96 e junho R$ 7.022,65.
3. Conferir exemplos, troca de indicador/unidade, NULL, zero, negativos, resultado vazio e mais de 20 linhas.
4. Testar erro de sintaxe, foco/setas no editor e edição durante execução; consulta antiga não deve reaparecer como resultado atual.
5. Se alterar engine/carregamento, simular falha e retry, e confirmar timeout de consulta mantendo navegação. Executar consulta pesada somente em navegador isolado com watchdog, nunca na sessão da aula.
6. Se compartilhar HTML único, regenerá-lo e testar sua execução; ele incorpora vendor como texto para o Worker. A versão exportada já foi exercitada por HTTP e como arquivo local, mas mudanças futuras precisam de nova verificação.
