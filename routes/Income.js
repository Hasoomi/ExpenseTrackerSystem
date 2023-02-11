const express = require('express');
const router = express();
const mongoose = require('mongoose');
const userAcc = require('../models/Accounts');
const userIncome = require('../models/Income');
const isAuth = require('./middleware/auth');

// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
        
        const UserIncomeInfo = await userIncome.find({U_ID: req.session.userEmail}).sort({"Date": -1}).lean();
    if(!UserIncomeInfo) conosle.log('cant found data');
    else {
        res.render('home/income', {UserIncomeInfo: UserIncomeInfo});
        
    }
});



    module.exports = router;
    