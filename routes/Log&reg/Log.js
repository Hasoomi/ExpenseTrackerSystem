const express = require('express');
const router = express();
const mongoose = require('mongoose');
const user = require('../../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='log&Reg';
    next();
});


router.get('/', (req, res)=>{
    res.render('home/login');


});



router.post('/', async(req, res)=>{
    const {email, password} = req.body;
    try {
        const userLog = await user.findOne({email: email});
        if(!userLog) {
            //return console.log('Incorrect Email or Password');
            req.flash("message", "Incorrect Email or password try again");
            res.redirect("/log");

        }
        
        const isMatch = await bcryptjs.compare(password, userLog.password);

        if(!isMatch) {
            
            
            req.flash("message", "Incorrect Email or password try again");
            res.redirect("/log");
        } else {

        req.session.isAuth = true;
        //req.session.userEmail = userLog.email;
        req.session.userId = userLog._id;
        req.session.userEmail = userLog.email;
        
        //req.flash("message", "Welcome");
        res.redirect('/dashborad');
        //res.render("home/dashborad");
        //const accesstoken = jwt.sign({
        //    id: userLog._id,
        //}, process.env.JWT_SEC, {expiresIn: "1d"});

        }
        

        


    }catch(err){
        console.log(err);
    }

});


    module.exports = router;

