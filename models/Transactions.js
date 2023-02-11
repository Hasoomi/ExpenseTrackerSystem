const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransSchema = new Schema({
    Type: {
        type: String,
        required: true,

    },
    Account: {
        type: String,
        required: true
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
    },
    U_ID: {
        type: String 
    }
});

const userTrans = mongoose.model('Transaction', TransSchema);
module.exports = userTrans;