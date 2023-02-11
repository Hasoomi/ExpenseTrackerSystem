const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userCategory = new Schema({
    U_ID: {
        type: String,
        required: true

    },
    Category: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    }
});

//Create collection and add schema
const usersCategory = mongoose.model('Category', userCategory);

module.exports = usersCategory;