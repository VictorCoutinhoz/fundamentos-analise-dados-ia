# Identidade visual e arquitetura técnica

## Paleta Retro-Tech & Matcha (imutável sem solicitação)
| Função | Cor | HEX |
|---|---|---|
| Fundo creme analógico | Creme | `#FBFBF8` |
| Grids e divisórias | Pistache suave | `#D8E2DC` |
| Texto principal | Verde-petróleo profundo | `#1D3532` |
| Destaque estrutural | Jade/verdigris | `#3D7A6E` |
| Acento para IA/alertas | Coral vintage | `#E07A5F` |

## Tipografia e estilo
- Lora (editorial, títulos), Space Mono (código e elementos técnicos), via Google Fonts.
- Aparência de apostila de laboratório/terminal vintage; grid fino, pequenos rótulos monoespaçados, bordas precisas, sombras secas, espaços em branco generosos.
- Não transformar o deck em tema cyberpunk/neon. Coral deve ser acento pontual.
- Evitar ruído/granulação muito intensa; não afetar legibilidade no projetor.
- Layout 16:9, ocupação segura e margens adequadas para projetores; não permitir corte de conteúdo.

## Motion graphics
- Primariamente slides estáticos com animação didática apenas onde ajuda explicar transformações.
- Movimento stepped/mecânico, microtransições sem bounce; efeito typewriter com cursor `_` ou bloco para revelar definições/comandos curtos.
- Mostrar dado bruto → tabela → indicador → gráfico, ou pergunta → SELECT → resultado → gráfico.
- Suportar preferência de redução de movimento (`prefers-reduced-motion`).
- Animações não devem disputar atenção com códigos longos nem impedir avanço manual.

## Código atual conferido
A apresentação possui oito slides; o deck é composto por HTML, CSS e JS puro com Tailwind via CDN e Google Fonts.

```text
index.html                           # Shell e dependências
css/theme.css                        # Paleta e estilos/ratio
js/app.js                            # Navegação e fullscreen
js/slides.js                         # HTML dos slides 1 a 8
js/animations.js                     # Efeito typewriter
js/visuals.js                        # Gráficos SVG + indicadores
js/sql-lab.js                        # sql.js + SQLite em memória
js/data.js                           # Array 475 registros derivados
apresentacao_arquivo_unico.html      # Variante empacotada do deck
base_vendas_analise_com_ia.csv      # Base canônica na raiz
base_vendas_analise_com_ia.xlsx     # Planilha para alunos na raiz
data/                                # Cópias legadas, ainda presentes
```

### Slides atuais
1. Frase central: analista faz boas perguntas.
2. Apresentação da equipe e objetivos.
3. O que são dados? Pintura, Bíblia, memes; typewriter.
4. Dados estruturados, não estruturados e semiestruturados.
5. Quatro modelos de análise.
6. Analogia cotidiana para descritiva, diagnóstica, preditiva, prescritiva (não confundir analogia com inferência estatística).
7. Exploração de vendas por categoria, indicadores e gráfico SVG.
8. Editor `SELECT` com SQLite no browser e gráfico SVG (bug de WASM relatado).

### Lacunas de narrativa
- Precisa haver, **antes do laboratório SQL**, orientação explícita de:
  problema → boa pergunta → indicador → origem dos dados;
  SQL → tabela → SELECT → FROM → WHERE → GROUP BY → SUM → ORDER BY.
- Adicionar telas ou revelações incrementais somente se caber nas três horas.
- Respeitar a linguagem conversacional do apresentador; não sobrecarregar o slide com parágrafos.

## Regras de engenharia
- No curto prazo, manter HTML/CSS/JS puro; separar conteúdo de renderização.
- Não alterar `apresentacao_arquivo_unico.html` manualmente se puder ser gerado a partir do modular; fornecer script de empacotamento reproduzível.
- Evitar estado ou dependência duplicada. Se algum arquivo derivado conflitar com a planilha raiz, regenerá-lo de fonte única.
- Testar navegação com teclado e pointer, acessibilidade de estados, legibilidade em 1280×720 e 1920×1080.
- Não usar bibliotecas só pelo efeito visual: preferir gráficos SVG simples existentes.
