---
title: "Webpack sem Medo — Parte 3: Plugins e Dev Server"
date: "2017-11-15T16:17:19.087Z"
---
> Atualizado em **20/10/2018** para o **webpack 4**!

> Anteriormente em **Webpack sem Medo**…  
> Na [parte 1](../webpack-sem-medo-introducao-af889eb659e7) fizemos uma introdução, explicando alguns conceitos e mostramos o exemplo mais básico de uma configuração de webpack. Na [parte 2](../webpack-sem-medo-parte-2-loaders-1d1239df3945) falamos de **loaders**, para manipular diferentes tipos de arquivos.

Nesta terceira parte vamos falar sobre o quarto _core concept_ do webpack: **plugins**, que adicionam variadas funcionalidades ao processo de empacotamento. No final vamos falar também sobre **webpack-dev-server**, uma ferramenta muito útil durante o desenvolvimento com webpack.

Mapa da série:

*   [1: Introdução](../webpack-sem-medo-introducao-af889eb659e7)
*   [2: Loaders](../webpack-sem-medo-parte-2-loaders-1d1239df3945)
*   **3: Plugins e Dev Server** (você está aqui)

![](/1_9t8V1Gq2ESrH7yafGSycGg.png)

## Plugins

O webpack expõe _hooks_, pontos específicos do processo de empacotamento, onde plugins podem entrar e alterar o processo ou adicionar novas tarefas.

Alguns plugins já vem com o webpack, outros são instalados como módulos externos. (Veremos exemplos dos dois casos.)

No seu _webpack.config.js_ um plugin normalmente aparece em duas partes:

Se for um plugin externo, é preciso importá-lo no topo do arquivo:

```js{1}
const MeuPlugin = require('meu-plugin')

module.exports = { ... }
```

E na seção _plugins_, instanciá-lo usando `new`:

```js{8}
const MeuPlugin = require('meu-plugin')

module.exports = {  
  entry: ...,  
  output: ...,  
  module: ...,

  plugins: [new MeuPlugin()]  
}
```

_plugins_ é um array, pois você pode adicionar mais de um.

Normalmente o construtor recebe algumas opções, como veremos nos exemplos.

---

## Exemplo 6: Provide plugin

