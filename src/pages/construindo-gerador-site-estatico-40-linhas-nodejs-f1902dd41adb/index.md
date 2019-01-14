---
title: "Construindo um gerador de site estático em 40 linhas com Node.js"
date: "2017-10-09T21:32:21.864Z"
---
> [Read in English](../build-static-site-generator-nodejs-8969ebe34b22)

Existem excelentes **geradores de sites estáticos**, em diferentes linguagens, e com muitas funcionalidades, mas construir o seu próprio é mais fácil do que você imagina, e podemos aprender algumas coisas novas no processo.

![](/1_qedPrFYGXlsbmjDl7lnVmg.jpeg)

## Por que construir o seu próprio?

Quando estava planejando o meu site pessoal — um site simples, tipo portfólio, com poucas páginas, algumas informações sobre mim, habilidades e projetos — eu decidi que seria estático (é rápido, não precisa configurar um backend e pode ser hospedado em qualquer lugar). Já tive alguma experiência com [**Jekyll**](https://jekyllrb.com/), [**Hugo**](https://gohugo.io/) and [**Hexo**](https://hexo.io/), mas eles tem mais features do que eu realmente precisava, a imaginei que levaria menos tempo criando o meu próprio do que instalando e configurando alguma dessas ferramentas. Fora o aprendizado!

## Os requisitos

Os requisitos que o gerador precisaria atender são:

*   Gerar arquivos HTML a partir de templates [**EJS**](http://ejs.co/)
*   Usar um arquivo de layout, para que todas as páginas tenham o mesmo cabeçalho, menu, rodapé, etc.
*   Permitir _partials_ (blocos de componentes de interface reusáveis).
*   Ler configurações globais do site a partir de um arquivos (título do site, descrição, etc.)
*   Ler dados de arquivos JSON. Por exemplo: lista de projetos, para que eu possa iterar e construir a página “Projetos”

> **Por que templates EJS?**  
> Porque EJS é simples. Não é preciso aprender uma nova sintaxe. É só JavaScript embutido em HTML.

## Estrutura de pastas

```
public/  
src/  
  assets/  
  data/  
  pages/  
  partials/  
  layout.ejs  
site.config.js
```

*   **public:** onde o site gerado será salvo.
*   **src:** arquivos fonte do site.  
    **src/assets:** arquivos de CSS, JS, imagens, etc. Serão copiados sem alteração para a pasta public.  
    **src/data:** dados em JSON que serão usados no site.  
    **src/pages:** arquivos de template que serão compilados em HTML e serão as páginas do site. A mesma estrutura de diretórios aqui será replicada no site final.  
    **src/partials:** contém as _partials_ (templates de blocos reusáveis).  
    **src/layout.ejs:** contém a estrutura comum para todas as páginas, com uma marcação `<%- body %>` onde o conteúdo de cada página será inserido.
*   **site.config.js**: exporta um objeto com as configurações globais do site.

## O gerador

Todo o código do gerador está no arquivo _scripts/build.js_, que pode ser executado com o comando `npm run build`, sempre que quisermos reconstruir o site. Basta adiciona a seguinte entrada no bloco `scripts` do _package.json_:

```json
"build": "node ./scripts/build"
```

Este é o código completo do gerador:   
(Abaixo eu explico cada parte.)

```js
const fse = require('fs-extra')
const path = require('path')
const { promisify } = require('util')
const ejsRenderFile = promisify(require('ejs').renderFile)
const globP = promisify(require('glob'))
const config = require('../site.config')

const srcPath = './src'
const distPath = './public'

// clear destination folder
fse.emptyDirSync(distPath)

// copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}/assets`)

// read page templates
globP('**/*.ejs', { cwd: `${srcPath}/pages` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // create destination directory
      fse.mkdirs(destPath)
        .then(() => {
          // render page
          return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config))
        })
        .then((pageContents) => {
          // render layout with page contents
          return ejsRenderFile(`${srcPath}/layout.ejs`, Object.assign({}, config, { body: pageContents }))
        })
        .then((layoutContent) => {
          // save the html file
          fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)
        })
        .catch((err) => { console.error(err) })
    })
  })
  .catch((err) => { console.error(err) })
