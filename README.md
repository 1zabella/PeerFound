# ChallangeBlockchain - Peer Found
<br>

<p align="center">
<img src="https://github.com/1zabella/ChallangeBlockchain/blob/main/imgs/Logo.png" alt="Logo do Grupo" border="0" width="300">
</p>

## Integrantes
- <a href="https://www.linkedin.com/in/patrick-miranda/">Patrick Miranda</a>
- <a href="https://www.linkedin.com/in/pedrocrezende/">Pedro Rezende</a>
- <a href="https://www.linkedin.com/in/izabellaalmeida/">Izabella Almeida</a>
- <a href="https://www.linkedin.com/in/sophia-dias/">Sophia Dias</a>
- <a href="https://www.linkedin.com/in/gustavo-ferreira-oliveira/">Gustavo Ferreira</a>
- <a href="https://www.linkedin.com/in/gabriel-garcia-gomes-do-o/">Gabriel Garcia</a>

<br>

## Descrição do projeto:

Plataforma web que possibilita a concessão de empréstimos peer-to-peer transacionados na rede blockchain utilizando BTG Dol (lastreado em dólar). 

O seller, pessoa que deseja fornecer o empréstimo consegue fornecer dinheiro emprestado a qualquer lugar do mundo, aproveitando as altas taxas de juros dos outros países para conseguir obter taxas de retorno maiores que a renda fixa de seu país. 

Já os buyers, vão poder pegar dinheiro emprestado por taxas menores que em seu país em troca de uma garantia, aproveitando os baixos juros em países muito desenvolvidos para conseguir pagar menos juros em seus empréstimos.

A solução é capaz de fornecer um bom spread em suas transações, aproveitando as altas diferenças das taxas de juros entre países, sendo capaz de criar boa margem de lucro para uma possível entidade financeira que venha a mediar essa relação. Assim, utilizando a stablecoin do BTGDol para fazer essas transações, aumentamos a segurança da transação de empréstimo entre o seller e o buyer, além de eliminar o swift do câmbio, aumentando o uso do BTGDol pela população e aumentando a sua liquidez.

Além de possibilitar essa conexão, a solução também oferece um modelo de classificação dos póssiveis clientes da plataforma. Após um possível buyer solicitar o empréstimo da plataforma, o nosso modelo de I.A, treinado com uma base de mais de 5 milhões de dados, consegue fornecer um feedback das chances de um buyer pagar o émprestimo. Assim evitando mal pagadores da plataforma, garantindo a confiabilidade da plataforma e a segurança do seller na trasação, minimizando a ocorrencia de liquidação das garantias.

## Link do projeto

- <a href="https://taikai.network/inteliblockchain/hackathons/ibchallenge2023/projects/clhb7ypxq48412401zleqv8lmxi/idea">Peer Found</a>
<br>

## Vídeo

- <a href="https://youtu.be/68YA99NYtyo">Vídeo</a>
<br>

## Técnologias utilizadas

<p align="center">
<img src="https://github.com/1zabella/ChallangeBlockchain/blob/main/imgs/Arquitetura.jpeg" alt="Logo do Grupo" border="0" width="500">
</p>

### Remix Ide

Ferramenta para teste do smart contract.

### Solidity

 linguagem utilizada para escrever contratos inteligentes.
 
 ### Ether.js
 
 Biblioteca utilizada para interagir com a blockchain 
 
 ### Node.js
 
 Utilizado para o Backend da solução.
 
 ### MongoDB
 
 Banco de dados não relacional utilizado para armazenar os dados utilzados na solução.
 
 ### React
 
 Utilizado para criação de um Frontend  reponsívo, e parte do Backend do projeto.
 
 ### CSS
 
 linguagem  utilizada para definir a aparência e o layout das páginas web, e garantir a identidade visual do website.
 
 ### MetaMask
 
  Wallet utilizada para armazenamento de tokens de autenticação do úsuario.
 
 ### python, python notebook 
 
 Linguagem, ambiente utilizados para tratamento de dados, treinamento e execução da IA.
 
