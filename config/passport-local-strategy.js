const passport = require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//telling passport to use the local strategy
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true //in order to use req in callback function
    },
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user||user.password!=password){
                req.flash('error','Wrong Credentials');
                return done(null,false);
            }
            if(user){
                return done(null,user);
            }
        });
    }
));

//serializing the user to decide which key to be saved in cookie
passport.serializeUser(function(user,done){
    //storing encrypted userid in cookie
    done(null,user.id);
});

//deserilizing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user');
                return done(err);
        }
        return done(null,user);
    });
});

//check user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain current signin user , sending user to locals for the views
        res.locals.user=req.user;
    }

    next();
}
module.exports=passport;