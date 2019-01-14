---
title: "Webpack sem Medo — Parte 2: Loaders"
date: "2017-10-25T01:48:31.679Z"
---
> Atualizado em **06/10/2018** para o **webpack 4** e **Babel 7**!

> Anteriormente em **Webpack sem Medo**…  
> Na [parte 1](../webpack-sem-medo-introducao-af889eb659e7) fizemos uma introdução, explicando alguns conceitos e mostramos o exemplo mais básico de uma configuração de webpack.

Nesta segunda parte vamos falar sobre o terceiro _core concept_ do webpack: **loaders**, e como podemos carregar diferentes tipos de arquivos. Este artigo vai ser menos teoria e mais prática.

Mapa da série:

*   [1: Introdução](../webpack-sem-medo-introducao-af889eb659e7)
*   **2: Loaders** (você está aqui)
*   [3: Plugins e Dev Server](../webpack-sem-medo-parte-3-plugins-e-dev-server-86b6e003657c)

## Loaders

O webpack, por padrão, entende apenas JS. Se você fizer, por exemplo, `import './styles.css'` e tentar rodar o webpack, ele vai reclamar:

```
ERROR in ./styles.css  
You may need an appropriate loader to handle this file type.
```

**Loaders** são módulos que são instalados separadamente e fazem a transformação do arquivo original para código JS. A forma como esta transformação é feita depende de cada loader. Loaders também podem ser usados para converter JS de uma versão para outra (por exemplo, ES6 para ES5).

![](/1_jnnjkQxPySI5IUKpc5B19Q.png)

Conceitos fundamentais do webpack (veja onde os loaders entram)

Com o conteúdo transformado em algo que o webpack compreende, ele consegue adicionar estes arquivos ao **grafo de dependências**.

Para dizer ao webpack qual loader ele deve usar em quais arquivos, adicionamos uma nova seção **module** no arquivo de configuração, que possui uma ou mais regras (**rules**).

```js
module: {  
  rules: [  
    // ...regras aqui  
  ]  
}
```

Cada regra vai ter um teste (**test**) para filtrar quais arquivos serão afetados por ela (normalmente pela pela extensão do arquivo, usando [expressão regular](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)) e qual loader usar (**use**) para os arquivos que passarem pelo filtro.

```js
module: {  
  rules: [  
    {      
      test: /\.css$/,  
      use: 'css-loader'  
    }  
  ]  
}
```

No exemplo acima estamos dizendo que todo arquivo que termina com **.css** deve passar pelo **css-loader**.

> **Explicando a expressão regular acima:**  
> as barras **/** … **/** indicam que o que está entre elas é uma expressão regular  
> **\\.** indica um ponto (é preciso esta barra invertida, pois sem ela o ponto tem outro significado em expressões regulares)  
> **css** significa o texto css mesmo  
> **$** significa final da string, ou seja, o valor .css deve estar no final do nome do arquivo

Vamos ver agora alguns exemplos de loaders, pra ficar mais claro.

---

## Exemplo 2: ES6+ (babel-loader)

_OBS: Este é o exemplo 2 considerando que o exemplo 1 está na primeira parte da série._

