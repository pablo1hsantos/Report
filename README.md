# Report Operacional In-Haus v21 – Ausências e vagas abertas

Atualização da versão 20 com painel administrativo e API protegida.

## Mudança no formulário, por CR

- **QP (Quadro Planejado)** e **QA (Quadro Ativo)** continuam como antes.
- **ABS (saldo do quadro)** permanece calculado automaticamente: `QA - QP` (por exemplo, 12 planejados e 10 ativos = -2).
- **Ausências (absenteísmo)** é um novo campo opcional, numérico inteiro, preenchido pelo supervisor.
- **Vagas abertas** é outro campo opcional, numérico inteiro, preenchido pelo supervisor.
- Um saldo negativo **não é automaticamente classificado como absenteísmo**, nem como vaga aberta. A classificação é informada pelo responsável, mesmo quando a ausência foi coberta e o saldo do quadro ficou zero.
- Campos não preenchidos são omitidos na mensagem. Zero digitado intencionalmente aparece como 0.
- Exemplo WhatsApp:

```
*CR 64399 | Arcelor HUB*
• Quadro de pessoal: Planejado: 12 | Ativo: 10
• ABS (saldo do quadro): -2
• Ausências (absenteísmo): 1
• Vagas abertas: 1
```

Não houve alteração nos cadastros do painel administrativo nem nos dados existentes do Redis. O navegador continuará preservando os rascunhos na mesma chave da versão anterior.

## Publicação

1. Substitua todos os arquivos da versão anterior na raiz de `pablo1hsantos/Report`, preservando as pastas `api/` e `lib/`.
2. Mantenha na Vercel as variáveis `ADMIN_PASSWORD`, `SESSION_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
3. Faça commit na branch de produção e confira o deploy da Vercel.
4. Verifique `/api/health` e teste um relatório preenchido parcialmente com ausências e vagas abertas.

Não coloque segredos no GitHub público.

---

# IN-HAUS | Report Operacional v20 (correção do ADM)

## O que foi corrigido
- Acesso ADM com mensagens específicas para rota inexistente (404), API indisponível (500/503) e ausência de configuração.
- Botão **Verificar conexão do servidor**, que consulta `/api/health`.
- Funções da Vercel agora em arquivos `.js` para detecção direta: `api/admin.js`, `api/config.js`, `api/health.js`.
- Sessões e gravação de cadastros continuam protegidas no servidor.
- Relatório operacional permanece com todas as regras da versão 19, inclusive os campos de itens por CR.

## IMPORTANTE: publique a pasta INTEIRA, não somente `index.html` e `admin.html`

No repositório `pablo1hsantos/Report`, a estrutura na **raiz** precisa ser:

```
index.html
admin.html
package.json
api/
  admin.js
  config.js
  health.js
lib/
  auth.mjs
  defaults.mjs
  storage.mjs
```

Pode também enviar `.gitignore`, `.env.example` e `README.md`.

Se existirem `api/admin.mjs` ou `api/config.mjs` antigos, **remova os antigos** para evitar rotas duplicadas.

1. Confira **Vercel → Project → Settings → Build and Deployment**: `Root Directory` deve ser `./`, `Framework Preset` = `Other`, sem Output Directory personalizado. Evite regra de rewrite que envie `/api/*` para `index.html`.
2. Configure em **Vercel → Project → Settings → Environment Variables** para Production:
   - `ADMIN_PASSWORD`: senha definida pelo responsável; **não grave a senha no repositório**.
   - `SESSION_SECRET`: texto aleatório de pelo menos 32 caracteres (por exemplo, gerar com `openssl rand -hex 32`).
   - `UPSTASH_REDIS_REST_URL`: URL REST do seu banco Redis.
   - `UPSTASH_REDIS_REST_TOKEN`: token com permissão de leitura e escrita no Redis.
3. Faça novo **Deploy** (ou Redeploy) após atualizar arquivos e variáveis.
4. Teste primeiro `https://reportwhatsapp.vercel.app/api/health` no navegador:
   - Resposta JSON `api: online` confirma que as rotas estão publicadas.
   - `adminConfigured: false` significa que falta `ADMIN_PASSWORD` ou `SESSION_SECRET`.
   - `databaseConfigured: false` significa que faltam credenciais Redis.
   - Se mostrar **404** ou HTML, a API não foi publicada. Confira os arquivos e Root Directory.
5. Acesse `https://reportwhatsapp.vercel.app/admin.html`, clique **Verificar conexão do servidor** e entre com a senha.
6. Os cadastros só são persistidos para todos os supervisores quando o Redis está funcionando.

### Segurança
A senha não está no HTML nem no ZIP. A API usa cookie HttpOnly/Secure, assinatura HMAC, validação de origem e limitação de tentativas de login. Recomenda-se uma senha administrativa forte em vez de seis dígitos.

### Observação
Não foi possível acessar o ambiente Vercel do usuário diretamente daqui; a correção foi validada no código e em testes locais. O login real depende de as funções e as quatro variáveis estarem publicadas.

## Ajustes de formato da mensagem (v22)

- Uma linha em branco após o título e entre os CRs, sem espaços excedentes.
- Indicadores longos usam uma quebra de linha intencional antes dos valores para leitura no celular.
- Títulos, CRs e nomes de indicadores com negrito no WhatsApp.
- Separador ` | ` padronizado entre Programado e Realizado.
- Veículos, produtos, itens e quadro de pessoal são inteiros; volumes de unidades decimais exibem pelo menos duas casas com ponto, sem arredondar precisão adicional; percentuais mantêm até uma casa decimal.
- A lógica de CRs, turnos, ausência/vaga, permissões ADM e API permanece inalterada.
