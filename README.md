# Report Operacional In-Haus

Formulário web estático, sem login e sem banco de dados, preparado para publicação na Vercel.

## Publicação

1. Descompacte o arquivo ZIP em uma pasta.
2. Acesse https://vercel.com/new ou https://vercel.com/drop (quando disponível).
3. Importe esta pasta, arraste a pasta ou conecte um repositório GitHub com `index.html` na raiz.
4. Preset: **Other**. Framework: **None**. Build command: **vazio**. Output directory: **raiz**.
5. Publique e compartilhe a URL criada pela Vercel com os responsáveis.

## Uso

- Escolha a função, o responsável cadastrado, o CR e o turno.
- Informe programação, realizado e quadro de pessoal conforme aplicável.
- Registre desvios e pendências apenas quando existirem.
- Revise a prévia e toque em **Enviar pelo WhatsApp**. O WhatsApp permite escolher o grupo antes de confirmar.
- **Novo report** limpa os indicadores e mantém responsável, CR, turno e unidade do volume.

## Dados pré-configurados

- 3 coordenadores, 11 supervisores e 1 engenheiro SSMA (um nome presente nas listas de coordenador e supervisor, conforme informado).
- 11 centros de resultado (CRs), conforme relação enviada pelo solicitante.

## Limites e privacidade

- Os dados digitados ficam somente no armazenamento local do navegador até o usuário limpar os dados. Não há servidor, login, banco de dados ou registros centralizados.
- O envio ao grupo não é automático: depende de confirmação no aplicativo WhatsApp. O grupo não pode ser selecionado automaticamente apenas com um link público de compartilhamento.
- O relatório não possui trilha de auditoria, assinatura, histórico corporativo ou acesso restrito. Não use como registro oficial sem controle adicional.
- Para adicionar ou alterar responsáveis e CRs, edite as listas `STAFF` e `CRS` no bloco `<script>` do `index.html`.

Visual inspirado nas cores e linguagem visual disponíveis em https://inhauslogistica.com.br/. Esta é uma ferramenta interna independente, não um produto oficial do site.
