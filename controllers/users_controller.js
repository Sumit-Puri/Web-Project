const User=require('../models/user');
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "user-profile"
    });
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
    return res.redirect('/');
}

//signout
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}