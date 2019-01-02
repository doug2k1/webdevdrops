---
title: "Exibindo conteúdo de um XML no SharePoint 2010"
date: "2011-06-30T23:00:00.000Z"
---
E aí, pessoal?

Neste tutorial vou mostrar como exibir o conteúdo de um XML em uma página do SharePoint, usando a web part **_XML Viewer_** e customizando a exibição com [XSLT](http://www.w3schools.com/xsl/).

Estou usando o **SharePoint Foundation 2010** (hospedado gratuitamente, conforme a dica que dei [neste outro post](http://blog.dmatoso.com/2011/06/hospedagem-gratuita-de-sharepoint-2010/)) e como exemplo vou exibir os últimos posts deste blog (usando o feed RSS).

## Adicionando a web part XML Viewer

Na página onde o conteúdo vai ser exibido, clique em **_Site Actions » Edit Page_**.

![](/0_hbeApdFTFHKAKoTx.png)

Clique em **_Add a Web Part_** (ou **_Insert » Web Part_** no topo) e escolha a web part **_XML Viewer_** (está na categoria **_Content Rollup_**). Clique em **_Add_**.

![](/0_Ehi3Q9niSGXfAGY_.png)

## Configurando a web part

Clique no link **_open the tool pane_**, ou no menu dropdown da web part clique em **_Edit Web Part_**.

No painel de opções da web part você pode digitar o XML que vai usar, ou colocar o link pra ele (pode ser um XML externo ou que esteja na própria aplicação). No nosso caso vamos usar o RSS do blog: [http://blog.dmatoso.com/feed/](http://blog.dmatoso.com/feed/)

![](/0_rcso9B0I6w3E0y5q.png)

Coloque o link e clique em **_Apply_**. A web part vai mostrar todo o texto do XML, sem formatação. No good.

![](/0_e2sz-EE8jSoxgzgz.png)

## Customizando a formatação com XSLT

Nas opções da web part você pode informar um XSL (seja digitando diretamente clicando em **_XSL Editor…_** ou informando um link para um arquivo XSL) que será usado para transformar o XML em HTML e deixar bonitinho no browser.

Para o nosso exemplo vamos usar o XSLT abaixo:

```xml
<?xml version='1.0' encoding="utf-8" ?>  
<xsl:stylesheet version="1.0" xmlns:xsl="[http://www.w3.org/1999/XSL/Transform](http://www.w3.org/1999/XSL/Transform)">  
  <xsl:output method="html" />  
 <xsl:template match="rss/channel">  
    <ul>  
      <xsl:apply-templates select="item" />  
    </ul>  
  </xsl:template>  
 <xsl:template match="item">  
    <li>  
      <p>  
        <a href="{link}">  
          <xsl:value-of select="title" />  
        </a>  
      </p>  
      <p>  
        <xsl:value-of select="description" disable-output-escaping="yes"/>  
      </p>  
    </li>  
  </xsl:template>  
</xsl:stylesheet>
```

Digite este conteúdo no **_XSL Editor…_** (ou salve um arquivo .xslt e informe o link). Veja o resultado:

![](/0_NUUVfdn8s_CCUnZE.png)

Much better!

## Explicando o XSLT

Como pode notar, o XSL é também um XML.

**xsl:stylesheet** é a raiz do documento.

**xsl:output** diz qual vai ser o resultado da transformação (no nosso caso, um HTML).

**xsl:template** informa regras que serão aplicadas quando um nó do XML casa com o seletor do atributo **_match_**. No nosso exemplo, o primeiro template, que casa com “rss/channel” simplesmente abre e fecha a lista (`<ul>…</ul>`), e dentro dela aplica outro template (que casa com “item”). Como um feed possui vários nós “item”, este template será aplicado várias vezes, gerando os ítens da lista (`<li>…</li>`).

Mais abaixo, no template que casa com “item”, usamos a tag **xsl:value-of** para inserir valores do XML no HTML resultante, como o título do post e a descrição (resumo).

## Conclusão

A web part **_XML Viewer_** torna bem fácil a tarefa de trazer conteúdos externos para uma página do SharePoint, e o XSLT dá total liberdade para formatar esse conteúdo como quiser. Vale lembrar que o SharePoint permite usar XSLT para formatar outros conteúdos, como uma web part que traz ítens de uma lista, então vale a pena aprender como esse formato funciona.

\[\]’s