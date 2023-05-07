const mongoose = require('mongoose')

const moneyOfferSchema = new mongoose.Schema(
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
        spread: {
            type: Number,
            trim: true,
            required: false,
        },
        amount: {
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
        amountFinal: {
            type: Number,
            trim: true,
            required: false,
        },
        seller: {
            type: String,
            require: false
        },
        buyerAmount: {
            type: Number,
            trim: true,
            require: false
        },
        finalValue: {
            type: Number,
            trim: true,
            require: false
        },
        isActive: {
            type: Boolean,
            require: true,
            default: false,
        },
        moneyDemands: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "MoneyDemand",
            require: false
        }],
        invites:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }]
    },
    { timestamps: true }
)

moneyOfferSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'moneyOffer'
})

moneyOfferSchema.set('toObject', { virtuals: true });
moneyOfferSchema.set('toJSON', { virtuals: true });

const MoneyOffer = mongoose.model('MoneyOffer', moneyOfferSchema)

module.exports = MoneyOffer