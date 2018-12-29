---
title: "Gerenciando versões de Node.js com n"
date: "2017-08-11T14:35:03.891Z"
---
Olá, pessoal! Neste post vou mostrar uma ferramenta muito simples e prática para instalar, remover e gerenciar versões de **Node.js**, o **n** (sim, este é o nome): [https://github.com/tj/n](https://github.com/tj/n)

**Nota:** Infelizmente não funciona no Windows. :(

## Instalando o n

Você tem algumas opções para instalar.

a) Se já possui Node/NPM na máquina:

$ npm install -g n

b) Você pode clonar o repositório e fazer:

$ make install

c) Ou ainda, usando o [n-install](https://github.com/mklement0/n-install):

$ curl -L [https://git.io/n-install](https://git.io/n-install) | bash

Uma vez instalado, você tem o comando `n` para usar no terminal:

$ n --version  
2.1.7 

## Instalando e usando versões do Node

Ver quais versões estão disponíveis para instalação:

$ n ls

![](./1_5ywwlNGIZ6bcgO4zkNYR3w.png)

Saída do comando “n ls”

As versões em negrito já estão instaladas, e a marcada com um `o` é a versão ativa.

Instalar e ativar uma versão específica:

$ n 8.3.0

Ou instalar a última:

$ n latest

Quer conferir se instalou mesmo?

$ node -v  
v8.3.0

Ver quais versões já estão instaladas:

$ n

![](./1_lze8eHh1_n_2B3lu0yXILg.png)

Saída do comando “n”

A versão em destaque é a que está ativa no momento. Você pode ativar outra, ainda nesta tela, usando a **setas do teclado** e apertando **Enter**.

Você também pode ativar outra versão com o comando:

$ n 7.8.0

Veja que é o mesmo comando para instalar uma versão nova. Ele é inteligente o suficiente para verificar se a versão já está instalada, e nesse caso só a torna ativa.

## Removendo versões do Node

Com o tempo você pode começar a ficar com várias versões instaladas. Se quiser remover uma, ou mais, que não esteja usando:

$ n - 4.0.0 6.2.0

Ou se quiser remover todas, exceto a que está ativa:

$ n prune

## Conclusão

O n é uma ferramenta fácil de usar, com comandos simples, mas muito útil para quem trabalha com **Node.js**, seja no backend ou no frontend (e todo o ferramental que depende dele).