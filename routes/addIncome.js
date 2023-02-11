const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Userincome = require('../models/Income');
const UserAccount = require('../models/Accounts');
const UserTrans = require('../models/Transactions');
const UserCategorySch = require('../models/Category');
const { find } = require('../models/Income');
const isAuth = require('./middleware/auth');



// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
    try {
        const findAcc = await UserAccount.find({U_ID: req.session.userEmail}).lean();
        const findCate = await UserCategorySch.find({U_ID: req.session.userEmail, Type: 'Income'}).lean();
        
            res.render('home/addIncome', {myAccounts: findAcc 
            ,myCategorys: findCate}
            );
    } catch(err) {
        console.log(err);
    }
    
        
});

router.post('/addinc', isAuth, async(req, res)=> {
    const {ID, Account, Category, Desc}= req.body;
    var Amount = parseInt(req.body.Amount);
    try {
        const findUser = await UserAccount.findOne({U_ID: req.session.userEmail, name: Account});
        if(!findUser) console.log('cant found user');
        else {
            findUser.balance += Amount;
            findUser.save((err, result)=> {
                if(err) console.log(err);
                else {
                const newIncome = Userincome.create({
                    U_ID: req.session.userEmail,
                    Account: Account,
                    Amount: Amount,
                    balance: findUser.balance,
                    Category: Category,
                    Desc: Desc
                });
                console.log(newIncome);

                if(!newIncome) console.log('cant save income');
                else {
                    
                    const newTrans = UserTrans.create({
                        TransID: newIncome._id,
                        Type: 'Income',
                        Account: Account,
                        Amount: Amount,
                        balance: findUser.balance,
                        Category: Category,
                        Desc: Desc,
                        U_ID: req.session.userEmail
                    });
                    if(!newTrans) { 
                        console.log('cant save transactions') 
                    }
                    else { 
                        req.flash("message", `${req.body.Amount} Income has added to ${req.body.Account} Account`);
                        res.redirect('/income')
                    
                    }
                }
                
                }
                
            });
            //console.log('User has been founded');
        }
    }catch(err){
        console.log(err)
    }
});


    module.exports = router;
    