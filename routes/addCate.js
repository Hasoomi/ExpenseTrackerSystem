const express = require('express');
const router = express();
const mongoose = require('mongoose');
const UserCategory = require('../models/Category');
const isAuth = require('./middleware/auth');


// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
        res.render('home/addCategory');
});

router.post('/addCategory',isAuth , async(req, res)=> {
        const  {Category, Type} = req.body;
        const newCate = await UserCategory.create({
            U_ID: req.session.userEmail,
            Category: Category,
            Type: Type
        });
        if(!newCate) {
            console.log("Can't save");
        } else {
            req.flash("message", `${req.body.Category} Category Added`);
            res.redirect('/Category');
        }
});



    module.exports = router;
    