Neste exemplo vamos usar um plugin simples, mas que pode ser bastante útil, o [**ProvidePlugin**](https://webpack.js.org/plugins/provide-plugin/).

Este plugin já vem com o webpack e o que ele faz é disponibilizar automaticamente algum módulo, de forma que você possa usá-lo em qualquer arquivo sem precisar fazer `import` ou `require`. Pode ser útil quando você tem um módulo que usa em muitos lugares e não quer fazer `import` todas as vezes.

O código completo deste exemplo pode ser encontrado em: [https://github.com/doug2k1/webpack-scenarios/tree/master/6-provide-plugin](https://github.com/doug2k1/webpack-scenarios/tree/master/6-provide-plugin)

Neste exemplo vamos alterar o exemplo 1, da [primeira parte](../webpack-sem-medo-introducao-af889eb659e7) da série. Nele a gente usa uma dependência externa, o módulo [cowsay-browser](https://www.npmjs.com/package/cowsay-browser) (para desenhar a vaquinha _mucho loca_) fazendo `import` no arquivo `src/cow.js` desta forma:

```js
import cowsay from 'cowsay-browser'
```

Com a ajuda do Provide Plugin, queremos tirar esse `import` e continuar usando a variável `cowsay`.

### Configuração

Como ele faz parte do webpack, não precisamos instalá-lo. Vamos apenas importar o próprio webpack no nosso arquivo de configuração para ter acesso ao plugin:

```js{2}
const  path = require('path')  
const webpack = require('webpack')  
  
module.exports = {  
  ...  
}
```

E lá no array de plugins, vamos instanciá-lo, passando algumas opções:

```js{9-13}
const  path = require('path')  
const  webpack = require('webpack')  
  
module.exports = {  
  entry: ...,  
  
  output: ...,  
  
  plugins: [  
    new webpack.ProvidePlugin({  
      cowsay: 'cowsay-browser'  
    })  
  ]  
}
```

Ele espera um objeto, onde a chave é o nome da variável que será disponibilizada (_cowsay_, neste caso) e o valor é o nome do módulo (_cowsay-browser_).

Feito isso podemos remover o `import` do arquivo `src/cow.js` e rodar `npm run build`. Ao acessar a página a vaquinha continua lá:

![](/1_W9DqlBUCYooEuaH-aX-i8A.png)

## Exemplo 7: Extrair CSS

Lembra lá na [parte 2](../webpack-sem-medo-parte-2-loaders-1d1239df3945), quando fizemos os exemplos para carregar CSS e Sass, e eu falei que em outro momento iríamos separar o CSS em outro arquivo? (Até então ele ficava “embutido” no JS)

Pois é, este momento chegou. Para isso vamos usar o [**mini-css-extract-plugin**](https://github.com/webpack-contrib/mini-css-extract-plugin). Este plugin extrai o CSS que é importado no JS para seus próprios arquivos.

> **Nota:** Este plugin é específico para webpack 4. Se você usa uma versão anterior, deve usar o [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin).

O código completo deste exemplo pode ser encontrado em: [https://github.com/doug2k1/webpack-scenarios/tree/master/7-extract-css](https://github.com/doug2k1/webpack-scenarios/tree/master/7-extract-css)

### Instalação

```bash
npm i -D mini-css-extract-plugin
```

### Configuração

No nosso _webpack.config.js_ vamos importar o plugin no topo e instanciá-lo no array de plugins:

```js{2,11-15}
const  path = require('path')  
const MiniCssExtractPlugin = require("mini-css-extract-plugin")  
  
module.exports = {  
  entry: ...,  
  
  output: ...,  
  
  module: ...,  
  
  plugins: [  
    new MiniCssExtractPlugin({  
      filename: "css/[name].css"  
    })   
  ]  
}
```

O parâmetro `filename` diz o local onde será salvo o CSS. O valor `[name]` indica para usar o mesmo nome do arquivo original. Este caminho é relativo ao local configurado na seção `output`. Neste exemplo, como o output está na pasta _dist_, o CSS resultante ficará em _dist/css/styles.css_.

Por fim precisamos adicionar mais um loader na configuração de regras para arquivos ._scss_. O plugin vem com um loader em MiniCssExtractPlugin.loader:

```js{6}
module: {  
  rules: [  
    {  
      test: /\.scss$/,  
      use: [  
        { loader: MiniCssExtractPlugin.loader },  
        "css-loader",  
        "sass-loader"  
      ]  
    }  
  ]  
}
```

Neste caso colocamos o loader como primeiro da lista, ou seja, para ser executado por último.

Com estas alterações, ao executar `npm run build`, todo scss que for importado nos nossos módulos, passará por este processo e será salvo no arquivo _dist/css/main.css_, e não mais no _bundle.js_.

Por isso, é preciso alterar o _index.html_, para linkar este CSS:

```html
<link rel="stylesheet" href="dist/css/main.css">
```

E aí podemos ver o resultado:

![](/1_hQlkQxno7FwLlI9OeiEuvQ.png)

---

## Webpack dev server

Eu não poderia fechar esta série sem falar do [**webpack-dev-server**](https://webpack.js.org/configuration/dev-server/), uma ferramenta essencial no workflow de desenvolvimento com webpack. Ele não é um plugin, mas uma ferramenta externa que se integra ao webpack.

Vimos na [primeira parte](../webpack-sem-medo-introducao-af889eb659e7) que podemos usar o modo _watch_ (`webpack -w`) para reconstruir o _bundle_ a cada modificação de arquivo. O webpack-dev-server também faz isso, mas um pouco mais:

*   A cada alteração de arquivo ele também atualiza a página automaticamente.
*   Ele roda a aplicação em um pequeno servidor, rodando em localhost, o que evita problemas caso precise fazer requisições Ajax.
*   Possui várias opções para configurar este pequeno servidor, caso haja necessidade (para o nosso caso, o funcionamento padrão já atende).

Vamos incluí-lo neste último exemplo (a versão que está no GitHub já está com o webpack-dev-server).

### Instalação

```bash
npm i -D webpack-dev-server
```

### Execução

Para facilitar a execução, vamos adicionar mais um script no _package.json_:

```json{2}
"scripts": {  
  "start": "webpack-dev-server",
  "build": "webpack -p"  
},
```

Antes de rodar o script, precisamos alterar o _index.html_, removendo o _dist_ do caminho para os arquivos JS e CSS. Isso é preciso pois o webpack-dev-server pega o conteúdo da pasta configurada no _output_ (_dist_, no nosso caso) e os serve como se estivessem na pasta raiz da aplicação, junto com o _index.html_.

```html
<head>  
    ...  
    <link rel="stylesheet" href="css/styles.css">  
</head>  
<body>  
    ...  
    <script src="bundle.js"></script>  
</body>  
</html>
```

Com isso, basta rodar `npm start` e acessar o endereço que ele mostra no terminal (por padrão é **http://localhost:8080**). Agora basta manter esta página aberta e ir alterando os arquivos. O webpack + webpack-dev-server irão reconstruir o bundle e atualizar a página automaticamente.

## Webpack Config Generator

Para fechar, deixo aqui uma ferramentinha que eu fiz, um gerador de configuração de webpack:

[https://doug2k1.github.io/webpack-generator/](https://doug2k1.github.io/webpack-generator/)

---

## Conclusão

É isso aí, pessoal! Espero que esta série tenha ajudado a desmistificar um pouco essa ferramenta importante e vocês se sintam mais seguros de usar, entendendo o que está acontecendo.

Feedback, críticas, dúvidas? Comentem aqui, ou me pinguem la no [Twitter @doug2k1](https://twitter.com/doug2k1)!

\[\]’s