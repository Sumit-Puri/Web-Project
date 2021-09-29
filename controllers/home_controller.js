const { populate } = require('../models/post');
const Post=require('../models/post');
const User = require('../models/user');
module.exports.home= function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "MY HOME",
    //         posts: posts
    //     });
    // });
    //populate user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title: "MY HOME",
                posts: posts,
                all_users:users
            });
        });
    });
}