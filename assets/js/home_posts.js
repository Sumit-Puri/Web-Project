{
    //metho to submit form data using AJAX
    let createPost = function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: 'posts/create',
                data: newPostForm.serialize(), //convert data into json
                success: function(data){
                    //create new Post
                    let newPost = newPostdom(data.data.post,data.data.user);
                    //append data
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    new PostComments(data.data.post._id);
                    new Noty({
                        theme: 'relax',
                        text: "Post Created!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    //method to create post in dom
    let newPostdom = function(post,user){
        return $(`<li id="post-${post._id}">
        <p>
                
               
         <small>
                 <a class="delete-post-button" href="/posts/destroy/${post._id}">del</a>
         </small>
         
         ${post.content}
         <small>
                 ${user}
         </small>
        </p> 
        <div class="post-comments">
                
                         <form action="/comments/create" method="POST">
                                 <input type="text" name="content" placeholder="comment" required>
                                 <input type="hidden" name="post" value="${post._id}">
                                 <input type="submit" value="comment"> 
                         </form>
                 
    
                 <div class="post-comments-list">
                         <ul id="post-comments-${post._id}">
                                
                         </ul>
                 </div> 
        </div>
    </li>`)
    }


    //method to delete post from dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error : function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            console.log(postId);
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}