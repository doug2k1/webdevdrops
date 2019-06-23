---
title: "Fullstack com Node.js, React e GraphQL — Parte 5: Integração Contínua com Travis CI"
date: "2018-03-25T16:52:56.535Z"
---
E aí, pessoal! Neste quinto post da série [**Fullstack com Node.js, React e GraphQL**](/fullstack-node-react-graphql-introducao-2c2f18c757c4) vamos configurar integração contínua com [**Travis CI**](https://travis-ci.org/).

![](/1_FRJhbgto1rY2b3OgcRL5ow.png)

## Integração contínua

**Integração contínua** (ou **CI**) é a prática de integrar ao código principal todo novo código desenvolvido (correções ou novas funcionalidades), de forma rápida (várias vezes ao dia) e segura, fazendo verificações automatizadas para garantir que o novo código não “quebra” a aplicação.

## Travis CI

Para a nossa aplicação vamos usar um serviço que é gratuito para projetos open-source, o [**Travis CI**](https://travis-ci.org/). Nosso objetivo é que a cada _push_ realizado para o GitHub sejam feitas as validações:

*   Verificação da formatação com o Prettier
*   Análise estática com ESLint
*   Execução dos testes unitários

Se qualquer uma destas verificações falhar, dizemos que “quebrou a build”, ou seja o novo código não está OK e correções devem ser feitas.

### Cadastro

Para se cadastrar no **Travis** é só visitar [https://travis-ci.org](https://travis-ci.org/), clicar em **_Sign Up_**, e escolher a opção de usar sua conta do **GitHub**.

Já logado, encontre o repositório que queira ativar. Por exemplo:

![](/1_4Q4DODhoZ7IkNIcxlyUZpA.png)

### Configuração

Toda a configuração é feita no arquivo _.travis.yml_ na raiz da aplicação.

O processo de execução das verificações no Travis é feito em dois estágios:

*   **install**: instalação das dependências
*   **script**: execução das validações

Podemos configurar o que é feito em cada fase, e também o que é feito antes do install (**before\_install**) e antes e depois do script (**before\_script** e **after\_script**).

### Mas antes…

Antes de configurar o Travis, vamos fazer algumas alterações na aplicação.

Separei os scripts do NPM relacionados ao Prettier e ESLint desta forma:

```json
"prettier": "prettier \"./{src,client/src}/\*\*/\*.{js,scss}\"",  
"prettier:check": "npm run prettier -- -l",  
"prettier:write": "npm run prettier -- --write",  
"lint": "eslint \"./{src,client/src}/\*\*/\*.js\"",  
"lint:fix": "npm run lint -- --fix"
```

O `prettier:write` e o `lint:fix` verificam e já fazem as correções nos arquivos. Já o `prettier:check` e o `lint` apenas verificam a apontam os erros, que é o que vamos usar no CI.

Vamos também criar um segundo arquivo de configuração de banco, o _config/database.ci.js_, pois a conexão ao banco de testes no ambiente do Travis é diferente de quando executamos os testes localmente.

```js
module.exports = {  
  test: {  
    username: 'postgres',  
    database: 'mymoney_ci_test',  
    host: '127.0.0.1',  
    dialect: 'postgres',  
    logging: false  
  }  
};
```

Veja como fica o _.travis.yml_ no nosso caso:

```yml
language: node_js  
node_js:  
  - "9.8.0"  
cache:  
  directories:  
    - "node_modules"  
services:  
  - postgresql  
before_script:  
  - cp config/database.ci.js config/database.js  
  - psql -c 'create database mymoney_ci_test;' -U postgres  
script:  
  - npm run prettier:check  
  - npm run lint  
  - npm run test
```

Definimos que a linguagem é **Node.js** e a versão que queremos utilizar.

Em `cache` dizemos para ele _cachear_ a pasta _node\_modules_, assim o processo de **install** fica mais rápido.

Em `services` habilitamos o **PostgreSQL**, que vai ser usado na execução dos testes.

Não precisamos definir o passo de **install**, pois como definimos a linguagem Node.js, por padrão o install é `npm install`, que é o que precisamos.

No `before_script` copiamos a configuração de banco e usamos o **psql** para criar o banco de testes.

Por fim, no `script` rodamos a verificação do Prettier, o ESLint e os testes.

### Status da build no GitHub

Sempre que você fizer um _push_ para o GitHub, o Travis irá executar as validações e indicar no _commit_ se passou ou não:

![](/1_lXLRhz005nbQIi4gaHsbfQ.png)

### Selo no README

Você pode, inclusive, colocar um selo como este no seu README, indicando o status da _build_:

![](/1_HzVlEHiTX6tLw2htC9-SGw.png)

Basta ir na sua conta do Travis, clicar no selo ao lado do nome do projeto, escolher o formato **Markdown** e colar o código no seu _README.md_.

![](/1_Sx0-xynx-GL4fVe2fx-w5A.png)

## Resultado final

O código do projeto até este ponto está em: [https://github.com/doug2k1/my-money/tree/v4.2.0](https://github.com/doug2k1/my-money/tree/v4.2.0)

## No próximo capítulo

Na próxima parte vamos começar a botar a mão no **GraphQL** (finalmente) fazendo o lado do servidor, usando [**Apollo Server**](https://www.apollographql.com/docs/apollo-server/).

_Stay tuned!_

## Feedbacks?

E aí, o que está achando até agora? Algo que precisa melhorar?

\[\]’s

## 🔥 [Pacote Fullstack | 4 Cursos Completos](https://www.webdevdrops.com/pacote-full-stack/wdd)

A **Danki Code** está oferecendo uma formação para **desenvolvedor fullstack** bastente completa, englobando frontend, backend, UX/UI, SEO, etc.   
[**Saiba mais...**](https://www.webdevdrops.com/pacote-full-stack/wdd)