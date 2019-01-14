---
title: "Dicas para deixar seu site mais rápido com imagens mais leves"
date: "2013-05-23T07:00:00.000Z"
---
Neste artigo vou mostrar como deixar seu site mais rápido com imagens mais leves. Saiba escolher o melhor formato para cada situação e compactar ao máximo, sem perder qualidade.

Frequentemente vejo sites usando imagens mal compactadas ou em um formato inadequado, deixando o site bem mais pesado que o necessário e sem nenhum ganho de qualidade. Muitas vezes uma imagem mal tratada fica mais pesada e ainda com qualidade pior.

![](/0_dSh2VqmH0QP_Ts83.jpg)

## O formato certo para cada ocasião

Atualmente os formatos de imagens mais recomendados para a web são **JPG**, **PNG** e **GIF**. Cada um tem seus prós e contras.

O formato **JPG** permite milhões de cores simultâneas, o que o torna ideal para fotos (pessoas, paisagens, objetos reais). Por outro lado, é um formato que causa perda na qualidade se for muito comprimido. O **JPG** pode ser salvo com um nível de qualidade que varia de **1** (menor tamanho, pior qualidade) a **100** (maior tamanho, melhor qualidade). O **JPG** não suporta transparência nem animação.

![](/0_DFtFn-iiYqK9YFRx.jpg)

Exemplo de JPG

O **PNG** possui duas variações: **PNG** de 8 bits (**PNG8**) e **PNG** de 24 bits (**PNG24**).

O **PNG8** possui um limite de **256 cores** por imagem, o que não o torna ideal para fotos, mas sim para gráficos, desenhos, logos, ícones e elementos de interface que não possuam muitas cores. Na hora de exportar um **PNG8** você pode definir a quantidade de cores que o arquivo vai usar. Quanto menor, mais leve fica a imagem.

![](/0_R5I617RuWvl3S4nS.png)

Exemplo de PNG8

O **PNG24** suporta milhões de cores como o **JPG** e não perde qualidade na compressão (o que se chama de compressão _lossless_). No entanto ele é o mais pesado dos formatos.

Ambas variações de **PNG** suportam transparência. A diferença é que no **PNG8** você só tem dois níveis: trechos totalmente opacos e trechos totalmente transparentes. Já o **PNG24** possui canal alfa, o que permite diferentes níveis de transparência. Como o **PNG24** é o mais pesado, deve ser usado com moderação, onde os níveis de transparência são mesmo necessários.

![](/0_LlCqIqnCjOg2B-Fu.jpg)

Exemplo de PNG24

Por fim, o **GIF** tem as mesmas características do **PNG8**, com a diferença que ele é o único dentre os formatos citados que suporta animação, sendo ideal para ícones animados, como aquele ícones que indicam que um carregamento ou processamento está em andamento. Exemplo de **GIF** animado:

![](/0_hhovxsRJd3cQ-D9b.gif)

## Ferramentas para exportação

Para a maioria de nós que usa **Photoshop**, ele possui a opção “**Salvar para a Web**”, que permite escolher o melhor formato e ajustar os parâmetros para enxugar mais a imagem. Uma grande facilidade é que ele te dá uma prévia de como vai ficar o resultado e qual será o tamanho do arquivo.

![](/0_PUvovG7irw9x9vH0.jpg)

Exportando para Web com Photoshop

Uma opção gratuita e muita boa para quem usa Windows é o [**RIOT (Radical Image Optimization Tool)**](http://luci.criosweb.ro/riot/). Este programa pode ser usado sozinho ou como _plugin_ de visualizadores de imagens, como o meu preferido: [**Irfanview**](http://www.irfanview.com/). Na hora de exportar, assim como no **Photoshop**, ele permite comparar a qualidade e o tamanho entre a imagem original e a imagem otimizada.

![](/0_n0caoauQDPSE85Bw.jpg)

Exportando para Web com RIOT

Mas não adianta ter boas ferramentas para exportar imagens se não soubermos escolher os parâmetros.

## Exportando JPG

Na hora de exportar um **JPG**, o principal fator é o parâmetro qualidade, que pode variar de 1 a 100. Você deve começar com um valor baixo (algo como 30) e ir subindo até a qualidade ficar aceitável. Geralmente o ideal fica entre 30 e 80, dependendo dos detalhes da imagem. Abaixo de 30 fica muito ruim e acima de 80 fica muito pesado.

![](/0_LLf1wn6hi0wpP4OU.jpg)

JPG qualidade 10

![](/0_pmKG143x02doWaK4.jpg)

JPG qualidade 30

![](/0_su-wt5pgK_x5s8kD.jpg)

JPG qualidade 60

![](/0_QfaEWdVpyA4rMlLo.jpg)

JPG qualidade 80

## Exportanto PNG24

**PNG24** não tem muito o que fazer. No máximo você pode ativar ou desativar a transparência, mas se você está usando **PNG24** é porque precisa da transparência.

## Exportando PNG8 e GIF

**PNG8** e **GIF** tem parâmetros parecidos na hora de exportar. Você pode ativar ou não a transparência e escolher a quantidade de cores, entre 2 e 256. Escolha o mínimo possível até onde não comprometa a qualidade.

![](/0_11QZVI6lt5xHxZ-j.png)

PNG com 8 cores

![](/0_bmt0yXvvVzqkrJpT.png)

PNG com 32 cores

![](/0_Rl3DdnaR7oYpXCiB.png)

PNG com 256 cores

## Conclusão

Sabendo escolher o formato certo e ajustando os parâmetros na hora de exportar as imagens, você pode deixar seu site bem mais leve, mais rápido e ainda economizar na hospedagem.

A otimização de um site envolve [muitos outros fatores](http://developer.yahoo.com/yslow/), que poderemos falar em futuros posts, mas certamente a otimização de imagens é um fator que se deve ter um cuidado especial.