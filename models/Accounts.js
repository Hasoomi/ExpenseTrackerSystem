const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userAcc = new Schema({
    U_ID: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    Desc: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    Date: {
        type: Date,
        default: Date.now 
    }
});

//Create collection and add schema
const usersAccounts = mongoose.model('Acc', userAcc);

module.exports = usersAccounts;