```

### Dependências

Para este conjunto básico de funcionalidades, precisamos apenas de três dependências:

*   [**ejs**](http://ejs.co/)  
    Compila nossos templates para HTML.
*   [**fs-extra**](https://www.npmjs.com/package/fs-extra)  
    Adiciona funções extra ao módulo de _file system_ nativo do Node ([**fs**](https://nodejs.org/api/fs.html)) e dá suporte a promises às funções existentes.
*   [**glob**](https://www.npmjs.com/package/glob)  
    Lê uma pasta recursivamente, retornando todos os arquivos que casam com um padrão específico.

### Promisify all the things!

Uma coisa a ser notada no código é que usamos o [_util.promisify_](https://nodejs.org/api/util.html#util_util_promisify_original) do Node para converter funções que usam callback em funções que retornam promise. Isso deixa o código mais curto, limpo e fácil de ler.

```js
const { promisify } = require('util')  
const ejsRenderFile = promisify(require('ejs').renderFile)  
const globP = promisify(require('glob'))
```

### Carregar as configurações

No topo importamos o arquivo de configurações, para disponibilizar estes dados mais tarde para os templates.

```js
const config = require('../site.config')
```

Este arquivo, por sua vez, importa dados adicionais da pasta _data_:

```js
const projects = require('./src/data/projects')

