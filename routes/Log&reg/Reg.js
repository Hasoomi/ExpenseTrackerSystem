const express = require('express');
const router = express();
const mongoose = require('mongoose');
const user = require('../../models/Users');
const bcryptjs = require('bcryptjs');
const genetor = require('../../helpers/numGenetor.js');
const CategorySch = require('../../models/Category');





// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='log&Reg';
    next();
});

// 
function encrypt(password) {
    bcryptjs.genSalt(10, (err, salt)=> {
        bcryptjs.hash(password, salt, (err, hash)=> {
            
                password = hash;
           
        });
    });
}


router.get('/', async(req, res)=>{
    res.render('home/register');
});

router.get('/add', (req, res)=>{
    res.render('home/addAccount');

});

router.post('/', async(req, res)=>{
    const {name, username, password, email, phone } = req.body;
    try{

        const checkUser = await user.findOne({email});
        if(checkUser) {
            return console.log('This Email is allready exist');
        }

        const hashedPass = await bcryptjs.hash(password, 12);

        const newUser = await user.create({
            ID: genetor,
             name: name,
             username: username,
             password: hashedPass,
             email: email,
             phone: phone
        });

        if(newUser) {
            console.log("Registration successfully");
            
            
            const docs = [
                //Expnes categorys
                { U_ID: email, Category: 'Baby', Type: 'Expense'},
                { U_ID: email, Category: 'Bills', Type: 'Expense'},
                { U_ID: email, Category: 'Car', Type: 'Expense'},
                { U_ID: email, Category: 'Clothes', Type: 'Expense'},
                { U_ID: email, Category: 'Communications', Type: 'Expense'},
                { U_ID: email, Category: 'Eating', Type: 'Expense'},
                { U_ID: email, Category: 'Education', Type: 'Expense'},
                { U_ID: email, Category: 'Entertainment', Type: 'Expense'},
                { U_ID: email, Category: 'Food', Type: 'Expense'},
                { U_ID: email, Category: 'Gifts', Type: 'Expense'},
                { U_ID: email, Category: 'Health', Type: 'Expense'},
                { U_ID: email, Category: 'House', Type: 'Expense'},
                { U_ID: email, Category: 'Sports', Type: 'Expense'},
                { U_ID: email, Category: 'Taxi', Type: 'Expense'},
                { U_ID: email, Category: 'Transport', Type: 'Expense'},
                { U_ID: email, Category: 'Shopping', Type: 'Expense'},
                { U_ID: email, Category: 'Insurance', Type: 'Expense'},
                
                //Income categorys
                { U_ID: email, Category: 'Awards', Type: 'Income'},
                { U_ID: email, Category: 'Lottery', Type: 'Income'},
                { U_ID: email, Category: 'Sale', Type: 'Income'},
                { U_ID: email, Category: 'Salary', Type: 'Income'},
                { U_ID: email, Category: 'Rental', Type: 'Income'},
                { U_ID: email, Category: 'Saving', Type: 'Income'},
            ];

            const options = { ordered: true };


            const result = await CategorySch.insertMany(docs, options);
            console.log(`${result.insertedCount} documents were inserted`);

            req.flash("message", "You have successfully registed use your Email and password to login");
            //res.redirect('/dashborad');
            res.redirect("/log");

        } else {
            console.log('cant be inserted');
        }
        
    }catch(err) {
        console.log(err);
    }

});

router.get('/', (req, res)=>{
    res.render('log&Reg/register');

});

    module.exports = router;
    