Vamos incrementar o primeiro exemplo para usar _features_ das novas versões do JS (ES6 ou ES2015 e superiores) e usar o [**Babel**](https://babeljs.io/) para transpilar\* tudo para ES5 antes de passar para o webpack.

> **Transpilar**  
> Transformar um código-fonte em outro código-fonte, de outra versão ou formato. Este termo é muito usado neste contexto de Babel.

O código completo deste exemplo pode ser encontrado em: [https://github.com/doug2k1/webpack-scenarios/tree/master/2-es2015](https://github.com/doug2k1/webpack-scenarios/tree/master/2-es2015)

> **Babel**  
> [Babel](https://babeljs.io/) é um conjunto de ferramentas (que incluem loaders de webpack, ferramentas de linha de comando, etc) para transformar códigos de versões mais avançadas de JS para ES5, que é a versão suportada por todos os navegadores.

Para validar a transpilação, vamos adicionar duas features de ES6 na aplicação: declarar variável com **const** e usar **\`** (backticks) para interpolação de string:

```js
const message = 'is great'  
document.querySelector('#box').innerText = cow.say(`Webpack with Babel ${message}!`)
```

### Instalação

Precisamos instalar o core do Babel ([@babel/core](https://www.npmjs.com/package/@babel/core)), que é usado pelo loader, o loader em si ([babel-loader](https://webpack.js.org/loaders/babel-loader/)) e um preset ([@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)):

```bash
npm i -D @babel/core @babel/preset-env babel-loader
```

> **Presets de Babel**  
> O Babel sozinho não faz nenhuma transformação no JS. As transformações são feitas por **plugins**, e os **presets** são conjuntos de plugins relacionados. O babel-preset-env, por exemplo, inclui todos os plugins necessários para transformar funcionalidade de todas as versões pós ES5 (ES6, ES7, ES8) em código ES5.

### Configuração

Agora precisamos incrementar o _webpack.config.js_ para adicionar a regra do nosso loader:

```js{11-18}
const path = require('path')  
  
module.exports = {  
  entry: './src/index.js',  
  
  output: {  
    filename: 'main.js',  
    path: path.resolve('dist')  
  },  
  
 module: {  
    rules: [  
      {  
        test: /\.js$/,  
        use: 'babel-loader'  
      }  
    ]  
  }  
}
```

Todos os arquivos com extensão **.js** irão passar pelo **babel-loader**. Mesmo que o arquivo não possua nenhuma feature de ES6+, não tem problema, pois o Babel não vai fazer nenhuma alteração nesses casos.

Nós ainda precisamos dizer ao Babel para usar o preset **@babel/preset-env** (só instalar não “ativa” o preset). Para isso basta criar um arquivo _.babelrc_ na raiz da aplicação com o conteúdo:

```json
{  
  "presets": ["@babel/env"]  
}
```

### Gerando o bundle

Com essas alterações, se rodarmos `npm run build` agora, o _main.js_ vai ser gerado como antes, mas dentro dele você pode ver este código:

```js
var message = 'is great';  
document.querySelector('#box').innerText = _cow2.default.say('Webpack with Babel ' + message + '!');
```

Nosso **const** foi transformado em **var** e a string com _backticks_ foi transformada em string com **aspas simples** e concatenação usando **+**, ou seja, código ES6 foi transformado em código ES5.

![](/1_s3mlfcjc0qZZTHq2s4jMbw.png)

A vaquinha agora com ES6!

### Melhorando a performance

Duas dicas para melhorar a performance com babel-loader:

**Excluir dependências externas**: adicione a opção **exclude** na configuração da regra para excluir a pasta *node_modules*, assim o Babel não vai analisar o código das dependências externas:

```js{3}
{  
  test: /\.js$/,  
  exclude: /node_modules/,    
  use: 'babel-loader'  
}
```

**Cachear arquivos já transpilados**: ative a opção **cacheDirectory** nas opções do babel-loader, assim sempre que rodar o build ele só vai analisar os arquivos que foram modificados desde a última execução:

```js{6-8}
{  
  test: /\.js$/,  
  exclude: /node_modules/,  
  use: {  
    loader: 'babel-loader',  
    options: {  
      cacheDirectory: true  
    }  
  }  
}
```

Neste pequeno exemplo, o tempo de build caiu de 900ms para 400ms com essas duas alterações. Nada mal! 🚀

## Exemplo 3: CSS (css-loader, style-loader)

Vamos deixar as coisas mais interessantes, adicionando arquivos que não são JS.

O código completo deste exemplo pode ser encontrado em: [https://github.com/doug2k1/webpack-scenarios/tree/master/3-css-loader](https://github.com/doug2k1/webpack-scenarios/tree/master/3-css-loader)

Evoluindo ainda os exemplos anteriores, vamos adicionar um arquivo CSS:

```
|-- src  
  |-- css 
    |-- main.css
```

Com um conteúdo bem simples:

```css
body {  
  padding: 20px;  
}  
pre {  
  color: #00f;  
}
```

### Instalação

Vamos usar dois novos loaders para CSS: [css-loader](https://webpack.js.org/loaders/css-loader) e [style-loader](https://webpack.js.org/loaders/style-loader):

```bash
npm i -D css-loader style-loader
```

Aqui vamos ver um exemplo de **encadeamento de loaders**. O primeiro, **css-loader**, lê o conteúdo do CSS guarda em uma variável dentro do JS (como string). Isso é o suficiente para o webpack aceitar um import de CSS, mas ainda não vai adicionar os estilos na página.

Para completar a tarefa usamos um segundo loader, **style-loader**, que pega a saída do primeiro e cria um script que injeta o CSS dinamicamente na página, usando tags `<style>` no header.

A configuração fica assim:

```js
{  
  test: /\.css$/,  
  use: ['style-loader', 'css-loader']  
}
```

Quando encadeamos mais de um loader na mesma regra, o webpack os executa de **trás pra frente**, ou seja: **css-loader** ➡️ **style-loader**

### Importando e gerando o bundle

Vamos importar o CSS a partir do nosso _index.js_:

```js
import './css/main.css'
```

**OBS.:** Não precisamos salvar o resultado do import em uma variável. Não vamos usá-lo no JS, a intenção aqui é apenas adicionar o CSS ao grafo de dependências.

Ao rodar `npm run build` e abrir a página você vai ver:

![](/1_0Ndutxfqo_zOvr_sOtL0MA.png)

Vaquinha com CSS aplicado!

Se observar o código-fonte da página você pode ver o CSS injetado no head.

![](/1_Wu9RvHhjjAu7ucDMcL8EnQ.png)

Estilo injetado pelo style-loader

### Salvar o CSS em um arquivo separado?

Sabemos que o ideal é ter JS e CSS em arquivos separados, para fazer o carregamento em paralelo e utilizar melhor o cache do navegador. No próximo artigo da série, quando formos falar de **plugins**, vamos evoluir este exemplo para extrair o CSS para seu próprio arquivo. 😉

## Exemplo 4: Sass (sass-loader)

Evoluindo o uso de CSS, você também pode usar um pré-processador como [**Sass**](http://sass-lang.com/), [**Less**](http://lesscss.org/)  ou [**Stylus**](http://stylus-lang.com/)  e deixar o webpack fazer a compilação pra você. Neste exemplo vamos utilizar Sass.

O código completo deste exemplo pode ser encontrado em: [https://github.com/doug2k1/webpack-scenarios/tree/master/4-sass-loader](https://github.com/doug2k1/webpack-scenarios/tree/master/4-sass-loader)

Vamos adicionar alguns arquivos Sass no projeto:

```
|-- src  
  |-- sass   
    |-- _vars.scss 
    |-- main.scss
```

\_vars.scss:

```scss
$cow-color: #f0c;
```

main.scss:

```scss
@import 'vars';  
  
pre {  
  color: $cow-color;  
}
```

Veja que estamos usando a funcionalidade de importar um arquivo Sass a partir de outro — `@import`. Isso funciona perfeitamente com webpack, que vai incluir todos os arquivos importados no pacote.

> **Alerta**  
> Diferente do JS, que o webpack resolve os imports e evita duplicação, os imports do Sass não tem essa habilidade. Se você importar o mesmo arquivo em dois ou mais lugares, o código vai aparecer repetido no CSS final. A exceção são arquivos que não geram CSS, como arquivos que só definem variáveis e mixins. Estes podem ser importados à vontade.

No nosso _index.js_ importamos o _main.scss_:

```js
import './sass/main.scss'
```

### Instalação

Precisamos instalar o [sass-loader](https://webpack.js.org/loaders/sass-loader/) e o [node-sass](https://github.com/sass/node-sass) (que é o core que faz a compilação de fato).

```bash
npm i -D sass-loader node-sass
```

### Configuração

Adicionar regra no _webpack.config.js_:

```js
{  
  test: /\.scss$/,  
  use: ['style-loader', 'css-loader', 'sass-loader']  
}
```

Veja que é bem parecida com a regra de CSS, mudando apenas a extensão (.scss) e adicionando o sass-loader para ser executado antes do css-loader, para compilar de Sass para CSS.

Feito isso basta rodar `npm run build` e ver o resultado:

![](/1_fQvwUg_xYlJMppTNdPlVXQ.png)

Vaquinha estilosa com SASS

Se você usa Less ou Stylus, pode usar o [less-loader](https://webpack.js.org/loaders/less-loader) ou [stylus-loader](https://github.com/shama/stylus-loader), respectivamente.

## Exemplo 5: Imagens e outros arquivos (file-loader)

E pra finalizar os exemplos com loaders, vamos ver um genérico, que é o [**file-loader**](https://webpack.js.org/loaders/file-loader/). Ele simplesmente copia o arquivo para a pasta de destino, e pode ser usado com imagens, fontes, ou qualquer outro arquivo que não requer nenhum tratamento especial.

O código completo deste exemplo pode ser encontrado em: [https://github.com/doug2k1/webpack-scenarios/tree/master/5-file-loader](https://github.com/doug2k1/webpack-scenarios/tree/master/5-file-loader)

Vamos colocar duas imagens nos fontes da aplicação:

```
|-- src  
 |-- img  
    |-- grass-bg.jpg      
    |-- icon.png
```

### Instalação

```bash
npm i -D file-loader
```

### Configuração

```js
{  
  test: /\.(png|jpg)$/,  
  use: 'file-loader'  
}
```

Esta regra casa com arquivos com extensão **.png** ou **.jpg**.

### Importando as imagens

Vamos ver duas formas de importar as imagens que podem ser usadas com o webpack.

**Importando no JS:**

```js
import icon from './img/icon.png'

document.querySelector('#icon').innerHTML = `<img src="${icon}" />`
```

Veja que o `import` retorna o caminho para o arquivo, que você pode injetar em uma tag `<img>`, por exemplo.

**Importando no CSS/Sass:**

```css
pre {  
  background: url('../img/grass-bg.jpg') no-repeat;  
}
```

O webpack vai interpretar esse `url(...)` como um import, e o file-loader vai transformar o caminho do arquivo para o caminho final que estiver na pasta de destino.

Se você rodar `npm run build` e abrir o HTML, vai ver o resultado:

![](/1_-mm6Eq-Y_IOQhO93nnLBfw.png)

Webpack com imagens

As imagens foram copiadas para a pasta **dist**, e o caminho tanto no CSS quando na tag img foram ajustados para o caminho final.

### Configurando nome e pasta de destino

Se você olhar as imagens na pasta de destino, vai ver uns nomes estranhos:

```
dist  
  |-- aff3beaede7942d398640558584c32c3.png  
  |-- dceed45846c62aa68714968afa62c56c.jpg
```

Por padrão o file-loader usa como nome do arquivo um hash [MD5](https://pt.wikipedia.org/wiki/MD5) do conteúdo do mesmo. Isso é bom, pois se a imagem mudar, esse hash muda, e evita do navegador cachear uma imagem velha, mesmo quando houve alteração na imagem.

Mas você pode controlar isso nas opções do loader, por exemplo:

```js{5-8}
{  
  test: /\.(png|jpg)$/,  
  use: {  
    loader: 'file-loader',  
    options: {  
      name: '[name].[ext]',  
      outputPath: 'images/'  
    }  
  }  
}
```

A opção **name** é o nome final do arquivo. Você pode usar _placeholders_ como `[name]` (nome original) e `[ext]` (extensão original). No exemplo acima mantemos o nome e extensão originais.

A opção **outputPath** é a pasta onde os arquivos serão salvos no diretório de destino.

---

## O que vem pela frente

No próximo artigo vamos falar sobre **plugins**, que expandem mais ainda as funcionalidades do webpack.

## Feedbacks?

Qualquer crítica ou sugestão, comente ou entre em contato.