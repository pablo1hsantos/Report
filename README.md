# Report Operacional In-Haus • v15

Versão estática para publicação na Vercel.

## Envio pelo WhatsApp

- Ação principal única **Enviar pelo WhatsApp**: valida os campos obrigatórios, copia o relatório e abre o link de convite do grupo informado.
- **Copiar mensagem**: copia o texto sem abrir o WhatsApp.
- O WhatsApp não permite pré-preencher uma mensagem diretamente numa conversa de grupo pelo link de convite. O usuário deve colar a mensagem e confirmar o envio.
- O formulário mostra a ação principal na prévia do desktop e no rodapé fixo do celular, conforme o tamanho da tela. Não são dois envios diferentes.
- Nenhum relatório é disparado automaticamente.

## Publicação

Enviar `index.html` para a raiz do repositório `pablo1hsantos/Report` e criar um commit. Quando o projeto Vercel estiver ligado ao repositório, a implantação pode ser automática.
