# Report Operacional In-Haus | v12

Projeto estático, pronto para implantação a partir do repositório `pablo1hsantos/Report` na Vercel.

## Regras
- Turno obrigatório antes de copiar ou compartilhar o report. Para Alexandre Fernando Barbosa o turno é sugerido como Administrativo; para Alef Augusto França, como 3º turno. Continua editável.
- Toneladas (operações Arcelor com indicador de volume): casas decimais separadas por ponto (`12.5`, `8.25`). Uma vírgula digitada é convertida automaticamente em ponto.
- Contagem de veículos, produtos Whirlpool e colaboradores: números inteiros.
- Percentuais do relatório usam ponto quando possuem casas decimais (`87.5%`).
- Os CRs Peação e Inspeções têm apenas veículos, sem campo de volume.
- Apenas campos preenchidos aparecem na mensagem. ABS = Quadro Ativo - Quadro Planejado.

## Publicação
Enviar/substituir `index.html` na raiz do GitHub `https://github.com/pablo1hsantos/Report` e confirmar o commit; a Vercel conectada ao repositório fará a publicação. Sem build ou dependências.
