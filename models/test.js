const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const test = new Schema({
    name: {
        type: String,
        required: true
    }
});

//Create collection and add schema
const testschema = mongoose.model('test', test);

module.exports = testschema;