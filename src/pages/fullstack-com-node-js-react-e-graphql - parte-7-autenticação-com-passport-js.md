---
title: 'Fullstack com Node.js, React e GraphQL - Parte 7: Autenticação com Passport.js'
date: 2019-01-20T01:41:02.178Z
---
Olá, pessoal! Neste sétimo post da série [**Fullstack com Node.js, React e GraphQL**](/fullstack-node-react-graphql-introducao-2c2f18c757c4) vou adicionar autenticação à aplicação usando [**Passport.js**](http://www.passportjs.org) e [**Google OAuth**](https://developers.google.com/identity/protocols/OAuth2).

## Mas antes…

Vou substituir o arquivo _secret.js_, onde guardava configurações secretas como senhas e chaves, pelo módulo [**dotenv**](https://www.npmjs.com/package/dotenv), que permite fazer a mesma coisa, mas vai facilitar lá na frente quando tivermos ambientes separados (desenvolvimento e produção).

Com isso guardamos estas configurações em um arquivo .env, com o formato:

```
DATABASE_PASSWORD=111
FOREST_ENV_SECRET=222
FOREST_AUTH_SECRET=333
```
