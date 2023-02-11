const express = require('express');
const router = express();

// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='log&Reg';
    next();
});

router.get('/', (req, res)=> {
    req.session.destroy((err)=> {
        if(err) {
            console.log(err);
        }
        let message = "Logout successfully";
        res.render('home/login', {message: message});
    })

        
});

module.exports = router;