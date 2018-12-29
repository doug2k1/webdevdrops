---
title: "Fullstack com Node.js, React e GraphQL — Parte 1: Introdução"
date: "2018-03-04T14:25:18.880Z"
---
E aí, pessoal! Nesta série de posts irei documentar o desenvolvimento de uma aplicação web, backend e frontend, do zero até produção, envolvendo tecnologias como **Node.js**, **Sequelize**, **React**, **GraphQL** e **Apollo**.

![](./1_tdnJ3a6gvjh7T27n2sdPFw.png)

## Motivação

A idéia da aplicação em si vem de um problema pessoal que eu queria resolver (explico mais sobre o problema abaixo), além de ser uma oportunidade de praticar algumas tecnologias que acho interessantes, como **GraphQL**.

A idéia de escrever os posts veio pelos seguintes motivos:

*   Documentar o processo, e tudo que eu vier a aprender no meio do caminho, seja para minhas próprias consultas futuras, ou para ajudar outros que estão no mesmo aprendizado.
*   Receber feedback de quem tem mais experiência e possa sugerir melhorias e correções no que eu estiver fazendo.

## O Problema

Há algum tempo comecei a estudar sobre educação financeira e investimentos. Com a polêmica Reforma da Previdência em pauta em toda a mídia, percebi que não é uma boa escolha deixar meu futuro nas mãos do governo. Por isso tracei uma meta, que chamei de **_Plano 2037_**:

> Em 20 anos (2037) ter um patrimônio aplicado em investimentos que seja suficiente para viver com os rendimentos.

Com isso passei a controlar melhor meus gastos (para sobrar alguma coisa para investir), pesquisar e testar investimentos. Montei uma planilha para acompanhar a evolução do patrimônio investido, se está dentro da meta, onde estão meus investimentos, como está o rendimento de cada investimento, entre outras métricas.

A planilha começou a ficar complexa e trabalhosa de atualizar e consultar. Então, nada melhor que juntar a fome com a vontade de comer: criar uma **aplicação web** para substituir a planilha, resolver meu problema de acompanhamento de investimentos e de quebra praticar algumas tecnologias interessantes.

## Arquitetura

![](./1_a57VA9JPX1D_VAPYg0zO1A.png)

Resumo da arquitetura

Lendo a imagem de baixo para cima:

*   Os dados ficarão em um banco [**PostgreSQL**](https://www.postgresql.org/).
*   O backend será em [**Node.js**](https://nodejs.org/), com [**Express**](https://expressjs.com/), utilizando o ORM [**Sequelize**](http://docs.sequelizejs.com/) para modelagem dos dados e comunicação com o banco.
*   O backend irá expor uma API REST para comunicação com a interface administrativa, onde ficará basicamente os CRUDs das tabelas.
*   Vamos usar o [**Forest Admin**](https://www.forestadmin.com/), que provê esta API REST e a interface administrativa com pouco esforço.
*   O backend também terá um endpoint [**GraphQL**](http://graphql.org/), feito com [**Apollo Server**](https://www.apollographql.com/docs/apollo-server/), para servir as consultas feitas pelo frontend.
*   Neste frontend, feito em [**React**](https://reactjs.org/), ficarão os gráficos e todas as métricas para acompanhamento dos investimentos. Ele irá se comunicar com o backend através do endpoint GraphQL, usando [**Apollo Client**](https://www.apollographql.com/client/) para integrar as chamadas com os componentes React.
*   A aplicação terá ainda autenticação via Google oAuth para proteger o front e o endpoint GraphQL. Vamos usar [**Passport.js**](http://www.passportjs.org/) para facilitar este processo.
*   Tudo irá para produção hospedado no [**Heroku**](https://heroku.com), usando apenas recursos gratuitos.

### Escolha das tecnologias

Lembrando que este projeto, além de resolver um problema, serve como estudo. Por isso algumas tecnologias estão aí também para servir este propósito. Se fosse só pelo problema, talvez um site estático gerado com uns arquivos JSON já atenderia.

## Próximos capítulos

Sujeito a mudanças.

*   [**2: Setup inicial e servidor NodeJS com Express**](../fullstack-node-react-graphql-express-b551b1a25ef3) (publicado)
*   [**3: Banco de dados PostgreSQL e mapeamento com Sequelize**](../fullstack-node-react-graphql-postgresql-sequelize-11e646979b27) (publicado)
*   [**3.1: Testes unitários de models**](../fullstack-node-react-graphql-testes-mocha-chai-eb5646e5b929) (publicado)
*   [**4: Interface administrativa com Forest Admin**](../fullstack-node-react-forest-admin-e3b07c142f9a) (publicado)
*   [**5: Integração contínua com Travis CI**](../fullstack-node-react-travis-ci-2caaee9ccbb5) (publicado)
*   [**6: Servidor GraphQL com Apollo Server**](../fullstack-node-react-graphql-apollo-1a0559e0fc51) (publicado)
*   7: Autenticação com Google e Passport
*   8: Deploy em produção com Heroku
*   9: Setup frontend com Webpack e Babel
*   10: Frontend ReactJS
*   11: Testes end-to-end com TestCafe (ou Cypress)
*   12: Transformando a aplicação em PWA

## Até a próxima

Este post foi só para introduzir a série. Já estou desenvolvendo a aplicação alguns passos na frente, quebrando algumas pedras e deixando mais redondo para escrever os posts.