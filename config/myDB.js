const mongoose = require('mongoose');
// Map global promises
mongoose.Promise = global.Promise;
const MongoDBUrl = 'mongodb://localhost/ETS';
// Mango DB connection
mongoose.connect(MongoDBUrl)
.then(()=> {
    console.log('DB connected');
})
.catch((err) => {
    console.log(err);
}) 

module.exports = MongoDBUrl;

