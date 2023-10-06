# Rinha de Frontend

Este é o repositório da Rinha de Frontend. Esta é uma brincadeira e um desafio de código inspirada pela _"Rinha de Backend"_, uma iniciativa criada por Francisco Franceschi.

O desafio consiste em montar um sistema Frontend com a stack que você quiser, e estressá-lo de acordo com as especificações abaixo, simplesmente pra ver o que acontece. Quem tirar a melhor performance nos critérios aqui estabelecidos, vence.

## O Desafio

Criar uma **"JSON Tree Viewer"**: Um visualizador de JSON que roda _sem backend_, e que seja capaz de carregar um JSON especificado pelo usuário e exibi-lo.

O sistema deve focar em ser capaz de exibir o maior JSON possível. O "usuário" poderá carregar o arquivo JSON que quiser, e ser capaz de visualizá-lo em forma de árvore conforme o layout: [VER O LAYOUT NO FIGMA](https://www.figma.com/file/DHYB13ESevMMip2Nx8skjf/Rinha-de-Front-end).

Vamos disponibilizar uma pasta no Drive com os arquivos de testes. Há alguns bem pequenos, outros enormes para a proposta. O layout diz respeito apenas ao output estático, e não versará sobre o comportamento de navegação do JSON que você carregar. Portanto, você é livre pra aplicar o comportamento e técnica que achar melhor para a navegação da sua tree view: paginação, infinite scrolling, lazy loading, vdom, windowing... E é aqui que começa a rinha: sua aplicação deve buscar carregar o maior arquivo possível dessa pasta. Boa sorte!

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FDHYB13ESevMMip2Nx8skjf%2FRinha-de-Front-end%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DeRPBFABCToFB5EE9-1" allowfullscreen></iframe>

## Especificações

Você não precisa cumprir todos os critérios para entregar a sua aplicação. Faça o seu melhor, aprenda e divirta-se. Abaixo então os critérios de acordo com o peso de cada um.

1. **Correctness**: Esse é o critério principal e o único que é requisito de exclusão: A aplicação deve funcionar. Um JSON deve poder ser carregado e exibido conforme demonstrado no Layout (não necessarimanete precisa ser o maior JSON, mas ao menos alguns deles). `PESO: 50`.

2. **Performance**: Sua aplicação deve buscar o maior nível de fluidez, quanto mais rápida e robusta, melhor pra você. Aplicações com performance instável (as vezes quebra, as vezes vai, as vezes trava) não terão os pontos desse critério. `PESO: 25`.

3. **Acessibilidade**: Sua aplicação deverá ser o mais acessível que você puder (ideal que esteja completamente acessível). Deve ser possível navegar na sua tree view de maneira acessivel. `PESO: 25`.

Os critérios serão avaliados de acordo com uma regra de tudo ou nada: ou tem ou não tem. Se tiver, o peso do critério será somado ao score. Se não tiver, 0 será somado ao score.

### Análise

Para as análises utilizaremos:

- Performance: Time to Next Interaction (basicamente a velocidade da sua aplicação)
- Core Web Vitals
- Lighthouse Results
- Accessibility Checks

## Stack

Você tem liberdade para escolher qualquer **stack**, **lib** ou **framework**. Contudo, sua aplicação deve ser totalmente executada no lado do cliente (Client) em termos de arquitetura web, sem depender de processamento server-side.

Além disso, sua aplicação deve ser original e não pode ser uma cópia de outra nem usar libs que solucionem completamente o desafio proposto.

## Arquivos de Teste

Sua aplicação deve ser capaz de rodar o máximo possível de arquivos de teste na pasta disponibilizada, carregando 1 por vez. Os arquivos disponíveis são:

- alltypes.json
- verysmall.json
- small.json
- pokedex.json
- startwitharray.json
- large.json
- giant.json
- invalid.json
- nullreference.json

## Submeter seu projeto

Siga o passo-a-passo da plataforma para submeter o seu projeto.

1. Cadastre-se e clique em "Participar".
2. Faça um fork do repositório base e desenvolva a sua solução nele.
3. Faça o deploy do seu projeto via Github Pages ou qualquer outro serviço de host de sua escolha.
4. Submeta o projeto na plataforma respondendo o formulário de submissão.

Pronto! Boa sorte, e que vença o melhor!

## Prazo

Aceitaremos submissões até o dia 10/11/2023 às 23:59

## Dúvidas, ajuda e sugestões

Para dúvidas, pedidos de ajuda ou sugestões, abra uma ISSUE nesse repositório prefixada por `[DÚVIDA]`, `[AJUDA]` ou `[SUGESTÃO]`.
