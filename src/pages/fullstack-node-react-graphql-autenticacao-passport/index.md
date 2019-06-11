---
title: "Fullstack com Node.js, React e GraphQL - Parte 7: Autenticação com Passport.js"
date: "2019-05-01"
image: "fullstack-node-react-graphql-7.jpg"
---

Olá, pessoal! Neste sétimo post da série [**Fullstack com Node.js, React e GraphQL**](/fullstack-node-react-graphql-introducao-2c2f18c757c4) vou adicionar autenticação à aplicação usando [**Passport.js**](http://www.passportjs.org/) e [**Google OAuth**](https://developers.google.com/identity/protocols/OAuth2).

![](/fullstack-node-react-graphql-7.jpg)

## Mas antes...

Vou substituir o arquivo *secret.js*, onde guardava configurações secretas como senhas e chaves, pelo módulo [**dotenv**](https://www.npmjs.com/package/dotenv), que permite fazer a mesma coisa, mas vai facilitar lá na frente quando tivermos ambientes separados (desenvolvimento e produção).

```bash
npm i dotenv
```

Com isso guardamos estas configurações em um arquivo *.env*, com o formato:

```
DATABASE_PASSWORD=111
FOREST_ENV_SECRET=222
FOREST_AUTH_SECRET=333
```

E o **dotenv** vai passar esses valores para o código como variáveis de ambiente, podendo ser acessadas assim: `process.env.DATABASE_PASSWORD` 

## Passport.js

[**Passport.js**](http://www.passportjs.org/) é um *middleware* para implementar autenticação em aplicações Node.js com Express, com vasta integração com serviços terceiros (login com **Google**, **Facebook**, **Twitter**, etc.). 

Nossa aplicação, a princípio, vai permitir apenas login com conta **Google**, e por ser uma aplicação pessoal, será mono-usuário, ou seja, apenas uma conta do Google específica terá acesso. (Isso pode ser mudado no futuro com certa facilidade)

Vamos precisar de duas dependências (o **Passport** em si e a integração com **Google OAuth**):

```bash
npm i passport passport-google-oauth20
```

### Serialize e deserialize

Vamos criar um arquivo `setupAuth.js` para fazer o setup quando a aplicação inicializar.

A primeira coisa que vamos definir são as funções `serializeUser` e `deserializeUser`.

Vamos guardar em *sessão* a informação do usuário logado, e como este espaço é limitado, guardamos o mínimo necessário para identificar o usuário (normalmente o `id`). Precisamos dizer ao **Passport.js** qual informação vamos guardar em *sessão* - `serializeUser` - e como pegar os dados completos do usuário a partir desta informação - `deserializeUser`.

No nosso caso, como  aplicação usa apenas o id e nome do usuário, a informação é simples o bastante para ficar inteira na *sessão*.

```js
// setupAuth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const setup = app => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

   passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = setup;
```

O uso mais típico é guardar em *sessão* apenas o `id` e depois usar este `id` para fazer uma consulta no banco para pegar o restante dos dados. Na [documentação do Passport.js](http://www.passportjs.org/docs/configure/) tem exemplo com este cenário.

### Google OAuth

Agora vamos configurar o **Google OAuth**:

```js
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: `${process.env.SITE_URL}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      // pega o e-mail principal do usuário que logou
      const accountEmail = profile.emails.find(e => e.type === 'account');

      // verifica se o e-mail é o e-mail permitido
      if (
        accountEmail &&
        accountEmail.value === process.env.GOOGLE_OAUTH_ALLOWED_USER
      ) {
        // retorna id, displayName e photo
        return done(null, {
          id: profile.id,
          displayName: profile.displayName,
          photo: profile.photos ? profile.photos[0].value : null
        });
      }

      return done(null, false);
    }
  )
);
```

Passamos para o `passport.use` uma instância do `GoogleStrategy`. 

O primeiro parâmetro da inicialização são algumas configurações. Veja que usamos `process.env` pra pegar alguns valores do `dotenv`. Vamos ver mais embaixo como conseguir este id e senha.

O segundo parâmetro é uma função que será chamada quando alguém realizar o login via Google. Aqui a gente pega o e-mail do usuário e comparamos com um e-mail que temos no `dotenv`. Apenas um e-mail específico terá permissão de acesso. 

Se for o e-mail certo, pegamos alguns dados como id, nome e foto. Se não for o e-mail correto, retornamos `done(null, false)`, que interrompe o processo de login.

### Habilitar session

Precisamos habilitar o Passport.js e o uso de *sessão* na aplicação:

Vamos instalar:

```bash
npm i express-session
```

No `index.js` adicionar:

```js
app.use(
  session({
    secret: process.env.SESSION_KEY
  })
);
```

E no `setupAuth.js`:

```js
app.use(passport.initialize());
app.use(passport.session());
```

### Configurar rotas

Ainda no `setupAuth.js` vamos adicionar algumas rotas à aplicação relacionadas ao fluxo de autenticação:

```js
// inicia fluxo de login
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// rota de retorno após autenticar no Google
app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/');
  }
);

