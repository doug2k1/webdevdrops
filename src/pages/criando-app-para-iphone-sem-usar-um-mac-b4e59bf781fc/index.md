---
title: "Criando app para iPhone sem usar um Mac"
date: "2011-09-20T07:00:00.000Z"
---
Olá, pessoal!

Neste tutorial eu vou mostrar o processo de desenvolver uma aplicação/game para **iOS** (iPhone, iPod, iPad) e rodá-la no seu aparelho, sem precisar de um **Mac**, usando o [**Marmalade SDK**](http://www.madewithmarmalade.com/).

Muita gente acredita que para desenvolver para **iOS** obrigatoriamente você precisa de **Objective C** e de um **Mac**. Mas existem alternativas. Uma delas é o **Marmalade SDK**.

O **Marmalade** é um SDK para desenvolvimento de aplicações mobile, para **Windows** e **Mac**. As aplicações são desenvolvidas em C++ e rodam em iOS, Android, Symbian, bada e webOS, com nenhuma ou pouca modificação no código.

## 1) O que você precisa

*   **Computador com Windows** (eu uso o Windows 7)
*   **Marmalade SDK**: fiz este tutorial com a versão trial de 90 dias, que é gratuita.
*   **Visual C++:** eu uso o [**Visual C++ 2010 Express**](http://www.microsoft.com/visualstudio/en-us/products/2010-editions/visual-cpp-express), que também é gratuito
*   **iTunes**
*   **Aparelho com iOS**: fiz o tutorial com um **iPod Touch**
*   **Conta de desenvolvedor iOS:** aquela que você paga US$ 99,00 / ano para a Apple.

## 2) Criando a aplicação

Para este tutorial eu vou criar uma aplicação simples, usando o template “**2D Game**” do **Marmalade**:

![](https://cdn-images-1.medium.com/max/800/0*V1EPHsfQhrsorbe6.png)

O código gerado exibe um quadrado que acompanha onde você toca na tela. Vou modificá-lo um pouco, colocando uma imagem de fundo e outra imagem no lugar do quadrado. O código modificado pode ser encontrado [neste repositório do GitHub](https://github.com/doug2k1/marmalade_win_tutorial).

Antes de mais nada, teste a aplicação no Windows para garantir que está compilando e rodando. NoVisual C++ escolha a configuração **(x86) Debug** e dê um **Start (F5)**.

![](https://cdn-images-1.medium.com/max/800/0*14yu6mt6uBqd2PFM.png)

O resultado é o seguinte:

![](https://cdn-images-1.medium.com/max/800/0*GQR96HZjq-Z1m2gp.jpg)

## 3) Instalando os certificados

Esta etapa é a mais complexa do processo, mas precisa ser feita apenas uma vez. Aqui nós vamos instalar os certificados que vão permitir ao **Marmalade** relacionar os aplicativos gerados com a sua conta de desenvolvedor na **Apple**.

Visite [http://developer.apple.com/membercenter](http://developer.apple.com/membercenter) e faça o login na sua conta de desenvolvedor e clique em **“iOS Provisioning Portal”**.

![](https://cdn-images-1.medium.com/max/800/0*X8goTK_gCr1mWuc1.png)

Enquanto isso execute a ferramenta **“iPhone Signing Request Tool”** _(Iniciar > Programas > Marmalade > 5.1 > Tools > Marmalade iPhone Signing Request_). Esta ferramenta vai gerar um arquivo **.csr** que vai ser usado no site da Apple. O primeiro campo é onde o arquivo resultante será salvo, o segundo fica “developer\_identity.key”, o terceiro e quarto campos devem ser preenchidos com seu nome (primeiro e último) e email exatamente como estão cadastrados na Apple.

![](https://cdn-images-1.medium.com/max/800/0*Kjn5LfySChvS7vpv.png)

Clique em “**Run**”.

Com o arquivo .csr gerado, volte ao “**iOS Provisioning Portal**” e clique em “**Certificates**”. Clique no botão “**Request Certificate**”.

![](https://cdn-images-1.medium.com/max/800/0*DnEE97kA_S82Jk5z.png)

No campo “**Selecionar arquivo**” (ou **Browse**) escolha o arquivo .csr que foi gerado e clique em “**Submit**”.

De volta à tela “**Certificates**” clique no link **“\*If you do not have the WWDR intermediate certificate installed, click here to download now.**” para baixar o arquivo “**AppleWWDRCA.cer**”.

![](https://cdn-images-1.medium.com/max/800/0*DBthAar9oxnpR6hv.png)

Salve o arquivo na pasta “_C:\\Marmalade\\5.1\\s3e\\deploy\\plugins\\iphone\\certificates_” (ou a pasta equivalente na sua instalação do **Marmalade**).

Mais uma vez, na tela “**Certificates**”, clique no botão “**Download**” ao lado do seu nome. (Se aparece seu nome, mas não o botão de download, atualize a página que o botão aparece.)

![](https://cdn-images-1.medium.com/max/800/0*568tcHFp7yjISAWL.png)

Você vai baixar o arquivo “**developer\_identity.cer**”. Salve-o também na pasta “_C:\\Marmalade\\5.1\\s3e\\deploy\\plugins\\iphone\\certificates_”

## 4) Registrando seu aparelho

Para poder rodar a aplicação no seu iPod/iPhone é preciso registrá-lo na sua conta de desenvolvedor.

De volta ao “**iOS Provisioning Portal**” clique em “**Devices**” e depois no botão “**Add Devices**”.

![](https://cdn-images-1.medium.com/max/800/0*lXD4OWYU_dS7CTJC.png)

Na próxima tela você vai precisar informar um nome para identificar o aparelho e o seu “Device ID”. Você pode descobrir este ID no **iTunes**, estando com seu aparelho conectado. Na tela abaixo, clique em “**Número de Série**”. Ele vai mudar para “**Identific. (UDID)**”. Aperte Ctrl+C para copiar o ID.

![](https://cdn-images-1.medium.com/max/800/0*L0lubWmx4EobNdDb.png)

Preencha os dois campos e clique em “**Submit**”.

## 5) App ID e Provisioning

Estamos quase lá! Mais um passo para poder rodar nosso app no aparelho.

No “**iOS Provisioning Portal**” clique agora em “**App IDs**” e depois no botão “**New App ID**”.

![](https://cdn-images-1.medium.com/max/800/0*f5At37VN9aenc-6_.png)

Preencha os campos. Em “**Description**” coloque uma descrição de sua preferência e em “**Bundle Identifier**” crie um identificador para seu app. Se quiser usar o mesmo App ID para mais de um app, você pode terminar esse identificador com um \* (asterisco), como eu fiz no exemplo:

![](https://cdn-images-1.medium.com/max/800/0*Tpj6Swz9QRhuI5pR.png)

Clique em “**Submit**”.

Agora clique em “**Provisioning**” e depois, “**New Profile**”. Preencha um nome para o perfil, e nos outros campos escolha o certficado, o App ID, e o dispositivo que configuramos nos passos anteriores, como na imagem:

![](https://cdn-images-1.medium.com/max/800/0*QsA9t2eCxUiTDZ6P.png)

Clique em “**Submit**”.

De volta na tela que lista os perfis, clique no botão “**Download**” em frente ao perfil que acabou de criar.

**Nota:** Se o botão não aparece e o status está como “**Pending**”, atualize a página até que o status fique como “**Active**”.

![](https://cdn-images-1.medium.com/max/800/0*TdhG1KdAe4TlEVWK.png)

Você vai baixar um arquivo** .mobileprovision**. Abra o **iTunes** e vá em _Arquivo > Adicionar Arquivo à Biblioteca…_ Escolha o arquivo** .mobileprovision** que você baixou e clique “**Abrir**”. Parece que nada aconteceu, mas acredite, este passo é necessário.

Feche o **iTunes** e o execute novamente.

## 6) Instalando nosso game

Após todo esse trâmite, agora é só alegria. Vamos rodar nosso game no aparelho.

Abra novamente o projeto no **Visual C++** e escolha a configuração “**GCC (ARM) Release**” e clique em **Start (F5)**.

![](https://cdn-images-1.medium.com/max/800/0*XRCsnSamyxi452tJ.png)

Após a compilação o próprio **Visual C++** vai executar o “**Marmalade System Deployment Tool**”. Na primeira tela escolha “**ARM GCC Release**” e clique “**Next** >”

![](https://cdn-images-1.medium.com/max/800/0*l5IZv1FJ3Wdqo3RV.png)

Na tela seguinte não precisa mudar nada. Clique “**Next** >”.

Na tela “**Choose Platform(s)…**” escolha “**iOS (iPhone, iPad, iPod)**”. Clique “**Next** >”.

![](https://cdn-images-1.medium.com/max/800/0*3LUYHVWmTqSEq613.png)

Nas duas telas seguintes você entra com dados do aplicativo. Para testes pode deixar as duas como estão.

Na última tela (foto abaixo) eu geralmente escolho “**Package and Install**”, pois assim ele gera o arquivo **IPA** e já instala no **iTunes**.

![](https://cdn-images-1.medium.com/max/800/0*dBqT3Gn9uy71Won7.png)

Clique em “**Deploy All**”. Se tudo deu certo ele vai abrir o **iTunes** com seu jogo já instalado lá em “**Aplicativos**”.

Se o **iTunes** não abriu, você pode navegar na pasta do seu projeto, e ir em “_\\build\_meu jogo 2d\_vc10\\deployments\\default\\iphone\\release_” e dar um duplo-clique no arquivo “**algumacoisa.ipa**”.

![](https://cdn-images-1.medium.com/max/800/0*HmPeJNzsRfa2A4rj.png)

Agora basta sincronizar o seu **iPod**/**iPhone** e o aplicativo será instalado no aparelho.

![](https://cdn-images-1.medium.com/max/800/0*pd300bXKKgIteeqx.jpg)

**OBS.:** Deixei o ícone padrão do Marmalade, mas obviamente ele pode ser alterado.

![](https://cdn-images-1.medium.com/max/800/0*melYkzF8ZB_abq9D.jpg)

Com isso concluimos o tutorial. Vale lembrar que a parte mais burocrática (passos 3, 4 e 5) é feita apenas uma vez. Depois é só ir desenvolvendo, testando no simulador e atualizando no aparelho.

Qualquer dúvida, comente! :-)

Lembrando que sou novo nesse mundo de desenvolvimento para iOS, então se fiz algo errado, me corrijam.

## Recomendação de Cursos

[**Desenvolvimento de Aplicativos iOS11 em Swift4 | app iPhone**  
_Então você achou o curso certo. Nesse curso eu ensino, sem enrolação e com experiência de mercado comprovada, como…_click.linksynergy.com](https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fcrie-aplicativos-para-iphone-e-ipad-com-ios11-e-swift4%2F "https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fcrie-aplicativos-para-iphone-e-ipad-com-ios11-e-swift4%2F")[](https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fcrie-aplicativos-para-iphone-e-ipad-com-ios11-e-swift4%2F)

[**Curso Básico de Aplicativos para iOS  em Swift**  
_Aprenda Xcode e Swift! Transforme suas idéias em apps para iPhone e iPad, para distribuir na maior loja de app do mundo…_click.linksynergy.com](https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Ffelpudoiosapps%2F "https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Ffelpudoiosapps%2F")[](https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Ffelpudoiosapps%2F)

## Links

*   Marmalade SDK — Site oficial (em inglês): [http://www.madewithmarmalade.com](http://www.madewithmarmalade.com/)
*   Visual C++ 2010 Express: [http://www.microsoft.com/visualstudio/en-us/products/2010-editions/visual-cpp-express](http://www.microsoft.com/visualstudio/en-us/products/2010-editions/visual-cpp-express)
*   Página de desenvolvedor da Apple: [http://developer.apple.com/membercenter/](http://developer.apple.com/membercenter/)
*   Código exemplo no GitHub: [https://github.com/doug2k1/marmalade\_win\_tutorial](https://github.com/doug2k1/marmalade_win_tutorial)