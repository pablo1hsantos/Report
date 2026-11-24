# Report Operacional In-Haus | v35 - Motivos somente em variação negativa

- Com **Quadro Ativo acima do Planejado**, a variação aparece com sinal positivo, sem bloco de Ausências/Vagas abertas.
- Com **Quadro Ativo igual ao Planejado**, a variação é zero e o bloco de motivos não aparece.
- Com **Quadro Ativo abaixo do Planejado**, aparece **Justificativa da variação negativa** com Ausências e Vagas abertas; é necessário preencher ao menos uma causa positiva antes de copiar ou enviar.
- O bloco fica oculto e os campos são desabilitados quando não existe déficit. Nenhum motivo entra na mensagem do WhatsApp em caso de variação positiva ou zero.
- Mantidos logo oficial, CRs, frota, painel ADM, API e regras da versão anterior.

**Se o site ainda mostrar “Ocorrências de pessoal” ou “indicadores separados”, está executando uma versão antiga.** Atualize o `index.html` no GitHub, confirme o deploy da Vercel e recarregue a página sem cache.

---

# Report Operacional In-Haus | v34 — Justificativa da variação negativa

**Regra atual:** Ausências (absenteísmo) e Vagas abertas **não são indicadores separados da variação**. São **motivos do déficit no quadro de pessoal**, a serem informados somente quando `Quadro Ativo < Quadro Planejado`.

- A variação continua automática: `Quadro Ativo − Quadro Planejado`.
- Se a variação for **positiva ou zero**, o formulário **não mostra** a justificativa e o WhatsApp **não inclui** Ausências nem Vagas abertas, mesmo que haja valores em rascunhos anteriores.
- Se for **negativa**, aparece **Justificativa da variação negativa** com Ausências e Vagas abertas; ao menos uma causa deve ter quantidade maior que zero antes do envio.
- Na mensagem WhatsApp, ambas aparecem agrupadas numa única linha de justificativa abaixo do quadro, quando informadas.
- Não há exigência de que a soma dos motivos seja igual ao déficit, conforme regra já existente.
- O restante da versão 33, incluindo logo oficial, painel ADM, API, CRs e regras de frota, permanece inalterado.

**Publicação:** atualize todos os arquivos/pastas no repositório; não coloque credenciais no GitHub.

---

## Histórico das versões anteriores (substituído pela regra atual quando houver divergência)

# Report Operacional In-Haus | Identidade visual v33

Atualização visual da versão 32 com a marca institucional oficial In-Haus Logística / Grupo GPS.

O logotipo `assets/logo-inhaus-grupo-gps.svg` é o arquivo enviado pelo usuário, copiado sem modificação. Ele é exibido em `/` (formulário) e `/admin.html` (administração).

