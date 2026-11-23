# Report Operacional In-Haus — Versão 25: variação e absenteísmo separados

Ajuste de nomenclatura solicitado pela supervisão: **ABS** não aparece mais no formulário, no texto enviado ao WhatsApp nem na imagem PNG. O cálculo automático de `Quadro Ativo − Quadro Planejado` permanece, com o nome **Variação do quadro**.

Na mensagem, a variação aparece **dentro do bloco Quadro de pessoal**, seguida de Ausências (absenteísmo) e Vagas abertas somente quando cada campo estiver preenchido.

Exemplo:

```text
• Quadro de pessoal:
  Planejado: 16 | Ativo: 14 | Variação: -2
• Ausências (absenteísmo): 0
• Vagas abertas: 2
```

As ausências informadas não são calculadas pela variação; portanto, uma variação de -2 com 0 ausências e 2 vagas abertas é válida. Dados gravados, login, API, painel ADM, vínculo de CRs e geração de PNG continuam iguais.

Para publicar, substitua os arquivos da raiz do repositório, preservando a estrutura `api/` e `lib/`. Não envie senhas ou tokens ao GitHub.

---

# Report Operacional In-Haus — Versão 24: compartilhamento por imagem

Adiciona a criação de uma **imagem PNG profissional** contendo apenas os CRs e indicadores preenchidos. O formato de texto anterior permanece disponível como alternativa.

## O que muda na tela do relatório

- **Prévia da imagem** gerada automaticamente, com identidade visual In-Haus. É possível alternar entre as prévias de **Imagem** e **Texto**.
- **Compartilhar imagem:** em celulares e navegadores compatíveis, abre a folha de compartilhamento do sistema. Selecione **WhatsApp**, o grupo de Supervisão e confirme o envio. Essa seleção do grupo continua manual.
- **Copiar imagem:** copia o PNG para a área de transferência, quando o navegador permite. Abra a conversa e cole.
- **Baixar PNG:** alternativa confiável em navegadores que bloqueiam a cópia de imagem. Envie como anexo no WhatsApp.
- **Copiar texto:** preserva o fluxo anterior.

### Compatibilidade

A API de compartilhamento de arquivos e a cópia de imagem dependem do navegador e geralmente exigem HTTPS, que a Vercel fornece. No Android recomenda-se Chrome. O navegador pode bloquear a escrita de imagem na área de transferência; nesse caso, o sistema gera automaticamente um PNG para download. Não há API oficial para inserir uma imagem automaticamente em um grupo específico de WhatsApp, nem envio sem confirmação do usuário.

### Regras preservadas

- Supervisor com seus CRs específicos, turnos automáticos e turno obrigatório.
- Toneladas Arcelor; produtos Whirlpool; Peação e Inspeções só veículos.
- Itens para HUB, CDB AE e CDB III.
- Quadro Planejado, Quadro Ativo, saldo ABS = QA - QP, ausências e vagas abertas separados.
- Disponibilidade de frota e justificativa do CR 66003.
- CRs e campos vazios omitidos; indicadores parciais permitidos.
- ADM, endpoints API, Redis e configurações de segurança preservados.

## Publicação

Envie o conteúdo desta pasta, com **todas** as subpastas `api/` e `lib/`, para a raiz do repositório `pablo1hsantos/Report`. As variáveis do servidor já existentes na Vercel permanecem. Faça commit e aguarde o deploy.

Não coloque a senha ou os tokens do Redis no GitHub público.

# Report Operacional In-Haus v23 — Disponibilidade da frota (Arcelor Transporte)

Esta versão acrescenta **Disponibilidade de veículos** no **CR 66003 | Arcelor Transporte**, vinculado ao supervisor Sandro Alexandre da Silva. Os campos antigos de Veículos (Programado/Realizado), Volume, quadro de pessoal e demais indicadores **permanecem**.

## Formulário e WhatsApp

- Veículos previstos para a operação (inteiro, opcional se ambos os campos estiverem vazios).
- Veículos disponíveis para a operação (inteiro).
- Veículos indisponíveis: cálculo automático `previstos − disponíveis`.
- Se a diferença for positiva, o campo **Justificativa da indisponibilidade** aparece e torna-se obrigatório para copiar ou enviar a mensagem.
- Se começar a informar a disponibilidade, ambos os números precisam ser preenchidos. Não é permitida quantidade disponível maior que a prevista.
- No WhatsApp, as informações de disponibilidade só aparecem se preenchidas; a justificativa só aparece quando há indisponíveis.
- Os demais CRs e o fechamento geral continuam aceitando preenchimento parcial.

**Exemplo:** previstos 12, disponíveis 9 → 3 indisponíveis; justificativa “2 veículos em manutenção e 1 aguardando liberação”.

## Administração

Em **Administração → CRs**, foi incluída a opção **Controlar disponibilidade da frota** para habilitar ou desabilitar esse grupo de indicadores em qualquer CR. No CR 66003, o recurso fica habilitado por padrão, **inclusive quando o banco Redis ainda tem um cadastro antigo sem a nova propriedade**. Ao salvar os cadastros, a escolha passa a ser gravada no Redis.

## Atualização na Vercel

Substitua os arquivos na raiz do repositório, incluindo `index.html`, `admin.html` e `lib/defaults.mjs`; preserve `api/`, `lib/`, `package.json` e suas variáveis privadas existentes. Faça commit e aguarde a publicação. Não coloque senha nem tokens no repositório público.

---

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