module.exports = {  
  site: {  
    title: 'NanoGen',  
    description: 'Micro Static Site Generator in Node.js',  
    projects  
  }  
}
```

### Limpar a pasta public

Usamos _emptyDirSync_ do **fs-extra** para limpar a pasta public.

```js
fse.emptyDirSync(distPath)
```

### Copiar os assets

Aqui usamos _copy_, também do **fs-extra**, que copia uma pasta com todo seu conteúdo.

```js
fse.copy(`${srcPath}/assets`, `${distPath}/assets`)
```

### Compilar as páginas

Primeiro usamos o **glob** (a versão _promisificada — _existe essa palavra?) para recursivamente varrer a pasta _src/pages_ procurando por arquivos .ejs. Ela retorna um array com o caminho de todos os arquivos encontrados.

```js
globP('**/*.ejs', { cwd: `${srcPath}/pages` })  
  .then((files) => {
```

Para cada template encontrado, usamos [**path**](https://nodejs.org/api/path.html).parse do Node para separar os componentes do arquivo (como caminho, nome e extensão). Então criamos uma pasta de destino daquela página, usando **fs-extra** _mkdirs_.

```js
files.forEach((file) => {  
  const fileData = path.parse(file)  
  const destPath = path.join(distPath, fileData.dir)

// create destination directory
  fse.mkdirs(destPath)
```

Então usamos **EJS** para compilar a página, passando os dados de configuração, para que possam ser acessados no corpo do template. Como estamos usando a versão _promisificada_ do _ejs.renderFile_, podemos retornar aqui a chamada para pegar o resultado no próximo _then_.

```js
.then(() => {  
  // render page  
  return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config))  
})
```

No próximo bloco temos o corpo da página compilado. Agora compilamos o template de layout, passando o conteúdo da página no atributo `body`.

```js
.then((pageContents) => {  
  // render layout with page contents  
  return ejsRenderFile(`${srcPath}/layout.ejs`, Object.assign({}, config, { body: pageContents }))  
})
```

Finalmente pegamos o resultado, que é HTML compilado do layout + a página e salvamos em um arquivo HTML, com o mesmo nome do template original.

```js
.then((layoutContent) => {  
  // save the html file  
  fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)  
})
```

## Servidor de desenvolvimento

Para ficar mais fácil de visualizar o resultado, adicionamos um servidor de desenvolvimento simples, como o módulo [serve](https://www.npmjs.com/package/serve), e adicionamos o seguinte no bloco `scripts` do _package.json_:

```json
"serve": "serve ./public"
```

Então basta rodar `npm run serve` e acessar [http://localhost:5000](http://localhost:5000)

### Resultado

O exemplo completo, até aqui, pode ser encontrado em: [https://github.com/doug2k1/nanogen/tree/v1](https://github.com/doug2k1/nanogen/tree/v1)

## Bonus 1: Markdown e front matter

A maioria dos geradores de site estático permitem escrever conteúdo no formato [Markdown](https://en.wikipedia.org/wiki/Markdown). Eles também permitem adicionar dados adicionais no topo de cada página (conhecido como **_front matter_**) no formato [YAML](http://yaml.org/), por exemplo:

```yml
---  
title: Hello World  
date: 2013/7/13 20:46:25  
---
```

Com algumas alterações podemos adicionar estas mesmas funcionalidades.

### Novas dependências

Precisamos adicionar duas novas dependências:

*   [**marked**](https://www.npmjs.com/package/marked)  
    Compila Markdown para HTML.
*   [**front-matter**](https://www.npmjs.com/package/front-matter)  
    Extrai meta dados (front matter) dos arquivos.

### Incluir novos tipos de arquivos

Mudamos o padrão do **glob** para incluir arquivos com extensão .md. Mantemos o .ejs para permitir páginas mais complexas que não seriam possíveis apenas com Markdown, e também incluímos .html, caso queira incluir alguma página de HTML puro.

```js
globP('**/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` })
```

### Extrair front matter

Para cada arquivo encontrado com essas extensões, precisamos carregar o conteúdo do arquivo para que o **front-matter** consiga extrair os dados no topo.

```js
.then(() => {  
  // read page file  
  return fse.readFile(`${srcPath}/pages/${file}`, 'utf-8')  
})
```

Passamos o conteúdo do arquivo para o **front-matter**. Ele retorna um objeto com um campo `attributes` contendo os meta dados encontrados, e um campo `body` contendo o restante do conteúdo do arquivo. Nós então incrementamos com estes dados a configuração que será passada para cada template.

```js
.then((data) => {  
  // extract front matter  
  const pageData = frontMatter(data)  
  const templateConfig = Object.assign({}, config, { page: pageData.attributes })
```

### Compilar arquivos para HTML

Agora compilamos o conteúdo de cada página para HTML. Dependendo da extensão do arquivo nós usamos o **marked** (para .md), **EJS** (para .ejs) ou não fazemos nada se já for .html.

```js
let pageContent

switch (fileData.ext) {  
  case '.md':  
    pageContent = marked(pageData.body)  
    break  
  case '.ejs':  
    pageContent = ejs.render(pageData.body, templateConfig)  
    break  
  default:  
    pageContent = pageData.body  
}
```

Finalmente, compilamos o layout, como antes, injetando o HTML da página.

Uma coisa legal que dá pra fazer com front matter é ter títulos individuais para cada página:

```yml
---  
title: Another Page  
---
```

E no layout, onde vai o título, exibir esta informação, assim:

```html
<title><%= page.title ? `${page.title} | ` : '' %><%= site.title %></title>
```

Cada página vai ter seu próprio título na tag `<title>`.

## Bonus 2: Múltiplos layouts

Outra funcionalidade interessante é a possibilidade de usar um layout diferente em páginas específicas. Como agora cada página pode ter uma configuração no front matter, podemos usá-la para setar um layout diferente:

```yml
---  
layout: minimal  
---
```

### Separar os arquivos de layout

Para organizar os diferentes layouts, coloquei na pasta _src/layouts_:

```
src/layouts/  
  default.ejs  
  mininal.ejs
```

### Renderizar o layout correto

Se a configuração `layout` estiver presente no front matter, compilamos o arquivo de layout com o mesmo nome. Se não estiver definido, usamos o _default_.

```js
const layout = pageData.attributes.layout || 'default'

return ejsRenderFile(`${srcPath}/layouts/${layout}.ejs`, 
  Object.assign({}, templateConfig, { body: pageContent })
)
```

### Resultado

O código completo, com as funcionalidades extra pode ser encontrado aqui: [https://github.com/doug2k1/nanogen/tree/legacy](https://github.com/doug2k1/nanogen/tree/legacy)

**_Editado:_** _depois de um tempo eu decidi transformar o projeto em um módulo de linha de comando para ser mais fácil de usar, que está na branch_ `master` _do repositório. O código original criado neste post está na branch_ `legacy` _(link acima)._

Mesmo com estas funcionalidade a mais, o arquivo ficou próximo de 60 linhas. 😉

## Próximos passos

Se você quer ir além, algumas funcionalidades que podem ser implementadas sem grandes dificuldades são:

*   **Servidor de desenvolvimento com reload automático**  
    Você pode usar módulos como [**live-server**](https://www.npmjs.com/package/live-server) (já vem com reload automático) e [**chokidar**](https://www.npmjs.com/package/chokidar) (dispara um evento quando um arquivo é modificado).
*   **Deploy automático**  
    Adicionar scripts para fazer deploy do site para serviços de hospedagem como [**GitHub Pages**](https://pages.github.com/), ou para copiar os arquivos para seu servidor via SSH (com comandos como [scp](http://www.hypexr.org/linux_scp_help.php) ou [rsync](https://rsync.samba.org/))
*   **Suporte para outros formatos de CSS/JS**  
    Adicionar algum pré-processamento nos seus assets (SASS para CSS, ES6 para ES5, etc) antes de copiá-los para a pasta de destino.
*   **Melhor saída no console**  
    Adicionar alguns `console.log` para indicar em qual estapa do processo está, ou para indicar erros. Você pode usar algo como [**chalk**](https://www.npmjs.com/package/chalk)  para deixar essas mensagens mais bonitas.

Feedback? Sugestões? Comente ou entre em contato!