<br>

## Setup do projeto

### Backend

#### Na pasta raiz Backend, execute o comando abaixo para instalar as dependências do projeto:

``` 
npm i
```

### Front

#### Na pasta raiz Front, execute o comando abaixo para instalar as dependências do projeto:

``` 
npm i
```

## Rodando o projeto

### Entendendo o contrato (estrutura e lógica)
O contrato “loan” foi construído para a realização da transferência das pontas peer-to-peer, ou seja, realiza as funções que dão o empréstimo para pegador e também que devolvem o investimento para o emprestador. Portanto ele é realizado da seguinte maneira:

1. Todos os valores das variáveis a serem preenchidas no deploy de um novo contrato (empréstimo) estão no banco de dados, não requisitando do preenchimento manual do Acessor de Investimentos que irá dar início à transação de empréstimo na rede blockchain;
2. As variáveis utilizadas para deploy são:
    - spread: valor (em BTGDol) que o intermediário da transação recebe após o fim do seu período
    - finalvalue: valor (em BTGDol) que cada buyer irá pagar, ou seja, o valor já calculado do que ele pediu de empréstimo acrescido aos juros
    - buyeramount: valor (em BTGDol) que cada buyer irá receber de empréstimo
    - buyers: lista de endereços de carteiras (Metamask) dos tomadores de crédito
    
    Atenção: as variáveis finalValue, buyerAmount e buyers são listas. As informações de quanto o buyer irá receber de empréstimo e quanto irá pagar ao fim do período, para estarem conectadas à carteira correta, correspondem ao mesmo índice na lista. EX: buyer x está no índice 0, seu buyerAmount e finalValue também devem estar no ínidice 0 (realizamos esse tratamento na hora de instanciar um novo contrato, puxando as informações diretamente do banco de dados).
    
    - contractOwner: endereço de carteira (Metamask) do responsável por instanciar um novo contrato (será utilizado para retirar o spread)
    - seller: endereço de carteira (Metamask) do emprestador de dinheiro
    - amount: todo o valor (em BTGDol) que será emprestado pelo seller
    - amountFinal: todo o valor (em BTGDol) que deverá ser pago para o seller receber de seu investimento (amount acrescido dos juros)
    
    Todo o cálculo de juros é feito no backend e esses valores são armazenados na backend. Optamos por essa saída para realizarmos o mínimo de procedimentos possíveis no contrato e diminuir o custo de gas.
    
    Clicando no botão da “Ativar”, o Acessor de Investimentos pode ativar o smart contract na rede (realizar deploy).
    
    1.  Função getMoney: O seller envia todo o seu investimento: Clicando no botão, o seller irá realizar a transação de transferência de BTGDol para o smart contract.
    2. Função sendLoan: O buyer, clicando no botão “Retirar” pode retirar o valor que requisitou de empréstimo do contrato para a sua carteira
    3. Função payLoan: após o prazo de vigência do empréstimo (e.g.: 1 ano), o buyer deve enviar para o contrato o valor que pediu emprestado acrescido de juros. Clicando no botão “Pagar”, esse valor já estará definido (visto que foi definido para cada buyer no deploy do contrato) e a transação será feita.
    4. Função sendLoanToSeller: quando o valor do contrato for igual ao amountFinal, todo o investimento inicial feito pelo seller acrescido dos juros será enviado para a carteira do seller quando ele clicar no botão “Receber”.
    
    Por fim, há mais uma aplicação do contrato que está comentada, mas pode facilmente ser implementada: para diminuir o risco de inadimplência do buyer, é necessário fazer a sua ativação no contrato, ou seja, após ele enviar um NFT de garantia (e.g.: seu CDB) para o contrato que ele poderá ter acesso à função sendLoan e de fato receber o dinheiro do empréstimo.
    
    O contrato “factory” já foi feito o deploy e ele auxilia na realização de deploy de novos contratos de empréstimo (loan) pelo frontend, visto que ele realiza esse deploy.

