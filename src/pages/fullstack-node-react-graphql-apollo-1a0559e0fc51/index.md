---
title: "Fullstack com Node.js, React e GraphQL — Parte 6: Servidor GraphQL"
date: "2018-04-21T00:06:02.176Z"
image: "1_45PbrMFt9GJDe3cYwVxl2Q.png"
---
E aí, pessoal! Neste sexto post da série [**Fullstack com Node.js, React e GraphQL**](/fullstack-node-react-graphql-introducao-2c2f18c757c4) vamos adicionar o **GraphQL** no servidor usando [**Apollo Server**](https://www.apollographql.com/docs/apollo-server/).

![](/1_45PbrMFt9GJDe3cYwVxl2Q.png)

## GraphQL

[**GraphQL**](http://graphql.org/) é uma linguagem de consulta (_query language_) para APIs que permite ao cliente descrever exatamente os dados que quer receber, e também um conjunto de tecnologias que permite ao servidor descrever os dados disponíveis e entregar estes dados, que podem ser buscados de múltiplas fontes (bancos de dados, APIs REST, outros servidores GraphQL).

Para ilustrar, veja um exemplo de query e o retorno do servidor:

![](/1_J38COL43zbvywF6lmu_hQQ.png)

Eu pedi pelas corretoras, campos id e nome, e dentro de cada corretora trazer seus investimentos, apenas campo nome. Esta é a parte **QL** do nome (_query language_).

### E o grafo?

A parte **Graph** do nome vem do fato que toda busca percorre um **grafo**.

> **Grafo** é uma estrutura formada por **vértices** (ou pontos ou nós) e **arestas** (ou linhas) que ligam os vértices.

Para ilustrar, veja como ficaria o grafo que representa nossa aplicação. Destacado em laranja está o caminho percorrido pela _query_ acima.

![](/1_XQbgY8IoglLkOox1pOg12A.png)

Grafo com a representação de nossos modelos e suas relações.

No **GraphQL** sempre temos um nó especial, chamado _Query_ (ou ponto de entrada, _root query_, _entrypoint_, _root type_) que é por onde toda consulta deve iniciar.

No nosso exemplo, a partir daí a consulta pode requisitar um ou mais **Brokers** ou **Investments**, e sequencialmente ir seguindo as arestas e pedindo dados de outros modelos relacionados. Essa estrutura, e o que pode ou não ser pedido será definida por nós, quando criarmos nosso **schema**.

## Apollo

[**Apollo**](https://www.apollographql.com/) é uma plataforma para desenvolvimento com GraphQL composta por:

*   [**Apollo Client**](https://www.apollographql.com/client): facilita a integração do _frontend_ com o servidor GraphQL, possuindo bibliotecas para os principais frameworks JS (React, Vue, Angular) e plataformas mobile nativas (Android e iOS).
*   [**Apollo Engine**](https://www.apollographql.com/engine): fornece ferramental auxiliar para infraestrutura como _caching_, tratamento de erros e rastreamento de performance.
*   [**Apollo Server**](https://www.apollographql.com/server): bibliotecas que auxiliam na criação do servidor. Vamos usá-lo nesta parte do projeto.

### Schema

A primeira coisa que precisamos pensar é na forma dos dados que serão disponibilizados. Como já temos nossos modelos definidos, vamos expor o que poderá ser consultado através do GraphQL (montar aquele grafo que vimos acima).

O **schema** é como se fosse um contrato entre o fornecedor e o consumidor dos dados (ou entre o _server_ e o _client_).

### Ponto de entrada

Vamos criar nosso schema em _src/graphql/schema.graphql_, começando pela _root query:_

```graphql
type Query {  
  brokers(limit: Int): [Broker]  
  broker(id: ID!): Broker  
  investments(limit: Int): [Investment]  
  investment(id: ID!): Investment  
}
```

Cada atributo possui um nome e um tipo de retorno e, opcionalmente, pode receber parâmetros. A sintaxe se assemelha a assinatura de funções em linguagens fortemente _tipadas_.

A `!` como em `id: ID!` significa obrigatoriedade daquele valor.

`[]` como em `[Broker]` significa uma lista de objetos daquele tipo.

Resumindo, nosso ponto de entrada permite buscar por um `broker` ou um `investment`, informando o _id_ como parâmetro, ou por uma lista de `brokers` ou `investments`, opcionalmente informando um limite.

### Demais nós

Na sequência descrevemos os nós que representam nossos modelos, ficando assim:

```graphql
scalar Date

type Query {
  brokers(limit: Int): [Broker]
  broker(id: ID!): Broker
  investments(limit: Int): [Investment]
  investment(id: ID!): Investment
}

type Broker {
  id: ID!
  name: String!
  investments: [Investment]
}

type Investment {
  id: ID!
  name: String!
  broker: Broker
  balanceUpdates(limit: Int, order: [[String]]): [BalanceUpdate]
  transactions: [Transaction]
}

type BalanceUpdate {
  id: ID!
  amount: Float!
  date: Date!
}

type Transaction {
  id: ID!
  amount: Float!
  date: Date!
}
```

Para mais detalhes, veja a documentação sobre a definição de _schema_: [http://graphql.org/learn/schema/](http://graphql.org/learn/schema/)

### Resolvers

Definido o **schema** e a forma do nosso grafo, a aplicação ainda não sabe como buscar os dados para atender as _queries_. Vamos resolver isso com **resolvers**. 🥁😁

Vamos criar o arquivo _src/graphql/resolvers.js_:

Este arquivo exporta um objeto JS onde para cada navegação de um nó a outro do grafo definimos uma função que irá buscar os dados referente àquela parte da _query_ (E esta busca pode ser em mútiplos locais: banco de dados, API REST ou até outro servidor GraphQL).

Por exemplo, se estou em **Investimento** e quero buscar a **Corretora** daquele investimento, tenho:

```js
Investment: {  
    broker: obj => Broker.findOne({ where: { id: obj.BrokerId } })
```

O primeiro argumento da função, `obj`, é o objeto que representa aquele nó. Assim, para buscar o **Broker** usamos `Broker.findOne` passando o atributo `BrokerId` do **Investment**.

Para _queries_ que aceitam parâmetros, estes são passados no segundo argumento da função. Exemplo:

```js
Query: {  
    brokers: (obj, args) => Broker.all(args),  
    broker: (obj, { id }) => Broker.findById(id)
```

### Endpoint de consultas

Temos o _schema_, que descreve as _queries_, e os _resolvers_ que buscam os dados. Vamos juntar as duas partes e criar nosso _endpoint_ de consultas, que é o endereço onde o frontend da aplicação vai bater para trazer os dados para a tela. Aqui vamos usar o **Apollo Server**:

Usei a função `makeExecutableSchema` do módulo **graphql-tools** para criar um _schema_ “executável” a partir do nosso _schema_ e _resolvers_.

Para importar o arquivo _schema.graphql_ usei o módulo **graphql-import**, já que não é um arquivo JS e não pode ser importado diretamente.

Com o _schema_ “executável”, uso a função `graphqlExpress`, do módulo **apollo-server-express**, que é um _middleware_ do **Express**, para definir o _endpoint_ no caminho _/graphql._

Para organização eu deixei este código em um arquivo separado, _setupGraphQL.js_, que exporta uma função de setup, que é usada no _src/index.js_ esta forma:

```js
const setupGraphQL = require('./setupGraphQL');

const app = express();

setupGraphQL(app);
```

Agora precisamos testar nossas consultas. Ah, se tivesse uma espécie de _playground_ onde pudéssemos inserir _queries_ e ver os resultados…

Mas tem! É o…

## GraphiQL

O **GraphiQL** é uma interface web que permite inserir _queries_, possui autocomplete e uma documentação com todas as _queries_ e campos possíveis. Tudo gerado a partir do nosso _schema_.

![](/1_SOshJPwch9WxUPUeNPHseQ.png)

Interface do GraphiQL

Para habilitar esta interface basta usar o _middleware_ `graphiqlExpress` do **Apollo**, informando o _endpoint_ de consultas.

```js
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
```

Assim, basta rodar o servidor local e acessar [http://localhost:5000/graphiql](http://localhost:5000/graphiql) para explorar seu servidor **GraphQL**.

## E-book gratuito

A *Danki Code* tem um e-book gratuito:  
📚 **Como se tornar um(a) Desenvolvedor(a) Full-Stack**  
que você pode baixar aqui: http://bit.ly/ebook-fullstack 


## Resultado final

O código do projeto até este ponto está em: [https://github.com/doug2k1/my-money/tree/v5.0.0](https://github.com/doug2k1/my-money/tree/v5.0.0)

## No próximo capítulo

Na próxima parte vamos implementar **autenticação** para proteger nosso _endpoint_ de consultas contras bisbilhoteiros.

_Stay tuned!_

## Feedbacks?

E aí, o que está achando até agora? Algo que precisa melhorar?

\[\]’s