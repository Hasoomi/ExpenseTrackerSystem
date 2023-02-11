const session = require('express-session');
const DBconnection = require('../../config/myDB');
const MongoDBSession = require('connect-mongodb-session')(session);

const store = new MongoDBSession({
    uri: DBconnection,
    collection: 'mySessions'
});

module.exports = store;