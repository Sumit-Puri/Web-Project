const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
//use express router ,this will connect this file to router
app.use('/',require('./routes/index'));

//setting up view engine and providing view file
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running server ${err}`);
    }
    console.log("Server Running");
})