const User = require('../models/user');
const Friendship = require('../models/friendship');
module.exports.toggleFriend = async function(req,res){
    try {
        let deleted = false;
        let fship = await User.findById(req.query.id1).populate('friendships');
        let fship1 = await User.findById(req.query.id2).populate('friendships');
        let existingFriend = await Friendship.findOne({
            from_user: req.query.id1,
            to_user: req.query.id2
        });
        if(!existingFriend){
            existingFriend = await Friendship.findOne({
                from_user: req.query.id2,
                to_user: req.query.id1
            });
        }
        if(existingFriend){
            
            fship.friendships.pull(req.query.id2);
            fship.save();
            
            fship1.friendships.pull(req.query.id1);
            fship1.save();
            existingFriend.remove();
            deleted = true;
        }else{
            let newFriend = await Friendship.create({
                from_user: req.query.id1,
                to_user:req.query.id2
            });
            fship.friendships.push(req.query.id2);
            fship.save();
            fship1.friendships.push(req.query.id1);
            fship1.save();
        }
        if(!deleted){
            req.flash('success','Friend Added');
            }else{
                req.flash('success','Friend Removed');
            }
            return res.redirect('/');
        return res.json(200,{
            message : "Request Successful",
            data:{
                user : req.query.id2,
                deleted : deleted
            }
            
        })
        

    } catch (err) {
        console.log('error in likes',err);
        return res.json(500,{
            message : 'Internal Server Error'
        })
    }
}