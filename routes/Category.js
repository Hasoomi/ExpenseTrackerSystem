const express = require('express');
const router = express();
const mongoose = require('mongoose');
const categorySchema = require('../models/Category');
const isAuth = require('./middleware/auth');





// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
    const UserCategorys = await categorySchema.find({U_ID: req.session.userEmail}).sort({"Category": -1}).lean();
    if(!UserCategorys) conosle.log('cant found data');
    else {
        res.render('home/Category', {UserCategorys: UserCategorys});
        
    }

        
});



    module.exports = router;
    