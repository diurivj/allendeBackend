const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const sendInvitation = require('../helpers/signInInvitation').sendInvitation;

//token middleware
//with no Bearer !!
function jwtBliss(req, res, next) {

    // check header or url parameters or post parameters for token
    console.log(req.headers);
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, "bliss", function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  }

router.get('/invitation', (req,res, next)=>{
    const token = req.query.token;
    if(!token) res.redirect('/');
    User.findOne({tokenToActive:token})
    .then(user=>{
        if(!user || user.active) return res.redirect('/');
        res.render('activate', {token, user})
    })
    .catch(e=>next(e));    
})

router.post('/invitation', (req,res,next)=>{
    const token = req.body.token;
    if(token) {
        User.findOne({tokenToActive:token})
        .then(user=>{
            console.log(req.body.password)
            return user.setPassword(req.body.password)
        })
        .then(user=>{
            //console.log(user);
            user.save();
            return User.findByIdAndUpdate(user._id, {active:true}, {new:true})
        })
        .then(user=>res.json(user))
        .catch(e=>next(e));
    }else{
        console.log('error')
        res.redirect('/');
    }
})

router.post('/signup', (req,res,next)=>{
    User.register(req.body, req.body.password)
    .then(user=>{
        sendInvitation(user);
        res.json(user);
    })
    .catch(err=>{
        res.status(400).send(err);
        next(err)
    });
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    const token = jwt.sign({
        sub: req.user._id,
        username: req.user.email
    }, 
    "bliss", 
    //{expiresIn:"3 hours"} //si no lo pones no expira
);
    res.send({access_token: token});
});

const jwtCheck = expressjwt({
    secret: "bliss"
});

router.get('/protected', jwtBliss, (req,res)=>{
    res.send('protected');
});

module.exports = router;