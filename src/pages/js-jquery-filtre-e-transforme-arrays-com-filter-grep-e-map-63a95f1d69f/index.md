---
title: "JS/jQuery — Filtre e transforme arrays com filter/grep e map"
date: "2014-02-24T08:00:00.000Z"
---
Duas tarefas muito comuns de se fazer com arrays são: **filtrar** seus elementos ou **transformar** um array em outro. Para facilitar isso o **jQuery** tem as funções **$.grep** e **$.map** (equivalentes aos métodos **Array.filter** e **Array.map** do JavaScript 1.6).

**Atualização!** O artigo fala das funções **grep** e **map** do jQuery, mas ao final mostro as formas correspondentes sem jQuery (**filter** e **map**) que funcionam de maneira quase idêntica.

## Filtrando com $.grep

A função **$.grep** recebe um array e uma função de filtro. Esta função retorna um novo array (não altera o original) contendo apenas os elementos para os quais a função filtro retorna _true_.

## Exemplo

Suponha que temos um array de estudantes, com seus nomes e notas (_name_ e _grade_):

```js
var students = [  
  { name: 'Quico', grade: 10 },  
  { name: 'Godinez', grade: 4 },  
  { name: 'Chaves', grade: 5 },  
  { name: 'Nhonho', grade: 8 }  
];
```

Agora quero filtrar de forma a manter apenas os aprovados (nota **5** ou mais):

```js
var approved = $.grep(students, function(student) {  
  return student.grade >= 5;  
});
```

Note que passamos o array original e uma função. Esta função vai ser executada para cada um dos elementos do array, e deve retornar um booleano indicando se aquele elemento deve ser mantido ou não. No nosso exemplo estamos mantendo só quem tem **nota >= 5**.

A variável _approved_ agora contém:

```js
[  
  { name: 'Quico', grade: 10 },  
  { name: 'Chaves', grade: 5 },  
  { name: 'Nhonho', grade: 8 }  
];
```

## Transformando com $.map

A função **$.map** tem uma assinatura idêntica à $.grep. Ela recebe um array e uma função, e também retorna um novo array. A diferença neste caso é que a $.map recebe uma função de transformação (e não de filtro). Ela retorna um novo array onde cada elemento é o resultado da aplicação da função de transformação no elemento do array original.

## Exemplo

Considerando o mesmo array de estudantes do exemplo anterior, vamos supor que queremos exibir a informação de maneira mais amigável. Vamos gerar um novo array com mensagens (_strings_), de acordo com as notas:

```js
var studentsMessages = $.map(students, function(student) {  
  var message = student.name + ' foi ';

  if (student.grade < 5) {  
    message += 'reprovado.';  
  } else if (student.grade < 10) {  
    message += 'aprovado!';  
  } else {  
    message += 'aprovado com louvor!';  
  }

  return message;  
});
```

Veja que a função de transformação recebe um valor (um objeto com nome e nota) e usa essas informações para retornar um novo valor (uma string) que irá compor o array resultante. Com isso o array _studentsMessages_ fica assim:

```js
["Quico foi aprovado com louvor!",  
"Godinez foi reprovado.",  
"Chaves foi aprovado!",  
"Nhonho foi aprovado!"]
```

## $.map funcionando como $.grep

A $.map tem mais uma carta na manga! Ela pode funcionar como $.grep, excluindo elementos do array resultante. Para isso basta que a função de transformação retorne _null_ ou _undefined_.

## Exemplo

Vamos modificar o exemplo anterior para manter no array de mensagens apenas mensagens para os alunos aprovados:

```js
var studentsMessages = $.map(students, function(student) {  
  var message = student.name + ' foi ';

  if (student.grade < 5) {  
    return null;  
  } else if (student.grade < 10) {  
    message += 'aprovado!';  
  } else {  
    message += 'aprovado com louvor!';  
  }

  return message;  
});
```

Resultado:

```js
["Quico foi aprovado com louvor!",  
"Chaves foi aprovado!",  
"Nhonho foi aprovado!"]
```

