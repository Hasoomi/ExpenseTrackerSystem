const express = require('express');
const router = express();
const mongoose = require('mongoose');
const userTrans = require('../models/Transactions');
const isAuth = require('./middleware/auth');



// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 

router.get('/', isAuth, async(req, res)=> {
    const userTransactions = await userTrans.find({U_ID: req.session.userEmail}).sort({"Date": -1}).lean();
    if(!userTransactions) {
        res.render('home/Transactions');
        console.log('cant found Data');

    } else {
        res.render('home/Transactions',{userTransactions: userTransactions});
        console.log('Every going Ok');
    }
});

module.exports = router;