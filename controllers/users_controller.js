const User=require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        if(user){
        let x=false;
        for(u of user.friendships)
           {
               if(u==req.user.id)
               {
                   x=true;
                   break;
               }
           }
        return res.render('user_profile',{
            title: "user-profile",
            profile_user: user,
            fstatus:x
        });}
    });
    
};
module.exports.update = async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error','UnAuthorized');
    //     return res.status(401).send('UnAuthorised');
    // }

    if(req.user.id==req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    //check if db have the link and that link have the file associated with it
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                    }
                    user.avatar = User.avatarpath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
             // console.log('Error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','UnAuthorized');
        return res.status(401).send('UnAuthorised');
    }

};
module.exports.signUp=function(req,res){
    //if already signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup',{
        title:'Social|Signup'
    });
};
module.exports.signIn=function(req,res){
    //if already signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin',{
        title:'Social|Signin'
    })
}
//getting signup data 
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err)
        {
            console.log('error in fining user'); 
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('error in finding user');
                    return;
                }
                return res.redirect('/users/signin');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })
}
//getting signin form data
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully!');
    return res.redirect('/');
}

//signout
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','Logged Out Successfully!');
    return res.redirect('/');
}