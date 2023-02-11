const jwt = require('jsonwebtoken');
//const {log, token} = require('../Log&reg/Log');
const isAuth = (req, res, next) =>{
    if(req.session.isAuth) {
       next();
       console.log(req.session.userId);
    //console.log('is working');
    }
    else {
        res.redirect('/log');
        //console.log('is not working');
    }
}


/*
const checkUser = async (req, res, next) => {
    const token = req.session.userEmail;
    if(token) {
        let user = await userMOdel.findOne({email: req.session.email});
        res.locals.user = user;
        next();
        console.log(req.session.email);
        //console.log(user);
    } else {
        console.log('there is an error');
        next();
        
        }
} 
*/

//const verifyToken = (token, process.env.JWT_SEC, (req, res, next) => {
//        if(token) console.log(token);
//        else console.log(err);
//});


module.exports= isAuth;