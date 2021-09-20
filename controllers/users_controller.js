module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "user-profile"
    });
};

module.exports.signUp=function(req,res){
    return res.render('user_signup',{
        title:'Social|Signup'
    });
};
module.exports.signIn=function(req,res){
    return res.render('user_signin',{
        title:'Social|Signin'
    })
}
//getting signup data 
module.exports.create = function(req,res){
    //getting form data
}
//getting signin form data
module.exports.createSession = function(req,res){

}
