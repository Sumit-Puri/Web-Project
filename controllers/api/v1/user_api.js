const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environments');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message: 'Invalid Username or password'
            });
        }
        return res.json(200,{
            message : 'Sign in Successfully',
            data :{
                token : jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: '100000'})//genrating token
            }
        });
    }catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}