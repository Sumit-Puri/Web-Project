const Post=require('../models/post');
const User = require('../models/user');
module.exports.home= async function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "MY HOME",
    //         posts: posts
    //     });
    // });
    //populate user of each post

    try{
            let posts = await Post.find({})
            .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');


        let users=await User.find({});
        let array =[];
        if(req.user){
        let us = await User.findById(req.user._id);
        let friendarray = us.friendships;
        
        for(u of friendarray){
            let f = await User.findById(u);
            array.push(f);
        }}
        return res.render('home',{
            title: "MY HOME",
            posts: posts,
            all_users:users,
            friends:array
        });
    }catch(err){
        console.log('Error',err);
        return ;
    }
    
    // .exec(function(err,posts){
    //     User.find({},function(err,users){
    //         return res.render('home',{
    //             title: "MY HOME",
    //             posts: posts,
    //             all_users:users
    //         });
    //     });
    // });
}