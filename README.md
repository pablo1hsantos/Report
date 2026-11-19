# Report Operacional In-Haus — v27 (correção de estabilidade)

Versão baseada na **v26**, preservando o novo layout, o painel ADM, as APIs,
os indicadores específicos de CR e os dados existentes no Redis.

## Correções

- **Falha no envio e na cópia:** a versão 26 validava `.value` de campos inexistentes nos CRs de apenas pessoal (Trefila e Belgo). Isso causava erro de JavaScript e interrompia os botões. A validação agora ignora campos ausentes.

## Correção do WhatsApp

- Removido o redirecionamento para `whatsapp://send`, que alguns navegadores Android/Samsung bloqueiam.
- Botão de envio usa o link universal oficial `https://wa.me/?text=...`, sem número ou convite de grupo.
- O relatório é preenchido no link e abre em nova guia; o formulário fica aberto com os dados salvos.
- O supervisor seleciona o grupo e confirma o envio no WhatsApp. Não é possível garantir grupo pré-selecionado.
- Validações continuam ativas: supervisor, turno e justificativa de frota quando há indisponibilidade.
- O botão Copiar mensagem permanece independente e pode ser usado se o WhatsApp não carregar o texto.

## Como publicar

1. Extraia o ZIP. Envie **todos os arquivos e pastas** ao repositório `pablo1hsantos/Report` na branch publicada, sem achatar a estrutura `api/` e `lib/`.
2. Não remova as variáveis privadas já configuradas na Vercel.
3. Não faça reset do Redis ou dos cadastros administrativos.
4. Confirme que `https://reportwhatsapp.vercel.app/api/health` mostra `ready: true`.
5. Teste com um supervisor no celular e outro no desktop antes de liberar para o grupo todo.

## Teste funcional sugerido

- Sandro: CR 66003 e Trefila (somente pessoal); disponibilidade de 12 contratados / 9 disponíveis exige justificativa.
- Alexandre: turno Administrativo; HUB/CDB AE/CDB III com itens; Peação somente veículos.
- Alef: 3º turno automático.
- QP 12, QA 10 deve gerar ABS -2.
- Verificar alternância tema claro/escuro, copiar e enviar WhatsApp com a mensagem completa.

## Limites

A abertura do WhatsApp depende das configurações do aparelho e do navegador. O link de compartilhamento não pode abrir automaticamente um grupo específico com texto pré-preenchido. Não deixe senhas/tokens no GitHub público.

---

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
