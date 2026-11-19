# IN-HAUS | REPORT OPERACIONAL — v26

Projeto completo para **GitHub `pablo1hsantos/Report`** e **Vercel `reportwhatsapp.vercel.app`**.

## Arquivos para deploy

Envie **todo o conteúdo** deste pacote à raiz do repositório, mantendo a estrutura:

```
index.html
admin.html
api/admin.js
api/config.js
api/health.js
lib/auth.mjs
lib/defaults.mjs
lib/storage.mjs
package.json
.gitignore
.env.example
```

Em Vercel → Settings → Build and Deployment: **Framework Preset = Other**, **Root Directory = `./`**. Não defina Build Command ou Output Directory personalizados. Verifique que as variáveis abaixo estejam em **Production**, sem publicá-las no GitHub:

- `ADMIN_PASSWORD` — senha administrativa (recomendamos uma senha longa, nova e exclusiva)
- `SESSION_SECRET` — segredo aleatório com no mínimo 32 caracteres
- `UPSTASH_REDIS_REST_URL` — URL REST do Redis
- `UPSTASH_REDIS_REST_TOKEN` — token REST do Redis

As variáveis já configuradas podem ser mantidas. Realize novo deploy após o commit. Verifique `https://reportwhatsapp.vercel.app/api/health` e depois `https://reportwhatsapp.vercel.app/admin.html`.

## Alterações consolidadas

- Data e hora do aparelho **automaticamente no momento de gerar/copiar/enviar**, no cabeçalho da mensagem (`DD/MM/AAAA HH:MM`). Campo de data removido.
- Cabeçalho `IN-HAUS | REPORT OPERACIONAL` e `Supervisor: NOME (Turno)`.
- Linha `━━━━━━━━━━━━━━━━━━━━` antes de cada CR informado e do fechamento geral.
- Supervisor listado em ordem alfabética com busca e seleção em um toque. Turnos de Alexandre (Administrativo) e Alef (3º turno) continuam sugeridos.
- Indicadores por CR: HUB/CDB AE/CDB III têm veículos, toneladas e itens; Whirlpool tem veículos e produtos; Inspeções/Peação têm apenas veículos; Trefila/Belgo têm **somente quadro de pessoal**; Transporte tem veículos, disponibilidade de frota e quadro de pessoal.
- Transporte: `Contrato | Disponíveis`, diferença automática e justificativa obrigatória quando houver déficit.
- `ABS = QA − QP`; ausências e vagas abertas em campos separados; campos e CRs vazios omitidos; turno obrigatório.
- Apenas o rótulo `ABS` no formulário e WhatsApp, sem `(saldo do quadro)`.
- Botão flutuante junto ao rodapé da janela: ícones redesenhados de lua e sol, sempre visíveis durante a rolagem, sem cobrir o botão do WhatsApp no celular. A escolha fica salva no dispositivo.
- Interface refinada no report e na administração: tipografia, paleta institucional, alinhamento, campos, cards e botões; sem alterações nas regras de negócio.
- Removidos os comentários explicativos indicados do formulário. Prévia disponível, sem “Ao vivo”.
- Painel administrativo preservado e ampliado com a configuração **Somente quadro de pessoal** por CR.

## Preservação dos cadastros existentes

O Redis mantém seus cadastros de supervisores, turnos e CRs. Na leitura de um cadastro anterior a esta versão, o servidor migra a configuração da Trefila, Belgo e Transporte para os novos modelos. Um salvamento no ADM grava o novo formato. **Não apague nem redefina o Redis para atualizar.**

## Compartilhamento

O botão WhatsApp leva a mensagem preenchida ao fluxo de compartilhamento. A seleção do grupo é realizada dentro do WhatsApp: o aplicativo não garante preenchimento direto de um grupo específico pelo link de convite. A opção “Copiar mensagem” permanece.

## Segurança

Nunca suba `.env`, tokens ou senha administrativa no GitHub público. O painel valida as credenciais no servidor. Para acesso remoto, usar HTTPS da Vercel.
