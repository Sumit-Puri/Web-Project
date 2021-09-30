const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user: req.user._id
        });
        req.flash('success','Post Created');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        //console.log('Error',err);
        return;
    }
};
//deleting post
module.exports.destroy =async function(req,res){
     try{
    let post = await Post.findById(req.params.id);
    //.id convert object id into string
    if(post.user ==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        req.flash('success','Post deleted');
        return res.redirect('back');
        
    }else{
            req.flash('error','Not Authorised');
            return res.redirect('back');
        }}
        catch(err){
            req.flash('error',err);
           // console.log('Error',err);
        return res.redirect('back');
        }
};