const express = require('express');
const router = express();
const mongoose = require('mongoose');
const UserExpenses = require('../models/Expense');
const UserAccounts = require('../models/Accounts');
const UserTrans = require('../models/Transactions');
const UserCategory = require('../models/Category');
const isAuth = require('./middleware/auth');


// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});

// 



router.get('/', isAuth, async(req, res)=>{
    const findAcc = await UserAccounts.find({U_ID: req.session.userEmail}).lean();
    const findCate = await UserCategory.find({U_ID: req.session.userEmail, Type: 'Expense'}).lean();
        res.render('home/addExpenses', {myAccounts: findAcc, myCategory: findCate});

});

router.post('/addExp', isAuth, async(req, res)=> {
    const {Account, Amount, Category, Desc}= req.body;
    try {
        const find = await UserAccounts.findOne({U_ID: req.session.userEmail, name: Account });
        if(!find) {
            console.log("Can't found Account");
            res.end;
        } else {
            if(find.balance < Amount) {
                console.log('Insufficient balance')
            } else {
                find.balance -= Amount;
                find.save((err, result)=> {
                    if(err) console.log(err);
                    else {
                    const saveExp = UserExpenses.create({
                            U_ID: req.session.userEmail,
                            Account: Account, 
                            Amount: Amount,
                            balance: find.balance, 
                            Category: Category,
                            Desc: Desc
                        });
                        if(!saveExp) console.log('cant save Expenses');
                        else {
                            //console.log('Successfully saved Expense');
                            const newTrans = UserTrans.create({
                                Type: 'Expense',
                                Account: Account,
                                Amount: Amount,
                                balance: find.balance,
                                Category: Category,
                                Desc: Desc,
                                U_ID: req.session.userEmail
                            });
                            if(!newTrans) {
                                console.log('cant save transactions');
                            } 
                            
                            else {
                                req.flash("message", `You make ${req.body.Amount} Expenes ${req.body.Account} Account`);
                                res.redirect('/Expenses');
                            }
                        }
                    }
                })
            }


            /*check.balance += Amount;
            check.save((err, result)=> {
                if(err) console.log(err);
            });
            const DepositInfo = await Userincome.create({
                U_ID: ID, 
                Account: name,
                Amount: Amount,
                Category: Category,
                Desc: Desc
            }); 
            */
            
            
        }
    } catch(err) {
        console.log(err);
    } 
});


    module.exports = router;
    