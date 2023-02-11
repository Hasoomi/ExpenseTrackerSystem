const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Income = new Schema({
    U_ID: {
        type: String,
        required: true,

    },
    Account: {
        type: String,
        required: true,

    },
    Amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number
    },
    Category: {
        type: String,
        required: true,
    },
    Desc: {
        type: String,
    },
    Date: {
        type: Date,
        default: Date.now 
    }
});

//Create collection and add schema
const userIncome = mongoose.model('Income', Income);

module.exports = userIncome;