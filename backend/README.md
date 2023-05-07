Visando diminuir o custo de gas do projeto e sua escalabilidade, foi implantado um backend que está organizado da seguinte maneira:

|--> backend<br>
  &emsp;| --> database <br>
    &emsp;| BTGDOL.json<br>
    &emsp;| factory.json<br>
    &emsp;| loan.json<br>
  &emsp;| --> database <br>
    &emsp;| mongoose.js<br>
  &emsp;| --> ethers <br>
    &emsp;| index.js<br>
  &emsp;|--> middleware<br>
    &emsp;| auth.js<br>
  &emsp;|--> models<br>
    &emsp;| moneyDemand.js<br>
    &emsp;| moneyOffer.js<br>
    &emsp;| user.js<br>
  &emsp;|--> routes<br>
    &emsp;| blockchainchallenge.js<br>
    &emsp;| user.js<br>
  &emsp;| .env <br>
  &emsp;| index.js <br>