Veja que o array resultante é menor que o original, pois além de transformado ele foi filtrado.

## $.map transformando o array original

Os exemplos anteriores deixaram o array original intacto, mas nem sempre isso acontece. Quando temos um array de objetos, como nosso array de estudantes, cada item do array é passado por **referência** à função de transformação ou filtro. Qualquer modificação no item reverte no array original. Podemos usar isso a nosso favor.

## Exemplo

Queremos modificar o array de estudantes, adicionando um novo atributo _gift_, um presente de acordo com a nota de cada um:

```js
$.map(students, function(student) {  
  if (student.grade < 5) {  
    student.gift = 'Livro';  
  } else if (student.grade < 10) {  
    student.gift = 'Refresco';  
  } else {  
    student.gift = 'Bola quadrada';  
  }  
});
```

Note que não estamos atribuindo o resultado de $.map a nada, pois o que nos interessa é modificar o array original. (Neste caso o resultado de $.map é um **array vazio**, pois a função de transformação não retorna nada, o que implicitamente quer dizer que ela retorna _undefined_, e retornando _undefined_ para todos os elementos ela está filtrando e excluindo todos do resultado.)

Com isso, nosso array original _students_ fica assim:

```js
[  
  { name: 'Quico', grade: 10, gift: 'Bola quadrada' },  
  { name: 'Godinez', grade: 4, gift: 'Livro' },  
  { name: 'Chaves', grade: 5, gift: 'Refresco'},  
  { name: 'Nhonho', grade: 8, gift: 'Refresco'}  
]
```

## Sem jQuery: filter e map

A versão **1.6** do JavaScript possui os métodos **Array.filter** e **Array.map**, que servem ao mesmo propósito das funções $.grep e $.map do jQuery. Estes métodos não são implementados no IE8 e inferiores. Para dar suporte a estes navegadores você pode acrescentar essa implementação nos seus scripts (veja a seção **Polyfill** na documentação do **MDN** para cada método — links abaixo).

## Array.filter

Veja o mesmo exemplo do $.grep agora usando **Array.filter**:

```js
var approved = students.filter(function(student) {  
  return student.grade >= 5;  
});
```

Note que filter é um método do próprio array, portanto ele só recebe como parâmetro a função de filtro. O corpo da função de filtro e o resultado são idênticos ao $.grep.

## Array.map

Veja o exemplo de mensagens, agora usando **Array.map**:

```js
var studentsMessages = students.map(function(student) {  
  var message = student.name + ' foi ';

  if (student.grade < 5) {  
    message += 'reprovado.';  
  } else if (student.grade < 10) {  
    message += 'aprovado!';  
  } else {  
    message += 'aprovado com louvor!';  
  }

  return message;  
});
```

Mesma coisa. Só muda a forma de chamar.

## Diferença: Array.map não funciona como filter

Vimos que podemos usar $.map também para filtrar, bastando retornar _null_ ou _undefined_ para os elementos que desejamos exlcuir. Array.map não funciona da mesma forma. Qualquer coisa que for retornada será acrescentada ao array resultante. Exemplo:

```js
var studentsMessages = students.map(function(student) {  
  var message = student.name + ' foi ';

  if (student.grade < 5) {  
    return null;  
  } else if (student.grade < 10) {  
    message += 'aprovado!';  
  } else {  
    message += 'aprovado com louvor!';  
  }

  return message;  
});
```

_studentsMessages_ vai ficar assim:

```js
[  
  "Quico foi aprovado com louvor!",  
  null,  
  "Chaves foi aprovado!",  
  "Nhonho foi aprovado!"  
]
```

Por fim, o exemplo de $.map onde o array original foi alterado funcionaria da mesma forma com Array.map.

## Links

*   [jQuery API: $.grep](https://api.jquery.com/jQuery.grep/)
*   [jQuery API: $.map](https://api.jquery.com/jQuery.map/)
*   [MDN: Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
*   [MDN: Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)