As cores da interface foram harmonizadas com a marca (#002034, #257A98, #516266 e #BBBDBD), com adaptação para celular. Não foram alteradas as regras operacionais, autenticação, API nem os cadastros.

**Publicação:** enviar o projeto completo, incluindo a pasta `assets`, para a raiz do repositório conectado à Vercel. A imagem é referenciada em `/assets/logo-inhaus-grupo-gps.svg`; publicar apenas o HTML causará ausência do logo.

---

# Report Operacional In-Haus v32 — Motivo obrigatório somente para déficit no quadro

- **Variação do quadro = Quadro Ativo − Quadro Planejado**; valores positivos, negativos e zero continuam permitidos.
- **Variação positiva ou zero:** não requer justificativa. Ausências e vagas abertas continuam como indicadores independentes e opcionais.
- **Variação negativa:** antes de copiar ou compartilhar, informe ao menos uma quantidade maior que zero em **Ausências (absenteísmo)** e/ou **Vagas abertas**, por CR. O formulário mostra a exigência no bloco de pessoal e expande o CR se estiver pendente.
- **Sem QP ou QA informados:** não há cálculo nem justificativa obrigatória, mantendo a regra de preenchimento parcial.
- Não é imposto que a soma das ocorrências seja idêntica ao déficit, porque os dois indicadores não precisam explicar matematicamente toda diferença do quadro.
- Preservados regras de frota, CRs, ADM, API e estrutura de mensagem WhatsApp da versão 31.

---

# Report Operacional In-Haus v31 — Controles, quadro e disponibilidade

- **Botões de CR:** ações “Expandir todos” e “Recolher todos” agrupadas em um controle segmentado, com ícones simples, toque acessível e estado desabilitado claro. Botões individuais também refinados.
- **Quadro de pessoal:** `Variação = Quadro Ativo − Quadro Planejado`. Pode ser negativa, zero ou positiva. A variação **não representa automaticamente** ausências nem vagas abertas e **não exige justificativa**. Esses dois indicadores permanecem independentes e opcionais.
- **Disponibilidade de veículos:** o total disponível pode ficar **acima** do previsto. A variação é `Disponíveis − Previstos`; exemplo: 12 previstos / 14 disponíveis = **+2**.
- **Mais veículos que o previsto:** campo de **observação opcional**, exibido apenas quando preenchido, inclusive no WhatsApp.
- **Menos veículos que o previsto:** campo de **justificativa obrigatório**, mantendo a regra anterior.
- **Quantidade igual:** saldo 0 e nenhum campo de justificativa ou observação necessário.
- Mantidos todos os cadastros, regras por CR, login do ADM, API e a formatação do WhatsApp. Não há mudança nas variáveis de ambiente.

### Exemplos de relatório (dados ilustrativos)

```text
*CR 66003 | Arcelor Transporte*
• *Disponibilidade de veículos:* Previstos: 12 | Disponíveis: 14
• *Variação da disponibilidade:* +2
• *Observação:* 2 veículos adicionais de apoio à operação.
• *Quadro de pessoal:* Planejado: 10 | Ativo: 12 | *Variação:* +2
• *Ausências (absenteísmo):* 0
• *Vagas abertas:* 0
```

Para atualizar, envie **todos os arquivos e pastas** ao repositório e aguarde o deploy da Vercel. O arquivo `index.html` sozinho não atualiza funções da API caso as versões sejam diferentes.

---

# Report Operacional In-Haus v30 — Inspeções com Headcount

## Correção dos CRs 85080 e 85082

- **85080 — Arcelor Inspeções IRC** e **85082 — Arcelor Inspeções PIR** exibem **Veículos inspecionados (realizados)** e **Quadro de pessoal** no mesmo card.
- Quadro de pessoal: **Quadro Planejado, Quadro Ativo, Variação do quadro (Ativo − Planejado), Ausências (absenteísmo) e Vagas abertas**.
- Para esses CRs, **não** há veículos programados, volume, itens nem percentual de realização.
- A mensagem do WhatsApp mostra os dois conjuntos de dados, somente quando os campos forem preenchidos.
- A configuração do **ADM → CRs** agora descreve corretamente a modalidade como **Inspeção de veículos (realizados) + quadro de pessoal**.
- Configurações antigas armazenadas no Redis com `vehiclesActualOnly: true` **continuam válidas e passam a exibir headcount**, sem modificar nem apagar supervisores, vínculos ou demais cadastros.
- Demais CRs, painel de segurança, login e APIs permanecem inalterados.

**Exemplo de WhatsApp (dados ilustrativos):**

```text
*CR 85080 | Arcelor Inspeções IRC*
• *Veículos inspecionados (realizados):* 8
• *Quadro de pessoal:*
  Planejado: 12 | Ativo: 10 | *Variação:* −2
• *Ausências (absenteísmo):* 1
• *Vagas abertas:* 1
```

**Publicação:** substitua o projeto completo no GitHub e aguarde novo deploy da Vercel. Nenhuma alteração de variáveis secretas é necessária.

---

# Report Operacional In-Haus v29 — Administração e perfis de operações

## O que mudou nesta versão

**Administração → Segurança → Alterar senha**
- Administrador informa senha atual, nova senha (mínimo de 12 caracteres) e confirmação.
- Servidor verifica a senha atual; a nova é guardada no Upstash Redis usando `scrypt` e sal aleatório. Nenhuma senha ou hash é embutido no HTML público.
- A troca substitui a senha anterior para autenticação e invalida as demais sessões administrativas. A sessão que realizou a troca recebe um novo cookie.
- `ADMIN_PASSWORD` na Vercel continua necessário como credencial inicial. Depois da primeira troca, a credencial do Redis tem prioridade: mudar `ADMIN_PASSWORD` na Vercel não reverte uma senha já alterada no painel. A recuperação por perda de senha exige atuação autorizada no armazenamento.

**Tipos de operação por CR (editáveis em Administração → CRs)**
- `65496 — Arcelor Trefila`: somente **Quadro de pessoal (Headcount)**, com Quadro Planejado, Quadro Ativo, Variação do quadro, Ausências e Vagas abertas.
- `66655 — Arcelor Belgo`: somente **Quadro de pessoal (Headcount)**, com os mesmos indicadores.
- `85080 — Arcelor Inspeções IRC`: somente **Veículos inspecionados (realizados)**, sem Programado, sem percentual e sem Quadro de pessoal.
- `85082 — Arcelor Inspeções PIR`: mesmo padrão de inspeções.
- Os demais CRs mantêm suas regras, inclusive frota e itens. Todos mantêm campos opcionais de desvios e pendências.
- Para não apagar cadastros já existentes, configurações Redis antigas sem esses novos atributos recebem os padrões acima; um administrador pode depois alterá-los e salvar. Flags já explicitamente configuradas são respeitadas.

**Atualização na Vercel**
1. Copie todos os arquivos e pastas do ZIP para a raiz do repositório, inclusive `api/` e `lib/`.
2. Mantenha as variáveis `ADMIN_PASSWORD`, `SESSION_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
3. Publique novamente o projeto e confirme `/api/health` e `/admin.html`.
4. Entre no ADM, abra **Segurança** e altere a senha. Use uma senha nova e forte.

---

# Report Operacional In-Haus v28 — Variação do quadro (aplicada sobre os arquivos v27)

- No formulário, **ABS (saldo do quadro)** foi substituído por **Variação do quadro (Ativo − Planejado)**.
- No texto do WhatsApp, os três valores aparecem **juntos na seção Quadro de pessoal**: Planejado, Ativo e Variação, apenas quando os dois números forem informados.
- **Ausências (absenteísmo)** e **Vagas abertas** continuam campos independentes e opcionais. Zero preenchido é exibido; campos vazios são omitidos.
- Exemplo com QP 16, QA 14, ausências 0 e 2 vagas abertas:

```text
• *Quadro de pessoal:*
  Planejado: 16 | Ativo: 14 | *Variação:* −2
• *Ausências (absenteísmo):* 0
• *Vagas abertas:* 2
```

- Mantidos todos os cadastros do ADM, a API, a disponibilidade da frota, os indicadores de veículos/volume/itens, os turnos e as regras de preenchimento parcial.
- **Importante:** o arquivo v27 anexado não contém gerador de PNG; esta atualização altera o formulário e a mensagem de texto disponíveis nele, sem acrescentar ou retirar funcionalidades externas ao pacote.
- Para publicar, substitua os arquivos do repositório pelo conteúdo deste ZIP, incluindo as pastas `api/` e `lib/`. Não inclua senhas ou tokens no GitHub.

---

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
- **ABS (saldo do quadro)** era o nome usado na versão 21; desde a v28 aparece como **Variação do quadro**, com o mesmo cálculo: `QA - QP` (por exemplo, 12 planejados e 10 ativos = -2).
- **Ausências (absenteísmo)** é um novo campo opcional, numérico inteiro, preenchido pelo supervisor.
- **Vagas abertas** é outro campo opcional, numérico inteiro, preenchido pelo supervisor.
- Um saldo negativo **não é automaticamente classificado como absenteísmo**, nem como vaga aberta. A classificação é informada pelo responsável, mesmo quando a ausência foi coberta e o saldo do quadro ficou zero.
- Campos não preenchidos são omitidos na mensagem. Zero digitado intencionalmente aparece como 0.
- Exemplo WhatsApp:

```
*CR 64399 | Arcelor HUB*
• Quadro de pessoal: Planejado: 12 | Ativo: 10
• Variação do quadro: -2
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
