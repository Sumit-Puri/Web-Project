const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try {
        // route - like/toggle/?id=abcefi&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if type is already liked or not

        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel  : req.query.type,
            user: req.user._id
        });
        //if like already exist
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel : req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message : "Request Successful",
            data:{
                deleted : deleted
            }
        })

    } catch (err) {
        console.log('error in likes',err);
        return res.json(500,{
            message : 'Internal Server Error'
        })
    }
};