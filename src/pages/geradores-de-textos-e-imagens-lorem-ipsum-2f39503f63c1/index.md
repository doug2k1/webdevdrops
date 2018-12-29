---
title: "Geradores de Textos e Imagens (Lorem Ipsum)"
date: "2013-05-09T07:00:00.000Z"
---
Neste post vou apresentar alguns geradores de textos aleatórios, tipo “_lorem ipsum dolor sit amet_” que a gente vê preenchendo o conteúdo de uma página quando o conteúdo real ainda não existe e a gente precisa ver como o texto se comporta no layout. Também vou mostrar alguns geradores de imagens, usadas para o mesmo fim: compor layout quando ainda não temos as imagens finais.

![](https://cdn-images-1.medium.com/max/800/0*1jorDj0Dblc_ga5c.jpg)

## Lorem Ipsum

_Lorem ipsum dolor sit amet_… este texto em latim é muito usado por designers para compor um layout, ilustrar fonte, tamanho e fluidez do texto. E não é de hoje! Estima-se que este texto seja usado há mais de 500 anos, desde os primórdios da impressão. O fato de ser latim torna o texto incompreensível para a maioria das pessoas, o que atinge o propósito de se forcar no layout e não tentar ler o texto. E sua distribuição de palavras e frases o deixa com uma forma parecida com parágrafos reais, ao contrário de um texto repetitivo como “Nono nonono nono nono”.

## Gerador de Lorem Ipsum

O site [Lipsum.com](http://pt.lipsum.com/) permite gerar quantos parágrafos de lorem ipsum você precisa.

![](https://cdn-images-1.medium.com/max/800/0*aVIsMOVXnO_q6Anr.jpg)

## Gerador de Lero-Lero

O **Fabuloso Gerador de Lero-Lero** surgiu há alguns anos como uma piada. Para quem queria “incrementar” uma monografia, uma apresentação, ele permitia gerar parágrafos de texto que falava muito e não dizia nada (literalmente lero-lero mesmo). Infelizmente o link original não existe mais, mas encontrei este link que ainda funciona: [http://lerolero.miguelborges.com/](http://lerolero.miguelborges.com/)

![](https://cdn-images-1.medium.com/max/800/0*UsPhS2smSTmnPZSY.jpg)

O lero-lero pode perfeitamente ser usado com o mesmo propósito do lorem ipsum, com a vantagem que ele inclui palavras em português, o que o torna mais indicado para simular conteúdos na nossa língua, e como possui palavras com acento e “ç”, ainda permite verificar algum problema de _encoding_ errado (quando palavras acentuadas viram caracteres estranhos).

## Menção Honrosa: Mussum Ipsum

Apesar do lorem ipsum e lero-lero já servirem nosso propósito de gerar texto aleatório, não posso deixar de citar o [**Mussum Ipsum**](http://mussumipsum.com/), um gerador de lorem ipsum misturado com “cacildis”, “cachacis” e outras palavras do vocabulário do grande Mussum. :)

![](https://cdn-images-1.medium.com/max/800/0*HvcWvbBhbXBi3P_D.jpg)

## Gerador de Imagem: Dummy Image

Além de textos, os conteúdos de uma página podem ter imagens, como fotos em uma notícia, ou banners publicitários. Quando não temos as imagens finais, podemos buscar alguma coisa no [**Google Images**](http://images.google.com/), recortar e encaixar no layout pra preencher os espaços. Uma alternativa é usar o [**Dummy Image**](http://dummyimage.com/). Você passa pra ele as dimensões, cores e texto e ele te devolve uma imagem daquele tamanho com o texto escrito na imagem. Você pode salvar as imagens que ele gera ou linkar diretamente e já mostrar a imagem na sua página sem precisar salvar.

![](https://cdn-images-1.medium.com/max/800/0*3K4p3XPlnezg2qgJ.png)

## Lorem Pixel

Se as imagens do **Dummy Image** são meio sem graça, outra opção é o [**Lorem Pixel**](http://lorempixel.com/). A diferença dele é que você passa as dimensões e uma categoria, como pessoas, esportes, cidade, abstrato, e ele te retorna uma foto aleatória daquela categoria. Assim, usando o mesmo link, cada vez ele traz uma foto diferente, variando mais o layout.

![](https://cdn-images-1.medium.com/max/800/0*irTpRYdMIaUWVFKj.jpg)

## Para os Rubystas: Faker

Para quem programa **Ruby**, existe uma gem chamada [**Faker**](http://faker.rubyforge.org/), que é um gerador de dados aleatórios: nome, endereços, telefones, etc. Cada chamada ele traz um resultado diferente, ideal para rodar em um _loop_ gerando dados variados. Muito útil para popular o banco de dados em uma aplicação **Rails** para testes de performance, layout (ver listagens, paginação, por exemplo) e afins.

Veja alguns exemplos do que ela gera:

Faker::Name.name => “Demetris Hahn”   
Faker::Internet.email => “stewart@dibbert.name”   
Faker::Company.name => “O’Conner-Howell”   
Faker::Internet.url => “http://farrell.biz/marcella\_dibbert"  
Faker::Address.street\_address => “2110 Conroy Branch”

Tem também a [**ffaker (Faster Faker)**](https://github.com/EmmanuelOga/ffaker) que alega ser uma versão bem mais rápida do **Faker** original.

É isso aí, negadis! Espero que essas ferramentas sejam úteis.

Até a próxima!