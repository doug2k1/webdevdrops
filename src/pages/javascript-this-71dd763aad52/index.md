---
title: "4 Regras para Entender o ‘this’ no JavaScript"
date: "2017-09-06T21:46:58.001Z"
---
Um dos aspectos mais importantes da linguagem JavaScript, e um dos mais incompreendidos, é a palavra-chave `this`. Neste post vou mostrar que `this` não é nenhum bicho de sete cabeças, e o valor dele é definido por 4 regras.

![](/1_hirx3C42Y7PUjMtqmGQBSQ.jpeg)

## WFT is ‘this’?

`this` aponta para o contexto onde uma função está sendo executada. Seu valor dentro de uma função depende de como a função foi invocada. Em uma mesma função, `this` pode ter diferentes valores, em diferentes momentos, dependendo da invocação.

Vamos ver as regras que determinam esse contexto.

## 1) Método de um objeto

> Regra 1: Se a função é chamada como método de um objeto — isto é, chamada com notação de ponto — o valor de ‘this’ dentro da função é o que estiver antes do ponto.

Esta é a regra mais simples de entender e, _para a noooossa alegria_, é a que governa a maioria dos casos onde aparece o `this`. Veja o exemplo:

```js

const player = {
  name: 'Cloud',
  sayName () {
    // Que valor 'this' tem aqui?
    // Temos que olhar o momento que a função é chamada.
    console.log(this.name)
  }
}

// Dentro da função 'sayName' o 'this' é o que está antes do ponto.
// Neste chamada será o 'player'.
player.sayName() // Cloud
```

## 2) bind, apply e call

> Regra 2: Usando bind, apply e call, o valor de ‘this’ dentro da função é explicitamente setado no primeiro argumento.

Funções em JavaScript são tratadas como objeto (ô, dó), isto é, podem ser passadas como parâmetro para outra função, ser atribuídas a variáveis e possuir seus próprios atributos e métodos. Por isso é dito que em JS, funções são _first-class citizens_ — cidadãos de primeira classe (sim, este é o termo).

Dentre os métodos que qualquer função possui, três deles permitem manipular o `this` e burlar a regra 1, que são o **bind**, **apply** e **call**.

**bind**: cria uma nova função fixando o valor do `this`, independente de como a função é invocada.

```js

const player = {
  name: 'Cloud'
}

const enemy = {
  name: 'Sephirot'
}

// Função declarada global.
// Se chamar direto, o 'this' seria 'global' ou 'window'.
const sayName = function () {
  console.log(this.name)
}

// Usando 'bind' para criar novas funções que fazem a mesma coisa
// da função 'sayName', mas definindo o 'this' manualmente.
const sayPlayerName = sayName.bind(player)
const sayEnemyName = sayName.bind(enemy)

sayPlayerName() // Cloud
sayEnemyName() // Sephirot
```

**call, apply**: invoca a função, setando o `this` como primeiro argumento, e repassando os demais para a função invocada. A diferente entre as duas formas é que no **call** os demais argumentos são passados como argumentos separados, e no **apply** eles são passados como um _array_ (fica mais claro no exemplo abaixo).

```js

const player = {
  name: 'Cloud',
  hp: 100,
  mp: 0,
  printStatus () {
    console.log(`${this.name} tem ${this.hp} de HP e ${this.mp} de MP.`)
  }
}

// Função usa 'this', mas vamos setá-lo no momento da chamada.
const addHPMPToPlayer = function (hp, mp) {
  this.hp += hp
  this.mp += mp
  this.printStatus()
}

player.printStatus() // Cloud tem 100 de HP e 0 de MP.
// Setando o 'this' manualmente usando 'call'
addHPMPToPlayer.call(player, 50, 20) // Cloud tem 150 de HP e 20 de MP.
// Setando o 'this' manualmente usando 'apply'
// (a única diferença é a forma como passamos os demais argumentos)
addHPMPToPlayer.apply(player, [50, 20]) // Cloud tem 200 de HP e 40 de MP.
```

## 3) new

> Regra 3: Se a função é chamada com ‘new’, o valor de ‘this’ é o novo objeto que está sendo criado.

Quando chamamos uma função usando a palavra-chave `new`, internamente um novo contexto é criado (basicamente um objeto vazio) e atribuído ao `this`. Ao final da invocação o `this` é retornado automaticamente.

```js

// As linhas comentadas mostram o que o 'new' faz pra gente
const Player = function (name) {
  // const this = {}
  this.name = name
  this.hp = 1000
  this.mp = 0
  // return this
}

// Função chamada com 'new', portanto o 'this' será
// um objeto novo.
const cloud = new Player('Cloud')
console.log(cloud.name, cloud.hp, cloud.mp) // Cloud 1000 0
```

Usando `class` o construtor (método `constructor`) é invocado e o `new` faz a mesma coisa com o `this`.

```js

// Usando 'class' o 'new' chama o construtor e faz a mesma coisa com o 'this'
class Player {
  constructor (name) {
    // const this = {}
    this.name = name
    this.hp = 1000
    this.mp = 0
    // return this
  }
}

const cloud = new Player('Cloud')
console.log(cloud.name, cloud.hp, cloud.mp) // Cloud 1000 0
```

## 4) Contexto global (default)

> Regra 4: Se a chamada da função não se enquadra nas regras anteriores, o ‘this’ é o contexto global — ‘window’ no navegador ou ‘global’ no Node.js.

No exemplo abaixo a chamada não é feita como método de um objeto (regra 1), não é usado bind, call, apply (regra 2), nem é usado o new (regra 3). Portanto o `this` é o contexto global.

```js

// Constante no objeto 'window'
window.playerName = 'Tidus'

const sayGlobalName = function () {
  console.log(this.playerName)
}

// A chamada abaixo não se enquadra a nenhuma das outras regras,
// portanto o 'this' na função é o objeto global
// ('window' no navegador ou 'global' no Node.js)
sayGlobalName() // Tidus
```

## Arrow functions

Diferente de funções declaradas com `function`, as _arrow functions_ não criam um novo contexto, mas sim utilizam o mesmo contexto (o mesmo `this`) da função onde ela é declarada (função pai).

```js

const player = {
  name: 'Cloud',
  weapon: 'Fusion Sword',
  sayNameAndAttack () {
    console.log(this.name)

    // Uma 'arrow function'!
    // O 'this' dentro dela vai ser o mesmo que aqui fora
    window.setTimeout(() => {
      console.log(`${this.name} ataca com a ${this.weapon}`)
    }, 1000)
  }
}

player.sayNameAndAttack()
// Cloud
// Cloud ataca com a Fusion Sword
```

É isso aí! Espero que tenha ajudado.

## Referências

*   [https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this)
*   [https://tableless.com.br/javascript-entendendo-o-this/](https://tableless.com.br/javascript-entendendo-o-this/)
*   [https://john-dugan.com/this-in-javascript/](https://john-dugan.com/this-in-javascript/)