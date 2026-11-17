# In-Haus | Report Operacional v19 com Administração

## O que existe no projeto

- `/index.html` — report do supervisor, responsivo, compartilha via WhatsApp.
- `/admin.html` — tela administrativa, para editar supervisores, vínculos, CRs, turnos, unidades e título da mensagem.
- `/api/config.mjs` — fornece publicamente os cadastros operacionais usados no report.
- `/api/admin.mjs` — autenticação e gravação exclusiva para administrador.
- `/lib/*.mjs` — configuração inicial, validação, autenticação e banco de dados.
- `/package.json` — módulo Node para as funções da Vercel.

## Publicar na Vercel / GitHub

1. Envie **todos os arquivos e pastas deste ZIP** para a raiz do repositório `pablo1hsantos/Report`, preservando as pastas `api` e `lib`. Não basta substituir o `index.html`.
2. Na Vercel, confira o projeto conectado a esse repositório (Framework Preset: `Other`; Root Directory: `./`).
3. Crie um banco **Upstash Redis** permanente e obtenha sua REST URL e REST Token padrão (não use o token de leitura).
4. Em **Vercel → Project → Settings → Environment Variables**, configure em `Production` (e `Preview` se desejar):
   - `ADMIN_PASSWORD`: **use a senha de administração que você definiu na conversa**, somente no painel privado da Vercel.
   - `SESSION_SECRET`: segredo aleatório com ao menos 32 caracteres; recomendado 64+ aleatórios (por exemplo, `openssl rand -hex 32`).
   - `UPSTASH_REDIS_REST_URL`: URL HTTPS do banco.
   - `UPSTASH_REDIS_REST_TOKEN`: token privado de leitura/gravação do banco.
5. Faça o **Redeploy** depois de configurar as variáveis de ambiente.
6. Acesse `https://SEU-DOMINIO.vercel.app/admin.html`, autentique-se, edite os cadastros e clique em **Salvar alterações**.
7. Acesse `https://SEU-DOMINIO.vercel.app/` ou atualize a página já aberta. Os novos cadastros serão carregados em todos os dispositivos.

### Segurança

- A senha **não está no código**, no HTML, no README nem no GitHub. Fica exclusivamente na variável de ambiente protegida `ADMIN_PASSWORD`.
- Sessão autenticada por cookie assinado, `HttpOnly`, `Secure`, `SameSite=Strict`, expira após 8 horas.
- Tentativas de login limitadas a 10 por IP a cada 15 minutos, com estado armazenado no Redis.
- Salvamento exige autenticação, mesma origem HTTPS e validação no servidor.
- **A senha de seis dígitos escolhida é fraca para um painel público.** Recomenda-se mudar para uma senha longa, exclusiva e aleatória assim que possível.
- Não envie o arquivo `.env` com valores reais ao GitHub.

### Comportamento sem banco de dados

O formulário público continua utilizável com os cadastros iniciais quando não há Redis configurado; porém, **não há gravação compartilhada** sem o banco. A área administrativa apresenta aviso de configuração pendente até que as quatro variáveis sejam cadastradas.

### Regras preservadas

- Nenhum supervisor selecionado ao abrir o report.
- Turno obrigatório, com padrão automático para Alexandre (Administrativo) e Alef (3º turno).
- CRs carregados conforme o supervisor, podendo expandir/recolher.
- Arcelor: toneladas; Whirlpool: produtos. Peação e Inspeções: apenas veículos. Todos têm quadro de pessoal.
- HUB, CDB AE e CDB III: itens programados e realizados.
- `ABS = Quadro Ativo - Quadro Planejado`, incluindo saldos negativos.
- Indicadores opcionais e omissão de campos/CRs sem dados no WhatsApp.
- Uma linha vazia depois do título da mensagem. Envio pelo WhatsApp requer escolher o grupo e confirmar no aplicativo.

> Importante: o link de convite para um grupo não permite preencher automaticamente o texto diretamente nele, por limitação do WhatsApp.
