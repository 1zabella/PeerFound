// importar bibliotecas
const express = require('express')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const MoneyOffer = require('../models/moneyOffer')
const MoneyDemand = require('../models/moneyDemand')
const router = express.Router()
const User = require('../models/user')


//ROTA PARA CRIAR OFERTA DE DINHEIRO
router.post('/createMoneyOffer', async (req, res) => {
    try {
        const usersThatDontHaveLoan = await User.find({
            moneyOffer: { $exists: false },
        })

        const invites = []
        for (let i = 0; i < usersThatDontHaveLoan.length; i++) {
            if (usersThatDontHaveLoan[i]) {
                invites.push(usersThatDontHaveLoan[i]._id)
            }
        }
        // Cria uma nova instância do modelo de Indemnity com os dados do corpo da requisição
        const moneyOffer = new MoneyOffer({ ...req.body })
        
        // Salva a nova instância de Indemnity no banco de dados
        await moneyOffer.save()
        // Retorna um status 200 (OK) após salvar com sucesso
        res.status(200).send()

    } catch (err) {
        console.log(err)
        // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
        res.status(500).send(err)
    }
})

//ROTA PARA CRIAR DEMANDA DE DINHEIRO
router.post('/createMoneyDemand', async (req, res) => {
    try {
        console.log(req.body)
        // Cria uma nova instância do modelo de Indemnity com os dados do corpo da requisição
        const moneyDemand = new MoneyDemand({ ...req.body })
        const moneyOffer = new MoneyOffer({ ...req.body, isActive: false })

        // Salva a nova instância de Indemnity no banco de dados
        await moneyOffer.save()
        await moneyDemand.save()

        // Retorna um status 200 (OK) após salvar com sucesso
        res.send()
    } catch (err) {
        console.log(err)
        // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
        res.status(500).send(err)
    }
})

//ROTA PARA VISUALIZAR AS OFERTAS DE DINHEIRO
router.get('/moneyOffers', /*adminMiddleware,*/ async (req, res) => {
    try {
        // Busca todos os documentos de Money Offer no banco de dados
        const moneyOffers = await MoneyOffer.find({})
        for (let i = 0; i < moneyOffers.length; i++) {
            await moneyOffers[i].populate('user')
        }

        // Retorna os documentos encontrados no formato JSON
        res.json(moneyOffers)
    } catch (err) {
        // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
        res.status(500).send(err)
    }
})

//ROTA PARA VISUALIZAR UMA OFERTA DE DINHEIRO
router.get('/moneyOffer/:id', async (req, res) => {
    try {
        // Busca o documento de Indemnity correspondente ao ID fornecido
        const moneyOffers = await MoneyOffer.findOne({ _id: req.params.id })
        await moneyOffers.populate('user')

        // Retorna o documento encontrado
        res.send(indemnity)
    } catch (err) {
        // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
        res.status(500).send(err)
    }
})

//ROTA PARA ATIVAR UMA OFERTA DE DINHEIRO
router.get('/activateMoneyOffer/:id', async (req, res) => {
    try {
        // Busca o documento de Indemnity correspondente ao ID fornecido
        const moneyOffer = await MoneyOffer.findOne({ _id: req.params.id })
        if (moneyOffer.isActive) {
            return res.status(500).send('Oferta já ativa!')
        }

        await moneyOffer.populate('users')

        const moneyDemandUserWallets = []
        const moneyDemandUserBuyerAmount = []
        const moneyDemandFinalValue = []

        for (let i = 0; i < MoneyOffer.users.length; i++) {
            moneyDemandUserWallets .push(MoneyOffer.users[i].wallet)
            moneyDemandUserBuyerAmount .push(MoneyOffer.users[i].buyerAmount)
            moneyDemandFinalValue.push(MoneyOffer.users[i].finalValue)
        }

        // Crie uma nova instância do contrato Loan na blockchain usando a factory
        const factory = await factory()
        const tx = await factory.createLoan(
            moneyOffer.spread,
            moneyDemandFinalValue,
            moneyOfferBuyerAmount,
            moneyDemandUserWallets, 
            moneyOffer.contractOwner,
            moneyOffer.seller,
            moneyOffer.amountFinal,
            moneyOffer.amount
        )
        await tx.wait()

        const loanAddresses = await factory.viewLoans()
        moneyOffer.address = loanAddresses[loanAddresses.length - 1]
        moneyOffer.isActive = true
        moneyOffer.invites = []
        await moneyOffer.save()

        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
})

// ROTA PARA ACEITAR UM EMPRÉSTIMO
router.patch('/user/invite', authMiddleware, async (req, res) => {
    try {
        // Se o usuário já está participando de um empréstimo, retorne um erro
        if (req.user.moneyOffer) {
            return res.status(500).send('Esse usuário já participa de um empréstimo')
        }

        // Buscar o empréstimo no banco de dados pelo ID
        const moneyOffer = await MoneyOffer.findOne({ _id: req.body.moneyOffer })
        if (moneyOffer.isActive) {
            return res.status(500).send('Empréstimo já ativo!')
        }

        // Popular o empréstimo com os usuários relacionados
        await moneyOffer.populate('users')

        // Se o empréstimo não for encontrado, retorne um erro
        if (!moneyOffer) {
            return res.status(500).send('Empréstimo não encontrado')
        }

        // Se o empréstimo não tiver convites, retorne um erro
        if (!moneyOffer.invites) {
            return res.status(500).send('Esse empréstimo não possui convites')
        }

        // Verificar se o usuário tem um convite válido para o empréstimo
        let exists = false
        for (let i = 0; i < moneyOffers.invites.length; i++) {
            if (moneyOffer.invites[i].equals(req.user._id)) {
                exists = true
            }
        }

        // Atualizar o usuário com a informação do empréstimo aceito
        req.user.moneyOffer = req.body.moneyOffer
        await req.user.save()

        // Enviar o usuário atualizado como resposta
        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//Ver todos os empréstimos
router.get('/contracts', async (req, res) => {
    try {
        // Criar uma instância da fábrica de seguros
        const factory = await factory()

        // Visualizar os empréstimos disponíveis
        const tx = await factory.viewLoans()

        // Enviar os empréstimos encontrados como resposta
        res.send(tx)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router
