---
title: "Fullstack com Node.js, React e GraphQL — Parte 2: Setup inicial e servidor Node.js com Express"
date: "2018-03-06T00:59:33.036Z"
---
E aí, pessoal! Neste segundo post da série [**Fullstack com Node.js, React e GraphQL**](/fullstack-node-react-graphql-introducao-2c2f18c757c4) vamos fazer o setup inicial do projeto e o básico do servidor Express.

![](/1_Kcvo-cPi0qsxOtKTZkWAuw.png)

O código final desta parte do projeto está aqui: [https://github.com/doug2k1/my-money/tree/v1.0.0](https://github.com/doug2k1/my-money/tree/v1.0.0)

## Pré-requisitos

Ter **Node.js** (com npm) e **Git** instalados, terminal e um bom editor de códigos. É importante também saber o básico de utilização do npm, como instalar um módulo, diferença entre _dependencies_ e _devDependencies_, criar e usar npm scripts.

## Estrutura de pastas

Vamos estruturar a aplicação de forma que o backend e o frontend fiquem no mesmo repositório. Na raiz da aplicação fica o código do servidor (back) e na pasta client fica o código do cliente (front). Estamos seguindo mais ou menos a estrutura mostrada no curso [**Node with React: Fullstack Web Development**](http://bit.ly/udemy-fullstack), do Stephen Grider.

my-money/  
&nbsp;&nbsp;&nbsp;&nbsp;client/  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... arquivos do front  
&nbsp;&nbsp;&nbsp;&nbsp;src/    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... código-fonte do server  
&nbsp;&nbsp;&nbsp;&nbsp;.gitgnore    
&nbsp;&nbsp;&nbsp;&nbsp;.npmrc  

O _.gitignore_ lista os arquivos e pastas que serão ignorados pelo Git. Podemos começar colocando `node_modules` aí. O _.npmrc_ define opções para o npm. No meu caso só coloquei `progress=false` para desabilitar a barra de progresso na instalação de módulos e agilizar um pouco o processo.

Os primeiros passos serão inicializar o repositório Git com `git init` e criar o _package.json_ com `npm init -y`.

Vamos definir a versão do Node no package.json:

```json
"engines": {  
  "node": "9.x.x"  
}
```

Isso será usado mais pra frente por alguns módulos, como ESLint, e também no processo de build no Heroku.

## Prettier

Pra garantir a formatação consistente do código JS vamos usar o [**Prettier**](https://prettier.io/). Melhor ainda se configurado no editor para formatar automaticamente ao salvar. No site dele tem as instruções para integrar com a maioria dos editores.

```bash
npm i -D prettier
```

Você pode criar um arquivo _.prettierrc_ na raiz da aplicação para configurá-lo. A única opção que coloco é `singleQuote: true` para ele formatar strings com aspas simples. De resto vai o default mesmo.

Você também pode criar um script npm para rodar o Prettier em todos os arquivos:

```json
"prettier": "prettier --write \"./{src,client/src}/**/*.{js,scss}\""
```

A opção `--write` já vai aplicar a formatação em todos os arquivos que estiverem fora do padrão.

## ESLint

Vamos usar o [**ESLint**](https://eslint.org/) para fazer análise estática do código e garantir algumas boas práticas. Assim como o Prettier, o ESLint pode ser integrado ao editor para mostrar os erros de validação direto no código.

```bash
npm i -D eslint eslint-config-prettier eslint-plugin-node
```

Além do core do ESLint, instalamos o **eslint-config-prettier** para evitar conflitos de outros plugins com as regras de formatação do Prettier, e o **eslint-plugin-node**, que adicionar algumas regras para código Node.js.

Vamos criar o _.eslintrc.js_ na raiz da aplicação para configurar o ESLint, com o conteúdo:

```js
module.exports = {  
  root: true,  
  plugins: ['node'],  
  extends: ['plugin:node/recommended', 'prettier'],  
  env: {  
    node: true  
  }  
};
```

Com isso estamos usando as regras recomendadas para desenvolvimento Node.js.

Vamos também adicionar um script npm:

```json
"lint": "eslint --fix \"./{src,client/src}/**/*.js\""
```

A opção `--fix` vai corrigir automaticamente os erros que forem possíveis e alertas sobre os que não forem possíveis de corrigir automaticamente.

## Servidor Express

Vamos instalar o [**Express**](https://expressjs.com/):

```bash
npm i express 
```

E inicializar o servidor no arquivo _src/index.js_:

```js
const path = require('path');  
const express = require('express');

const app = express();

// static files  
app.use(express.static('public'));

// start server  
app.listen(process.env.PORT || 5000);
```

Aqui estamos configurando o servidor para servir o que estiver na pasta _public_ como conteúdo estático.

Na última linha iniciamos efetivamente o servidor na porta que estiver na variável de ambiente `PORT` ou na porta 5000 se não tiver a variável. Isso significa se executarmos `node src/index` ele vai rodar na 5000 ou se fizermos `PORT=9999 node src/index` ele roda na porta 9999.

Vamos adicionar um script npm pra facilitar a execução:

```json
"start": "node src/index"
```

Por fim adicionamos um arquivo HTML em _public/index.html_. Como o servidor está servindo o que estiver na pasta _public_, ao acessar [http://localhost:5000](http://localhost:5000) ele vai servir o _index.html_.

Agora é só executar `npm start` e acessar [http://localhost:5000](http://localhost:5000):

![](/1_X7CLaIt207qGwQ4NcyPYbQ.png)

Servidor rodando local

## Resultado final

O código do projeto até este ponto está em: [https://github.com/doug2k1/my-money/tree/v1.0.0](https://github.com/doug2k1/my-money/tree/v1.0.0)

## No próximo capítulo

Na próxima parte vamos adicionar o banco de dados **PostgreSQL** na jogada. _Stay tuned!_

## Feedbacks?

E aí, o que está achando até agora? Algo que precisa melhorar?

\[\]’s

## 🔥 [Pacote Fullstack | 4 Cursos Completos](https://www.webdevdrops.com/pacote-full-stack/wdd)

A **Danki Code** está oferecendo uma formação para **desenvolvedor fullstack** bastente completa, englobando frontend, backend, UX/UI, SEO, etc.   
[**Saiba mais...**](https://www.webdevdrops.com/pacote-full-stack/wdd)