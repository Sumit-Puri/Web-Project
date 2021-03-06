const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content:req.body.content,
            user: req.user._id
        });
        //check if req is an Ajax xml_http_req
        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    post:post,
                    user:req.user.name
                },
                message: "Post Created!"
            });
        }
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


         //delete the associated likes for the post and all its comments' likes too
         await Like.deleteMany({likeable: post, onModel: 'Post'});
         await Like.deleteMany({_id: {$in: post.comments}});
        post.remove();
        await Comment.deleteMany({post:req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.params.id
                },
                message: "Post deleted!"
            })
        }
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