### Como usar o contrato?

Para testar as transações do contrato no Remix IDE ([https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js&lang=en](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js&lang=en)), siga os seguintes passos:

1. Na pasta "contracts", copie os códigos de contrato disponíveis em diferentes arquivos (com esses nomes): teste.sol, loan.sol e factory.sol;
2. Na aba de deploy, selecione o environment “Inject Provider - MetaMask”, conectando à sua carteira MetaMask que possua BTGDols;
3. Realize o deploy do contrato BTGDol, inserindo no campo “At Address” o endereço do token BTGDol. (Você pode encontrá-lo acessando a MetaMask → Ativos → BTGUSD → Três pontos do canto superior direito → Token details → Endereço de contrato do token)
4. Realize o deploy do contrato factory
5. Realize o deploy de um contrato loan a partir do factory (preencha as informações necessárias: caso tenha dúvidas, veja o vídeo demo)
6. Veja o endereço desse novo contrato em “viewLoans” do contrato factory, copie ele e coloque na função “approve” do BTGDol junto à quantidade de stablecoins disponíveis para transacionar nesse contrato
7. Após isso é possível transacionar todas as funções listadas na seção anterior

### Abra o terminal na pasta raiz do projeto e execute o comando abaixo para rodar o backend:

``` 
npm run dev
```

deixe esse terminal executando o back-end e abra um novo terminal
!: o backend está feito, mas ainda não está conectado com o frontend e contrato, por questões técnicas

### Abra o terminal na pasta raiz do projeto e execute o comando abaixo para rodar o front-end:

``` 
cd .\frontend\peerfound
npm run dev
```
### Após alguns segundos, o projeto estará rodando em http://localhost:3000/

# Modelo preditivo de classificação

Foi desenvolvido um modelo preditivo de classificação em Python que prevê a chance de inadimplência dos tomadores de crédito brasileiros. Foram utilizadas técnicas de aprendizado de máquina e bibliotecas especializadas para a construção e avaliação do modelo. O modelo pode ser utilizado pela solução para avaliar o risco de crédito de potenciais clientes e tomar decisões sobre empréstimos.

## Organização de arquivos

### IA_hackathon_inteli_blockchain_Tratamento_de_dados

Arquivo responsável pelo tratamento realizado nos dados de treinamento do modelo.

### Treino_do_modelo.ipynb

Arquivo responsável pelo treinamento do modelo e geração de arquivo com modelo já treinado.

### modelo_lr.pkl

Arquivo do modelo já treinado é capaz de gerar uma classificação , representando o potencial do usuário de ser um bom pagador. 

### app.py

Arquivo que demonstra uma possível implementação de uma API que permite a conexão entre a IA e o backend.

##Dados utilizados para o treinamento

### Score do Serasa

O score de crédito é uma pontuação que avalia o perfil de crédito de um indivíduo, levando em consideração seu histórico de pagamentos de dívidas, volume de crédito utilizado e outros fatores relevantes. Essa pontuação é uma das informações utilizadas para treinar o modelo preditivo de classificação que avalia a probabilidade de inadimplência de um tomador de crédito.

### Dinheiro guardado em bancos

Representa o montante de recursos financeiros que uma pessoa possui disponível para movimentação em instituições bancárias.


## Análise do output

O modelo gera uma classificação no intervalo de [1,4] para um possível cliente da solução. Quanto mais próximo de 4, maiores são as chances do indivíduo realizar o pagamento do crédito tomado.



<b>Nota: </b> Os arquivos .env foram subidos no github para facilitar a execução do projeto, porém, em um ambiente de produção, esses arquivos não devem ser subidos para o github, pois contém informações sensíveis.
