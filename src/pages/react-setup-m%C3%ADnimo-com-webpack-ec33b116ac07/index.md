---
title: "React — Setup mínimo com Webpack"
date: "2017-08-28T15:02:54.471Z"
---
Neste post vou mostrar um setup mínimo de Webpack para começar a trabalhar com React.

![](./1_M4ahYjPeHM2cpkjGwkeGyg.jpeg)

**tl;dr  
**O setup final, com um componente de exemplo, pode ser encontrado aqui: [https://github.com/doug2k1/react-minimal-setup](https://github.com/doug2k1/react-minimal-setup)

### E o create-react-app?

[create-react-app](https://github.com/facebookincubator/create-react-app) certamente é a forma mais fácil de começar a desenvolver com React, mas atrás daqueles scripts amigáveis existe um setup bem complexo, com várias dependências e configurações. Cedo ou tarde pode ser que você tenha que ejetar dele, customizar ou construir seu próprio setup. Assim, é importante entender o que cada dependência e opção de configuração faz. E, pra mim, a melhor forma de entender é com pequenos passos. Vamos dar o primeiro aqui.

**OBS:** Estou assumindo que você já tem Node.js e NPM ou Yarn instalado.

## Dependências

As dependências do nossa aplicação são separadas em dois grupos no arquivo _package.json_: **dependencies**, são dependências necessárias para a execução pelo usuário final, e **devDependencies**, que são necessárias apenas para o desenvolvimento.

Antes de adicionar as dependências, precisamos inicializar o arquivo _package.json_ rodando: `npm init -y`.

As únicas dependências (não dev) que precisamos são:

*   **react**: obviamente ;-)
*   **react-dom**: responsável por renderizar nossos componentes na página

Elas devem ser instaladas com a flag `--save` ou `-S` :

`npm i -S react react-dom`

E as dependências de dev:

*   **webpack**: vai empacotar nosso JS (e possivelmente outros tipos de arquivos), incluíndo código da aplicação, dependências e tudo necessário para ser executada
*   **babel-core**: core do Babel, que vai transformar nosso código com JSX e funcionalidades do ES2015 em sintaxe ES5, que funciona em praticamente qualquer navegador
*   **babel-loader**: loader que conecta o Babel ao Webpack (faz as transformações antes de passar o código para o Webpack empacotar)
*   **babel-preset-react**: plugin do Babel para transformar JSX
*   **babel-preset-es2015**: plugin do Babel para transformar sintaxe ES2015

Estas são instaladas com `--save-dev` ou `-D`:

`npm i -D webpack babel-core babel-loader babel-preset-react babel-preset-es2015`

### Sobre o ES2015 (ES6)

Teoricamente poderíamos economizar uma dependência e não usar ES2015, mas para criar componentes React sem ele precisaríamos incluir outra dependência: [create-react-class](https://facebook.github.io/react/docs/react-without-es6.html). Estaríamos trocando uma dependência por outra e perdendo as maravilhas do ES2015. Não vale a pena, a não ser que tenha uma razão bem específica para fazer isso.

## Configuração

### Webpack

Nossa config de Webpack (_webpack.config.js_) é simples assim:

Ela tem um _entrypoint_ (ponto de partida da execução da nossa aplicação), um _output_ (onde será salvo o JS empacotado, que será executado no navegador) e um _loader_.

Nosso arquivo de entrada usa react-dom para renderizar o componente _App_ no corpo da página:

import React from 'react'  
import ReactDOM from 'react-dom'  
import App from './App'

ReactDOM.render(<App />, document.getElementById('app'))

### Babel

Os loaders do Babel vão ler os arquivos JS e converter os códigos JSX e ES2015 para ES5. Precisamos habilitar estas duas transformações no arquivo de configuração do Babel (_.babelrc_):

{  
  "presets": \[ "es2015", "react" \]  
}