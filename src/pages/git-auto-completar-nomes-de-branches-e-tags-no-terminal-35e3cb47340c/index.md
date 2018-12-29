---
title: "Git: Auto completar nomes de branches e tags no terminal"
date: "2013-06-04T07:00:00.000Z"
---
E aí, pessoal! Belez?

Dica rápida: se você quer mudar de branch no **Git**, mas tem preguiça (_programador bom é programador preguiçoso_) de digitar o nome completo da branch, ex:

`git checkout nova_feature_que_estou_trabalhando`

Saiba que o próprio codigo-fonte do **Git** já fornece um arquivo de “completação”, que você pode baixar [aqui do Github](https://raw.github.com/git/git/master/contrib/completion/git-completion.bash). Basta salvar o arquivo em algum lugar, como **~/.git-completion** e adicionar o seguinte ao seu **.bash\_rc**:

`source ~/.git-completion`

Reinicie o terminal e agora basta digitar algo como:

`git checkout nova<tab>`

Que ele completa o nome da branch.

## Preguiça Level 2

Claro que, como bom preguiçoso, você não digita **git checkout**, mas sim **git co**, pois você criou alguns alias no seu arquivo **~/.gitconfig**, certo?

\[alias\]  
  st = status  
  ci = commit  
  br = branch  
  co = checkout  
  df = diff  
  lg = log -p

Abrass!