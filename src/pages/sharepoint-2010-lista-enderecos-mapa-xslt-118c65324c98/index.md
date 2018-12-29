---
title: "SharePoint 2010: Exibindo lista de endereços em forma de mapa"
date: "2011-06-30T07:00:00.000Z"
---
Em um [post anterior](http://blog.dmatoso.com/2011/06/exibindo-conteudo-xml-no-sharepoint-2010/) eu mostrei um exemplo de exibição em uma página no **SharePoint 2010** do conteúdo de um **XML externo**, formatado usando **XSLT**.

Agora mostro outro exemplo semelhante, mas desta vez, ao invés de um XML externo eu quero exibir o conteúdo de uma **lista do SharePoint**.

Para mostrar como a customização é flexível, vou pegar uma **lista de endereços** e exibi-los em um mapa do **Google Maps**.

## A Lista

![](https://cdn-images-1.medium.com/max/800/0*LHeFujuk_ZPPXVAA.png)

Lista “Addresses” com nome, endereço, telefone e site

## Exibindo em uma página

Adicionamos a web part de lista em uma página (_Lists and Libraries >> Addresses_). Por padrão a lista é exibida na forma de tabela:

![](https://cdn-images-1.medium.com/max/800/0*kab6RgnVXw7KDTjn.png)

Lista na página, sem formatação

## Formatando a exibição com XSLT

Primeiro criamos um arquivo .xslt com o seguinte conteúdo:

<?xml version='1.0' encoding="utf-8" ?>  
<xsl:stylesheet version="1.0"  
xmlns:xsl="[http://www.w3.org/1999/XSL/Transform](http://www.w3.org/1999/XSL/Transform)">  
  <xsl:output method="html" />  
  <xsl:template match="dsQueryResponse/Rows">  
    <style type="text/css">  
      #map\_canvas { width:600px; height:500px; }  
    </style>  
    <script type="text/javascript"  
      src="[http://maps.google.com/maps/api/js?sensor=false](http://maps.google.com/maps/api/js?sensor=false)"></script>  
    <script type="text/javascript">  
      var geocoder;  
      var map;  
      function addPoint(title, address, phone, link) {  
        geocoder.geocode( { 'address': address}, function(results, status) {  
          if (status == google.maps.GeocoderStatus.OK) {  
            map.setCenter(results\[0\].geometry.location);  
            var marker = new google.maps.Marker({  
              map: map,  
              position: results\[0\].geometry.location,  
              title: title  
  	        });  
            var contentString = '<p><strong>' + title + '</strong></p>'+  
            '<p>Tel.: ' + phone + '</p>'+  
            '<p><a href="' + link + '">' + link + '</a></p>';  
            var infowindow = new google.maps.InfoWindow({  
              content: contentString  
            });  
            google.maps.event.addListener(marker, 'click', function() {  
              infowindow.open(map,marker);  
            });  
          }  
        });  
      }  
      function initialize() {  
        geocoder = new google.maps.Geocoder();  
        var myOptions = {  
          zoom: 13,  
          mapTypeId: google.maps.MapTypeId.ROADMAP  
        };  
        map = new google.maps.Map(document.getElementById("map\_canvas"),  
          myOptions);  
        <xsl:apply-templates select="Row" />  
      }  
    </script>  
    <div id="map\_canvas"></div>  
    <script type="text/javascript">initialize();</script>  
  </xsl:template>  
  <xsl:template match="Row">  
    addPoint('<xsl:value-of select="@Title" />',  
      '<xsl:value-of select="@Address" />',  
      '<xsl:value-of select="@Phone" />',  
      '<xsl:value-of select="@Website" />');  
  </xsl:template>  
</xsl:stylesheet>

Salvamos o arquivo em uma biblioteca no SharePoint e o usamos para customizar a nossa web part. Nas propriedades da web part informe o caminho do arquivo XSLT (em _Miscellaneous >> XSL Link_):

![](https://cdn-images-1.medium.com/max/800/0*tNk_uLsjRP0Iw2Qp.png)

Propriedades da web part

Com isso a nossa lista de endereços que aparecia como uma tabela, agora aparece assim:

![](https://cdn-images-1.medium.com/max/800/0*v4J8lhmvdUyb_2ze.png)

Mapa com os endereços marcados e demais informações exibidas nos balõezinhos

## Entendendo o arquivo XSLT

Vou explicar as partes mais importantes do arquivo.

`<xsl:template match="dsQueryResponse/Rows">`

Aqui entra o código que vai aparecer apenas uma vez no nosso HTML resultante. Nesta parte eu defino algumas funções JavaScript. A **_initialize_**, que cria o mapa e seta algumas opções, e a **_addPoint_**, que vamos usar para adicionar cada um dos pontos no mapa.

Note que dentro desta área nós chamamos:

`<xsl:apply-templates select="Row" />`

Que é onde vai ser inserido o código que repete para cada item da lista (código que definimos mais abaixo).

<xsl:template match=”Row”> addPoint(‘<xsl:value-of select=”@Title” />’, ‘<xsl:value-of select=”@Address” />’, ‘<xsl:value-of select=”@Phone” />’, ‘<xsl:value-of select=”@Website” />’); </xsl:template>

Este é o código que casa com “Row”, que é cada um dos itens da lista. Aqui apenas chamamos a função **_addPoint_**, passando os valores de cada coluna para o item em questão, usando **xsl:value-of**.

Perceba que o XML da lista se assemelha com isto:

<dsQueryResponse> <Rows> <Row Title=”…” Address=”…” Phone=”…” Website=”…” … /> <Row Title=”…” Address=”…” Phone=”…” Website=”…” … /> <Row Title=”…” Address=”…” Phone=”…” Website=”…” … /> </Rows> </dsQueryResponse>

Na verdade ele traz muito mais que isso, como você pode conferir da [documentação no MSDN](http://msdn.microsoft.com/en-us/library/ff754324.aspx), mas esta parte é o que interessa no nosso caso.

## Conclusão

Mais uma vez vimos que usando web parts OOTB e XSLT dá para customizar muita coisa no SharePoint, sem muito esforço.

Qualquer observação, sugestão, poste um comentário.

Abrass!

## Atualização — 29/07:

**Uma dica:** Para listar quais são os valores de cada item disponíveis para você manipular, basta colocar o seguinte código dentro do template <xsl:template match=”Row”>:

<xsl:for-each select=”@\*”> <xsl:value-of select=”name()” />: <xsl:value-of select=”.” /> <br /> </xsl:for-each>

**Outra dica:** Se você modificar a estrutura da lista (adicionar ou remover colunas) é preciso remover a web part da página e adicioná-la novamente, para que ela perceba que a lista mudou. (Legal hein, Sharepoint!)