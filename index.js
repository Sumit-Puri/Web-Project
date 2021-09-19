const express=require('express');
const app=express();
const port=8000;

//use express router ,this will connect this file to router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running server ${err}`);
    }
    console.log("Server Running");
})