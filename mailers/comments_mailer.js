const nodeMailer = require('../config/nodemailer');

//arrow function

exports.newComment = (comment,user) => {
    let htmlString = nodeMailer.renderTemplate({comment : comment , user: user }, '/comments/new_comment.ejs');


    nodeMailer.transporter.sendMail({
        from: '190108035@hbtu.ac.in',
        to : user.email,
        subject : "New Comment published",
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in mailing comment',err);
            return;
        }
        console.log('Message Sent',info);
        return ;
    })
}