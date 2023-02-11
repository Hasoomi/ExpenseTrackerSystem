const mongoose = require('mongoose');
// Map global promises
mongoose.Promise = global.Promise;

// Mango DB connection
mongoose.connect('mongodb://localhost/pusherPoll')
.then(()=> {
    console.log('DB connected');
})
.catch((err) => {
    console.log(err);
}) 

