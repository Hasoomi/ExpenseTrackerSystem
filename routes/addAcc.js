const express = require('express');
const router = express();
const mongoose = require('mongoose');
const userAcc = require('../models/Accounts');
const isAuth = require('./middleware/auth');

router.get('/', isAuth, async(req, res)=> {
    
    res.render('home/AddAccount');
});

router.post('/addAccount', isAuth, async(req, res)=>{
        const {name, Desc} = req.body;
        try{
            console.log(req.session.userEamil);
            const newUser = await userAcc.create({
                 U_ID: req.session.userEmail,
                 name: name,
                 Desc: Desc
            });
            
            if(newUser) {
                req.flash("message", `${req.body.name} Account added`);
                res.redirect('/Accounts');
            } else {
                console.log('cant be inserted');
            }
            
        }catch(err) {
            console.log(err);
        }
    
    });


module.exports = router;