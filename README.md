# 🐱 Cats are liquid!

![Cats are liquid!](http://i.imgur.com/tAUw0vQ.jpg)

De fato, gatos são líquidos. Isto posto, nossa aplicação tem como objetivo gerar perguntas a partir de um texto qualquer. Essa funcionalidade tem como meta auxiliar professores e alunos alcançarem um melhor nível de compreensão do conteúdo estudado.

## Problema

Escolhemos, como alvo, uma proposta que ajude de alguma forma o desenvolvimento de pessoas com problemas de neuro-desenvolvimento - mais especificamente, crianças com dislexia - de forma a incentivar a leitura que comumente é uma prática quase que inexistente em uma pessoa disléxica, principalmente devido à sua dificuldade em reconhecer caracteres.

## Proposta de solução

Uma aplicação que gera perguntas aleatórias a partir de um texto para que pais ou professores possam mais facilmente monitorar o desenvolvimento da criança.

Uma outra proposta para essa aplicação é que ela tenha fontes recomendadas para dislexia, textos sucintos e uma aba de navegação para que a criança consiga, por conta própria, acessar outros textos de interesse próprio - seria essencial que existisse uma pré-seleção de textos, dado que o publico alvo são principalmente crianças e adolescentes.

Além disso, para quaisquer perguntas erradas ou sem sentido que possam surgir, é permitido editar a pergunta.

## Tecnologias

### Front-end

Para o front-end, foi utilizado o framework Next.js, junto com a biblioteca de interface Chakra UI. Nela, chamamos as rotas do back-end para montar as páginas necessárias. As páginas criadas foram:

- Inicial, que contém todos os textos já salvos no banco de dados;

![Página inicial](/images/page-1.png)

- Adicionar texto, que permite a adição de um novo texto;

![Página de adição de texto](/images/page-2.png)

- Detalhes do texto, que contém o texto selecionado e as perguntas geradas a partir dele.

![Página de detalhes do texto](/images/page-3.png)

## Utilização

Nossa aplicação é dividida em dois módulos: back-end (localizado no diretório `api`) e front-end (localizado no diretório `web`).

No diretório `api`, execute o comando `make install` para instalar as dependências do projeto via pip. Em seguida, execute o comando `make dev` para iniciar o servidor de desenvolvimento. A documentação da api pode ser acessada em `http://localhost:8000/docs`.

No diretório `web`, execute o comando `npm install` para instalar as dependências do projeto. Em seguida, execute o comando `npm run dev` para iniciar o servidor de desenvolvimento. Por fim, acesse o endereço `http://localhost:3000` para utilizar a aplicação.

## Equipe

- [Juan Belieni](https://github.com/juanbelieni)
- [Gabriel de Melo](https://github.com/Gab-Mel)

## Licença

[MIT](/LICENSE)
