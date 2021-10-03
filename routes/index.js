const express=require('express');

const router = express.Router();
const Controller=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',Controller.home);

//this will connect all /user url to user routes
router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

module.exports=router;