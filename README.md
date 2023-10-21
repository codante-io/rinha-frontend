# [Rinha de Front-end](https://codante.io/rinha-frontend)

This is the landing page for BrGaming

# Getting Started

🔗 [Link para participar](https://codante.io/rinha-frontend)

## O Desafio

# Build and Test

run `npm run build` to build the project

# Contribute

Recommended: use the extension "HTML CSS Support" with "bootstrap 5 quick snippets"

Use this configuration on your Vscode Settings:
`"css.styleSheets": [`
`"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"`
`]`

Em linhas simples, o objetivo final da Rinha de Frontend é carregar, de forma correta, o maior número de arquivos JSON possível (dos 9 arquivos disponibilizados por nós [aqui nesta pasta](https://drive.google.com/drive/folders/1oO0AoBQukdF3_DxRYn1di7O4Iiqom1wJ)). A ideia é começar do mais fácil ao mais complicado. O menor arquivo JSON possui apenas 98 _bytes_, enquanto o maior arquivo possui _181 megabytes_

### Colocação Final dos Projetos

No momento em que você submeter seu projeto, você deverá também nos dizer qual foi o maior arquivo que a sua aplicação conseguiu carregar corretamente. Nós vamos fazer o _ranking_ de acordo com os projetos que carregaram os maiores arquivos.

Dessa forma, se apenas 1 projeto conseguiu carregar o maior arquivo (`giant.json`), esse projeto será o vencedor. Isso irá acontecer sequencialmente até que tenhamos os 10 primeiros colocados rankeados.

Caso, ao final, existam mais de um projeto que conseguiram carregar os mesmos arquivos, vamos então para os critérios de desempate.

### Critérios de Desempate

1. **Correctness**: Esse é o critério principal: A aplicação deve funcionar. Um JSON deve poder ser carregado e exibido conforme demonstrado no Layout (não necessariamente precisa ser o maior JSON, mas ao menos alguns deles). Além disso, aqui também vamos analisar como sua aplicação se comporta no caso de JSONs inválidos.

2. **Performance**: Sua aplicação deve buscar o maior nível de fluidez, quanto mais rápida e robusta, melhor pra você. Aplicações com performance instável (as vezes quebra, as vezes vai, as vezes trava) não terão os pontos desse critério. Vamos testar de forma manual a performance utilizando os mesmos recursos para os diferentes projetos.

3. **Acessibilidade**: Sua aplicação deverá ser o mais acessível que você puder (ideal que esteja completamente acessível). Deve ser possível navegar na sua _tree view_ de maneira acessível.

De acordo com esses três itens acima, iremos realizar os desempates até que consigamos as 10 primeiras colocações. Para todas as outras colocações não iremos realizar desempates.

### Análise

Para as análises utilizaremos:

- Performance: Time to Next Interaction (basicamente a velocidade da sua aplicação)
- Core Web Vitals
- Lighthouse Results
- Accessibility Checks
- Outras métricas a serem consideradas futuramente pela organização

### Casos Não Previstos

Caso haja alguma situação imprevista, o time organizador se reserva o direito de decidir, caso a caso os casos não previstos, sem possibilidade de recurso (lembrando que o objetivo principal da rinha é ser um jogo 😄).

## Stack

Você tem liberdade para escolher qualquer **stack**, **lib** ou **framework**. Contudo, sua aplicação deve ser totalmente executada no lado do cliente (Client) em termos de arquitetura web, sem depender de processamento server-side.

Além disso, sua aplicação deve ser original e não pode ser uma cópia de outra nem usar libs que solucionem completamente o desafio proposto.

## Arquivos de Teste

[Download dos arquivos de teste](https://drive.google.com/drive/folders/1oO0AoBQukdF3_DxRYn1di7O4Iiqom1wJ)

Sua aplicação deve ser capaz de rodar o máximo possível de arquivos de teste na pasta disponibilizada, carregando 1 por vez. Os arquivos disponíveis são:

- verysmall.json - 98 bytes
- alltypes.json - 804 bytes
- small.json - 1 KB
- invalid.json - 1 KB
- nullreference.json - 21 KB
- pokedex.json - 281 KB
- startwitharray.json - 1,6 MB
- large.json - 24,9 MB
- giant.json - 181 MB

## Submeter seu projeto

Siga o passo-a-passo da plataforma para submeter o seu projeto.

1. Cadastre-se e clique em "Participar".
2. Faça um fork do repositório base e desenvolva a sua solução nele.
3. Faça o deploy do seu projeto via Github Pages ou qualquer outro serviço de host de sua escolha.
4. Submeta o projeto na plataforma respondendo o formulário de submissão.

Pronto! Boa sorte, e que vença o melhor!

## Prazo

Aceitaremos submissões até o dia 31/10/2023 às 23:59

## Premiação

As 5 melhores soluções serão premiadas com um gift card da Kabum. 1º lugar: R$ 200,00; 2º lugar: R$ 150,00; 3º lugar: R$ 100,00; 4º lugar: R$ 50,00; 5º lugar: R$ 50,00.

## Dúvidas, ajuda e sugestões

Para dúvidas, pedidos de ajuda ou sugestões, abra uma ISSUE nesse repositório prefixada por `[DÚVIDA]`, `[AJUDA]` ou `[SUGESTÃO]`.
