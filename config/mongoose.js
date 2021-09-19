const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/major1');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to db'));

db.once('open',function(){
    console.log('connected to db');
});

module.exports=db;