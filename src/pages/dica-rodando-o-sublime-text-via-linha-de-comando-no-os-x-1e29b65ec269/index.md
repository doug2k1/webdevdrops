---
title: "Dica: Rodando o Sublime Text via linha de comando no OS X"
date: "2014-03-24T07:00:00.000Z"
---
Eae, pessoal!

Para quem curte linha de comando (quem não curte, né?), segue uma maneira rápida de executar o [**Sublime Text**](http://www.sublimetext.com/).

Basta executar no terminal (as linhas abaixo são um comando só):

    ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl

Pode ser que você tenha que trocar “**Sublime\\ Text.app**” por “**Sublime\\ Text\\ 2.app**” ou “**Sublime\\ Text\\ 3.app**” de acordo com sua instalação (verifique na pasta _Applications_ o nome correto do app).

Com isso você pode rodar

`subl arquivo.ext`

para abrir um arquivo específico, ou navegar até uma pasta e rodar

`subl .`

para abrir a pasta inteira como um projeto no Sublime.

\[\]’s