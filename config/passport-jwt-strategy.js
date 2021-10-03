const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),//header is a key of authorization who have a key called bearer token
    secretOrKey : 'Social',
};

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err)
        {
            console.log('error in finding user fromm jwt',err);
            return ;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));


module.exports = passport;