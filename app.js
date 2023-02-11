const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// DB Connection

// Session and authencation
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBSession = require('connect-mongodb-session')(session);
const isAuth= require('./routes/middleware/auth');
const store = require('./routes/middleware/store');
const cors = require('cors');

// handlebars
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
//const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// All routes
const log = require('./routes/Log&reg/Log');
const Reg = require('./routes/Log&reg/Reg');
const users = require('./models/Users');
const Acc = require('./routes/Accounts');
const addAcc = require('./routes/addAcc');
const income = require('./routes/Income');
const addIncome = require('./routes/addIncome');
const Exp = require('./routes/Expense');
const addExp = require('./routes/addExp');
const Trans = require('./routes/Transactions');
const logout = require('./routes/Log&reg/logout');
const dashborad = require('./routes/dashborad');
const category = require('./routes/Category');
const mytest = require('./models/test');
const aadCate = require('./routes/addCate');

 


// DB config
//require('./config/Db');





//set public folder
app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', engine({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// Body parser midderware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'key that will sing cookie',
    resave: false,
    saveUninitialized: false,
    store : store
}));
app.use(flash());

// Express message middleware 
app.use((req, res, next)=> {

    res.locals.message = req.flash('message');
    next();

});

//app.get('*', checkUser);


//Enable cors
app.use(cors());
app.use('/log', log);
app.use('/Reg', Reg);
app.use('/Accounts', Acc);
app.use('/addAccount', addAcc);
app.use('/income', income);
app.use('/addIncome', addIncome);
app.use('/Expenses', Exp);
app.use('/addExpenses', addExp);
app.use('/Transactions', Trans);
app.use('/logout', logout);
app.use('/dashborad', dashborad);
app.use('/Category', category);
app.use('/addCategory', aadCate);


app.get("/", (req, res)=> {
    res.redirect("/reg");
});



const port= 3300;

app.listen(port, () => console.log(`Server is a start ${port} localhost:3300/reg`));


