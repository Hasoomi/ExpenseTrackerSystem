const express = require('express');
const router = express();
const mongoose = require('mongoose');
const userAcc = require('../models/Accounts');
const isAuth = require('./middleware/auth');



// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
    try{
        
       const Accounts = await userAcc.find({U_ID: req.session.userEmail}).sort({"Date": -1}).lean();
        if(!Accounts) {
            console.log('cant found records')
        } else {
            res.render('home/Accounts', {Accounts: Accounts});
            
        }
       
    }catch(err){
        console.log(err)
    }
});

router.get('/add', (req, res)=>{
    
    res.render('home/addAccount');
    //res.sendFile(__dirname + "../" + "sb-admin.css");
    
});

router.get('/edit', (req, res)=>{
    res.render('home/editAccount');
});

    module.exports = router;
    