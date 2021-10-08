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
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash =require('connect-flash');
const customMware= require('./config/middleware');
const passprtGoogle = require('./config/passport-google-oauth2-strategy');


const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chatserver is listening on port 5000');

app.use(sassMiddleware({
    src:'./assets/scss',//where to take sass files
    dest: './assets/css',//where to give css compiled files
    debug:true,
    outputStyle:'expanded',//how css file should look
    prefix:'/css'
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/uploads',express.static(__dirname + '/uploads'));//make the uploads path available to browser


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

//it uses session cookie so it should be set after setting session
app.use(flash());
app.use(customMware.setflash);
//use express router ,this will connect this file to router
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running server ${err}`);
    }
    console.log("Server Running");
})