# Explicações sobre os contratos
## Todo o contrato foi desenvolvido na IDE Remix.
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
    
    O contrato “factory” já foi feito o deploy e ele auxilia na realização de deploy de novos contratos de empréstimo (loan) pelo frontend, visto que ele realiza esse deploy.