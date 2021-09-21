const express=require('express');

const router = express.Router();
const user_Controller = require('../controllers/users_controller');

router.get('/profile',user_Controller.profile);
router.get('/signup',user_Controller.signUp);
router.get('/signin',user_Controller.signIn);
router.post('/create',user_Controller.create);
module.exports= router;
