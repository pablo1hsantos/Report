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
