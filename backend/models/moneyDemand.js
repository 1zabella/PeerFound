const mongoose = require('mongoose')

const moneyDemand = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
        },
        userName: {
            type: String,
            required: false,
            trim: true,
        },
        buyerAmount: {
            type: Number,
            trim: true,
            required: false,
        },
        interestRate: {
            type: Number,
            min: 0,
            max: 100,
            required: false,
        },
        investmentTerm: {
            type: Number,
            required: false,
        },
        finalValue: {
            type: Number,
            required: false,
        },
        creditScore: {
            type: Number,
            min: 0,
            max: 5,
            required: false,
        },
        collateralType: {
            type: String,
            required: false,
        },
        collateralValue: {
            type: Number,
            required: false,
        },
        debtOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MoneyOffer",
            required: false,
        },
    },
    { timestamps: true }
)

const indemnity = mongoose.model('MoneyDemand', moneyDemand)

module.exports = indemnity