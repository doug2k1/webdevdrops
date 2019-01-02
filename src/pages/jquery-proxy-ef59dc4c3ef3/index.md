---
title: "Como funciona a função proxy do jQuery"
date: "2011-06-30T07:00:00.000Z"
---
Olá, pessoal!

Neste post vou mostrar um exemplo de uso da função [**proxy**](http://api.jquery.com/jQuery.proxy/) do [**jQuery**](http://jquery.com/).

No código abaixo tenho uma simples classe, que guarda em seus atributos um botão e uma mensagem. Eu registro um evento no _click_ do botão para dar um _alert_ com a mensagem correspondente. Vai funcionar, não vai?

```js
function ButtonWithMessage(button, message) {    
    this.button = button;    
    this.message = message;    
    button.click(function() {        
        alert(this.message);    
    });
}

var bt1 = new ButtonWithMessage($('#bt1'), 'Mensagem do Botão 1');
var bt2 = new ButtonWithMessage($('#bt2'), 'Mensagem do Botão 2');
```

Não, não vai. O problema está na linha em destaque. O _alert_ está dentro da função que responde pelo evento do _click_, e não dentro do objeto da classe _ButtonWithMessage_. Sendo assim, o _this_ naquele contexto se refere ao elemento que foi clicado (um elemento HTML) e não ao nosso objeto. Nesse caso o _alert_ vai mostrar _undefined_, pois o elemento HTML não tem um atributo _message_.

Aí que entra o **jQuery.proxy**. Se trocarmos o código do evento para este:

```js
button.click($.proxy(function() { 
    alert(this.message); 
}, this));
```

Aí funciona!

Ao invés de passarmos apenas uma _function_ como anteriormente, passamos esta _function_ através do _proxy_. O primeiro parâmetro é a própria _function_ e o segundo é o contexto, neste caso o próprio objeto da classe _ButtonWithMessage_.

```js
jQuery.proxy( função, contexto )
```

Em resumo, o que ele faz é transformar o _this_ dentro da função para o objeto que foi passado como contexto. Agora nosso código vai enxergar o _this.message_, mesmo dentro de outra função.

É isso aí. Qualquer dúvida, comente.

\[\]’s