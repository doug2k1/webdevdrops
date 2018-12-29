---
title: "jQuery: diferença entre bind, live, delegate, on"
date: "2016-09-27T03:00:45.249Z"
---
A biblioteca [**jQuery**](http://www.jquery.com) oferece diferentes formas de registrar eventos: **bind**, **live**, **delegate**, **on**… Mas quais são as diferenças? Quando devo usar cada uma destas funções?

![](./1_Gss2nCUCTy4vw_qicvxZDg.jpeg)

## bind

$(‘.classe’).bind(‘click focus’, function() { alert(‘evento disparado’); });

Registra um ou mais eventos diretamente nos elementos selecionados. Registra apenas para os elementos que existem na página no momento que o _bind_ foi chamado, ou seja, elementos que são criados posteriormente via JS não respondem ao evento. Quem chegou depois não participa da brincadeira.

## live (deprecated)

$(‘.classe’).live(‘click focus’, function() { alert(‘evento disparado’); });

Registra eventos nos elementos que casam com o seletor, atualmente e no futuro. Diferente do _bind_, mesmo elementos que são criados dinamicamente, depois da chamada do _live_, também responderão aos eventos. Esse sim, não importa a hora que você chega, se você casa com o seletor, seu evento vai ser tratado.

Como ele faz isso? Na verdade o _live_ registra os eventos no objeto _document_, que contém todos os elementos da página. No exemplo acima, quando um click é disparado, o objeto _document_ captura o evento e procura por elementos que casem com ‘.classe’, executando a ação correspondente usando cada elemento como alvo.

O preço desta facilidade é desempenho. Cada vez que um evento registrado com o _live_ é disparado, ele faz uma busca em todo o documento para encontrar os elementos que casem com o seletor. E isso custa caro. Por isso a própria documentação do **jQuery** recomenda usar o _delegate_ ao invés do _live_.

## delegate

$(‘.classe-pai’).delegate(‘a’, ‘click’, function() { alert(‘evento disparado’); });

O _delegate_ é parecido com o _live_ no sentido que, mesmo elementos criados depois também respondem aos eventos. A diferença é que aqui ele não usa o _document_ como elemento raiz. Você escolhe o elemento raiz (no exemplo ‘.classe-pai’) e os elementos filhos que responderão pelo evento (no caso, ‘a’). Desta forma você tem as vantagens do _live_, mas restringindo o alcance a uma parte limitada do documento e assim ganhando desempenho.

## Dica de performance!

O _delegate_ é ideal para melhorar o desempenho quando você tem vários elementos na página que respondem a um evento de forma parecida.

**Exemplo**: Você tem 50 miniaturas de fotos de uma página, e quando clicar em cada uma delas vai abrir um overlay com a foto ampliada. Ao invés de fazer o _bind_ em todas as fotos:

$(‘.miniatura’).bind(‘click’, function() { abreFoto($(this).attr(‘href’)); });

Faça um _delegate_, usando um elemento pai das miniaturas como elemento raiz:

$(‘.div-miniaturas’).delegate(‘.miniatura’, ‘click’, function() { abreFoto($(this).attr(‘href’)); });

Assim, você reduz a quantidade de eventos registrados na página de 50 para 1, ganhando bastante performance.

## on (one function to rule them all)

As funções que vimos acima (exceto o _live_, que está com os dias contados) ainda são recomendadas para quem usa **jQuery** em versão anterior ao 1.7. A partir da versão 1.7 surgiu o _on_, que agora é a recomendação para substituir todas as outras.

Esta função possui duas sintaxes. A primeira tem o mesmo efeito do _bind_, registrando o evento nos elementos selecionados:

$(‘.classe’).on(‘click focus’, function() { alert(‘evento disparado’); });

Já a segunda funciona como o _delegate_, registrando o evento no elemento pai e disparando nos elementos filhos filtrados por um seletor.

$(‘.classe-pai’).on(‘click’, ‘a’, function() { alert(‘evento disparado’); });

## Conclusão

Em resumo, antes do 1.7 use _bind_ e _delegate_ (este último ideal para elementos que serão criados dinamicamente ou elementos repetidos que respondem de forma semelhante a um mesmo evento). Do 1.7 pra frente, _on_ é o cara!

\[\]’s