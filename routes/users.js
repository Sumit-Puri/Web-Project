const express=require('express');

const router = express.Router();
const user_Controller = require('../controllers/users_controller');

router.get('/profile',user_Controller.profile);
module.exports= router;
