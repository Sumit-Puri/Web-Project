const express=require('express');
const router = express.Router();

const user_Controller = require('../controllers/users_controller');
const passport=require('passport');
router.get('/profile/:id',passport.checkAuthentication,user_Controller.profile);
router.post('/update/:id',passport.checkAuthentication,user_Controller.update);
router.get('/signup',user_Controller.signUp);
router.get('/signin',user_Controller.signIn);
router.post('/create',user_Controller.create);
//use passport as a middleware
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/signin'}),user_Controller.createSession);
router.get('/signout',user_Controller.destroySession);
module.exports= router;