// fluxo de logout
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
```

Nosso fluxo de login vai funcionar da seguinte forma:

**Usuário não logado**:

1) Um link de "Login" manda para "/auth/google".
2) O **Passport** vai redirecionar para o **Google**, onde o usuário faz o login.
3) O **Google** redireciona de volta para a nossa app em "/auth/google/callback", 
onde o **Passport** reconhece o usuário e guarda sua informação na sessão.
4) Nossa app redireciona para a _home_, com o usuário já logado.

**Usuário logado**

1) Para o usuário sair (logout), mandamos para a rota "/auth/logout".
2) O **Passport** apaga a sessão e desloga o usuário.

### Registrar no Google OAuth

Precisamos registrar nossa aplicação para usar o serviço de autenticação do **Google**. 

Você precisa ter uma conta no **Google** e acessar o dashboard do **Google APIs**: https://console.developers.google.com/apis/dashboard

Lá você precisa criar um novo projeto, e com este projeto selecionado, acessar a área de *Credenciais*:

![](/google-api-credenciais.png)

Depois clica em **Criar credenciais** e **ID do cliente OAuth**. Depois escolha **Aplicação web** e dê um nome. No meu caso, eu criei duas entradas, uma pra desenvolvimento, que chamei de **dev** e uma para produção (**prod**).

Em **Origens JavaScript autorizadas** você deve informar domínios autorizados a usar esta credencial. No de **dev** eu deixei em branco.

Em **URIs de redirecionamento autorizados** você deve informar a URL de retorno após o usuário fazer login. No nosso caso, em **dev** ficou: http://localhost:5000/auth/google/callback

Quando você salvar, ele vai mostrar o **ID do cliente** e **Chave secreta do cliente**. Anote esses valores pois já vamos precisar.

Por fim, você precisa ir na aba **Tela de consentimento OAuth** para configurar a tela que o usuário vai ver quando estivr fazendo login.

Com o id e chave anotados, adicione-os em novas entradas no arquivo .env:

```
GOOGLE_OAUTH_CLIENT_ID=444
GOOGLE_OAUTH_CLIENT_SECRET=555
GOOGLE_OAUTH_ALLOWED_USER=example@gmail.com
SESSION_KEY=oh932hiuhe8wfuhif8327
```

O `GOOGLE_OAUTH_ALLOWED_USER` guarda o único e-mail com premissão de acessar nossa aplicação (que por hora vai ser mono usuário).

`SESSION_KEY` guarda uma chave (qualquer sequência inventada por você) que proteje os dados da sessão.

## Protegendo as rotas

Vamos criar um _middleware_ do **Express** para proteger as rotas que necessitam autenticação:

```js
// src/middleware/authMiddleware.js
const authMiddleware = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

   res.status(401).send();
};

 module.exports = authMiddleware;
```

O que ele faz é chamar o método `isAuthenticated()` que o **Passport** fornece. Se o usuário estiver autenticado, prossegue com o carregamento da rota, se não, retorna erro 401.

### Protegendo os endpoints do GraphQL

Vamos proteger os endpoints do **GraphQL**. No _src/setupGraphQL.js_ adicionamos a chamada ao `authMiddleware` nos endpoints de consulta e do **GraphiQL**:

```js{4,13}
// graphql endpoint
app.use(
  '/graphql',
  authMiddleware(),
  graphqlExpress(req => {
    return { schema, context: { user: req.user } };
  })
);

// graphiql endpoint
app.use(
  '/graphiql',
  authMiddleware(),
  graphiqlExpress({ endpointURL: '/graphql' })
);
```

Assim, se você tentar acessar "/graphiql" vai receber um erro 401. 

Para logar acesse "/auth/google", faça o login com seu **GMail** que está configurado em `GOOGLE_OAUTH_ALLOWED_USER`, e depois tente acessar "/graphiql" novamente. Você vai conseguir acessar.

### Adicionando links de Login e Sair

Vamos deixar a página inicial dinâmica, com links de "Login" e "Sair", de acordo com o estado de autenticação do usuário. Vou usar templates [**EJS**](https://ejs.co/) pra isso:

```bash
npm i ejs
```

Habilitamos o **EJS** no **Express** e configuramos a rota inicial para retornar a view `index`, recebendo os dados do usuário. Adicionamos no _src/index.js_:

```js
// view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// routes
app.get('/', (req, res) => {
  res.render('index', {
    user: req.user
  });
});
```

Agora vamos apagar a home estática (_public/index.html_) e criar a view dinâmica (_src/views/index.ejs_):

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My Money</title>
</head>

<body>
  <h1>My Money</h1>
  <p>
    <% if (user) { %>
      Logado como: <%= user.displayName %> - <a href="/auth/logout">Sair</a>
    <% } else { %>
      <a href="/auth/google">Login</a>
    <% } %>
  </p>
</body>

</html>
```

Veja que adicionamos uma lógica no corpo da página para verificar a existência de `user` para mostrar o nome do usuário e o link "Sair", ou o link "Login" caso não exista.

## Resultado final

O código do projeto até este ponto está em: https://github.com/doug2k1/my-money/tree/v6.0.0

## No próximo capítulo

Na próxima parte vamos começar a implementar o frontend para consumir nossa API GraphQL.

Stay tuned!

## Feedbacks?

E aí, o que está achando até agora? Algo que precisa melhorar?

[]’s

## 🔥 [Pacote Fullstack | 4 Cursos Completos](https://www.webdevdrops.com/pacote-full-stack/wdd)

A **Danki Code** está oferecendo uma formação para **desenvolvedor fullstack** bastente completa, englobando frontend, backend, UX/UI, SEO, etc.   
[**Saiba mais...**](https://www.webdevdrops.com/pacote-full-stack/wdd)