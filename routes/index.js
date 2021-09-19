const express=require('express');

const router = express.Router();
const Controller=require('../controllers/home_controller');
console.log('router loaded');
router.get('/',Controller.home);

module.exports=router;