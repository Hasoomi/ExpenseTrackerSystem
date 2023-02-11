const express = require('express');
const router = express();
const mongoose = require('mongoose');
const userAccount = require('../models/Accounts');
const userExp = require('../models/Expense');
const isAuth = require('./middleware/auth');





// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
    console.log(req.session.userId);
    const UserExpenses = await userExp.find({U_ID: req.session.userEmail }).sort({"Date": -1}).lean();
    if(!UserExpenses) conosle.log('cant found data');
    else {
        res.render('home/Expenses', {UserExpenses: UserExpenses});
        
    }

        
});



    module.exports = router;
    