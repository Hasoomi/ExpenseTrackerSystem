const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expense = new Schema({
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
const userExpenses = mongoose.model('Expense', Expense );

module.exports = userExpenses;