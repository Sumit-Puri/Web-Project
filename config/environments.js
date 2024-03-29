const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'something',
    db : 'major1',
    smtp :{
        service: 'gmail',
        host : 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user: 'purisumit2001@gmail.com',
            pass: '****'
        }
    },
    google_client_id: process.env.major1_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.major1_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.major1_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.major1_JWT_SECRET,
    morgan : {
        mode: 'dev',
        options: {stream:accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path : process.env.major1_ASSET_PATH,
    session_cookie_key :process.env.major1_SESSION_COOKIE_KEY,
    db :  process.env.major1_DB,
    smtp :{
        service: 'gmail',
        host : 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user: process.env.major1_GMAIL_USERNAME,
            pass: process.env.major1_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.major1_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.major1_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.major1_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.major1_JWT_SECRET,
    morgan : {
        mode: 'combined',
        options: {stream:accessLogStream}
    }

}

module.exports = eval(process.env.major1_ENVIRONMENT) == undefined ? development : eval(process.env.major1_ENVIRONMENT);
