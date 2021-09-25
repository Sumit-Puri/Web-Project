const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for sesssion cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);


//to extract styles and scripts in layout from subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//setting up view engine and providing view file
app.set('view engine','ejs');
app.set('views','./views');

//session cookie
//mongo store is use to store session cookie in db
app.use(session({
    //name of cookie
    name:'major1',
    secret: 'something',//key to encrypt data
    saveUninitialized:false,//when user not logged do i want to save uninitialized data
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongoUrl: db._connectionString,  
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router ,this will connect this file to router
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running server ${err}`);
    }
    console.log("Server Running");
})