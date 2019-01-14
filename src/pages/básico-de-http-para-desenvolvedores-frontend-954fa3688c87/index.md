---
title: "Básico de HTTP para desenvolvedores frontend"
date: "2017-09-01T02:52:11.776Z"
---
> [Read in English](../http-primer-for-frontend-developers-f091a2070637)

**HTTP** — Hypertext Transfer Protocol — é como cliente e servidor (frontend e backend) conversam entre si. Como desenvolvedores frontend (e desenvolvedores web em geral) nós deveríamos entender pelo menos o básico desta comunicação, pois uma importante parte do nosso trabalho é enviar requisições para o servidor e tratar as respostas.

## Requisição e resposta

Basicamente, a forma como esta comunicação funciona é através da troca de mensagens. O cliente envia uma requisição e o servidor envia de volta uma resposta.

![](/1_lqeEhjYQMv4k_vhbYT6eTQ.png)

Cliente e servidor conversando entre si.

## Anatomia de uma requisição

Uma requisição HTTP é composta das seguintes partes:

![](/1_qbTgoN5Qx7epTNY6cUvNDg.png)

Partes de uma requisição HTTP.

### Método

Também referido como verbo, indica o tipo de ação a ser executada: pegar uma informação (GET), enviar informação para o servidor (POST), etc. Os mais comuns são:

*   **GET**  
     Requisitar informações do servidor. Ex: uma página, um arquivo de imagem.
*   **POST**  
     Enviar informações para o servidor. Ex: dados de um formulário de cadastro.
*   **PUT**  
     Enviar informações para substituir um recurso existente.
*   **PATCH**  
     Enviar informações para alterar partes de um recurso.
*   **DELETE**  
     Apagar um recurso específico do servidor.

### URI

Uniform Resource Identifier — é o caminho no servidor que identifica uma informação (o recurso a ser buscado, criado, modificado).

### Cabeçalho

Informações adicionais sobre a requisição e sobre o cliente, na forma de pares de chave-valor.

### Corpo

Opcional. É o conteúdo que o cliente envia para o servidor. Normalmente requisições GET e DELETE não precisam. Em requisições POST, PUT e PATCH é aqui que vai a informação a ser criada ou modificada.

## Anatomia de uma resposta

Uma resposta HTTP é composta das seguintes partes:

![](/1_BrUEYdcNRbdqE3drkN5WoQ.png)

Partes de uma resposta HTTP.

### Status

Indica, através de um código numérico, se a requisição foi atendida com sucesso. Eles são agrupados em cinco classes, identificadas pelo primeiro dígito. Alguns dos status mais usados são:

*   **1xx — Informação**
*   **2xx — Sucesso**  
    **200 OK**: A requisição foi atendida com sucesso.
*   **3xx — Redireção**  
    **301 Moved Permanently**: O recurso mudou permanentemente para uma nova URI. A nova URI deve ser retornada na resposta.  
    **302 Found**: O recurso mudou temporariamente de URI.
*   **4xx — Erro do cliente**  
    **400 Bad Request**: A requisição está mal formada e não pode ser entendida pelo servidor.  
    **403 Forbidden**: Usuário não autorizado a fazer a operação requisitada.  
    **404 Not Found**: O recurso requisitado não pode ser encontrado na URI informada.  
    **405 Method Not Allowed**: O método utilizado na requisição não é permitido no recurso especificado.
*   **5xx — Erro do servidor**  
    **500 Internal Server Error**: O servidor encontrou uma condição inesperada que o impede de executar a requisição.  
    **503 Service Unavailable**: O servidor está temporariamente indisponível, normalmente devido a sobrecarga ou manutenção.

Para uma lista mais completa:  
[https://pt.wikipedia.org/wiki/Lista\_de\_c%C3%B3digos\_de\_estado\_HTTP](https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_estado_HTTP)

### Cabeçalho

Como no cabeçalho da requisição, contém informações adicionais sobre o servidor e sobre a resposta.

### Corpo

Opcional. Este é o conteúdo retornado pelo servidor.

---

## Exemplos práticos: requisições HTTP com JavaScript

**Exemplo #1**: Pegar (GET) informações sobre o último release da biblioteca React no GitHub

```js

// requisição:
// não é preciso informar o método (GET é o padrão), 
//   nem cabeçalho ou corpo (requisição GET não precisa de corpo)
fetch('https://api.github.com/repos/facebook/react/releases/latest') // URI
  .then(response => {
    // recebemos a resposta e logamos o status
    console.log(response.status)
    // retorna o corpo da resposta em formato JSON
    return response.json()
  })
  .then(json => {
    // loga o JSON
    console.log(json)
  })

// em caso de sucesso vai logar:
// 200
// { ... conteúdo do corpo da resposta em formato JSON ... }
```

**Exemplo #2**: Postar (POST) um novo endereço de e-mail para associá-lo a minha conta do GitHub

```js

// requisição:
// adicionar um novo endereço de e-mail à minha conta do GitHub
fetch('https://api.github.com/user/emails', { // URI
  method: 'POST', // método
  body: JSON.stringify(["octocat@github.com"]) // corpo
})
  .then(response => {
    // recebemos a resposta e logamos o status
    console.log(response.status)
    // retorna o corpo em formato JSON
    return response.json()
  })
  .then(json => {
    // loga o JSON
    console.log(json)
  })

// em caso de sucesso vai logar:
// 201
// { ... conteúdo do corpo da resposta como JSON ... }
```

**Exemplo #3**: Tratar uma requisição com falha (status diferente de 2xx)

```js

// requisição:
// tenta fazer um GET em URI inexistente
fetch('https://api.github.com/nonexistent-uri')
  .then(response => {
    if (response.ok) {
      // não deve entrar aqui
      console.log('success')
    } else {
      console.log(response.status)
    }
  })

// vai logar:
// 404
```

## Links

[https://developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)  
 [https://pt.wikipedia.org/wiki/Hypertext\_Transfer\_Protocol](https://pt.wikipedia.org/wiki/Hypertext_Transfer_Protocol)  
 [https://www.tutorialspoint.com/http/index.htm](https://www.tutorialspoint.com/http/index.htm)  
 [https://developer.mozilla.org/en/docs/Web/API/Fetch\_API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

Feedback? Sugestões?

\[\]’s