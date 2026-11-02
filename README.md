# AmigosChat — projeto gratuito (protótipo v2)

Objetivo: criar um chat privado para PC Windows e Android, com funções inspiradas em apps de comunidades.

## Gratuito
O código é gratuito e pode ser executado localmente. Para manter amigos conectados pela internet, é necessário hospedar o backend. Existem opções gratuitas com limites; voz/tela em uso intenso pode exigir infraestrutura extra (TURN), que nem sempre é grátis.

## Incluído nesta versão
- Interface responsiva (PC + celular)
- Servidores e canais na interface (protótipo local)
- Chat básico com Socket.IO
- Compartilhamento de tela no navegador desktop (experimental, HTTPS obrigatório fora do localhost)
- Tema escuro
- Tela de entrada com nome e sala

## Ainda não implementado de verdade
- Autenticação, contas e recuperação de senha
- Persistência de servidores, mensagens e cargos
- Permissões de cargos/roles e moderação
- Chamadas de voz robustas e chamadas em grupo
- Compartilhamento de tela com áudio confiável em todos os sistemas
- Aplicativo Android nativo e captura de tela Android
- Upload de arquivos, imagens, GIFs, reações, threads, mensagens diretas
- Push notifications, presença, lista de amigos, bloqueio
- Criptografia ponta a ponta, anti-spam, logs de auditoria
- Instaladores .exe/.apk

**Aviso:** não coloque este protótipo na internet pública sem autenticação, validação, proteção contra abuso e HTTPS. Não use para informações sensíveis.

## Rodar
1. Instale Node.js 20+
2. Extraia o ZIP
3. Abra o terminal dentro da pasta e execute:
   `npm install`
   `npm start`
4. No PC, acesse `http://localhost:3000`

Para usar com amigos remotamente, será necessário deploy/hospedagem e HTTPS. O navegador Android abre a interface, mas não tem garantia de compartilhar a tela do próprio celular.

## Publicar gratuitamente no Render (passo a passo)

1. No PC, crie uma conta no GitHub e entre em https://github.com.
2. Crie um repositório novo chamado `amigoschat` (pode ser privado).
3. Envie todos os arquivos desta pasta para o repositório (`public/`, `server.js`, `package.json`, `render.yaml` e este README).
4. Entre em https://render.com e conecte sua conta GitHub.
5. No Render, escolha **New + → Blueprint** e selecione o repositório `amigoschat`.
6. O Render vai ler `render.yaml`. Confirme a criação do serviço.
7. Quando o deploy terminar, abra a URL `https://...onrender.com` fornecida pelo Render.
8. Envie essa URL aos amigos. Todos precisam entrar na mesma sala para conversar.

### Observações
- O plano gratuito pode suspender o serviço quando fica sem uso; a primeira abertura depois disso pode demorar.
- Este projeto ainda é um protótipo. Não use como comunidade pública ou para dados privados: ainda não tem login, armazenamento persistente, nem segurança/moderação suficientes.
- Compartilhamento de tela depende de navegador compatível e normalmente só funciona no PC; no Android, o suporte é limitado.
- Não compartilhe tokens, senhas ou dados pessoais no chat.
