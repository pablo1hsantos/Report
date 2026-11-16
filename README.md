# Report Operacional In-Haus — versão 16

Aplicação estática, arquivo principal: `index.html`. Pronta para a raiz de `pablo1hsantos/Report` e publicação na Vercel.

## Enviar pelo WhatsApp

O botão **Enviar pelo WhatsApp** valida supervisor e turno e abre o compartilhamento do WhatsApp com o relatório preenchido.

- **Celular:** abre o aplicativo WhatsApp com a mensagem pronta (protocolo `whatsapp://send?text=`). O supervisor escolhe o grupo **GPS - Supervisão Jonathan** e confirma o envio.
- **Computador:** usa o compartilhamento oficial `https://wa.me/?text=...`, que mostra o texto pronto e permite selecionar o grupo no WhatsApp Web ou aplicativo.
- **Copiar mensagem:** copia o texto, sem abrir o WhatsApp.

**Limitação do WhatsApp:** um link de convite `https://chat.whatsapp.com/...` abre o grupo, mas não aceita mensagem pré-preenchida. Não é possível, por um link público, abrir diretamente um grupo específico e já deixar seu relatório no campo de mensagem. Por isso a versão 16 prioriza a mensagem pronta, solicitando a escolha do grupo. O envio final exige confirmação do usuário.

O link de convite do grupo não está exposto no código desta versão.

## Publicação

Substitua `index.html` na raiz do repositório GitHub vinculado à Vercel. Não requer compilação.
