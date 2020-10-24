$(function(){

$( "img.logo" ).on('click', ()=>{
	$(".dropdown").toggle();
});

/*Fetch user profile information */

$.get('https://private-anon-27576e448e-wad20postit.apiary-mock.com/users/1')
	.done((user) => NewUserInfo(user))
	.fail((error) => console.log(error));


$.get('http://private-anon-27576e448e-wad20postit.apiary-mock.com/posts')
	.done((post) => NewPosts(post))
	.fail((error) => console.log(error));

})


function NewUserInfo(user){
	$('.nameSurname').text(user.firstname + " " + user.lastname);
	$('.email').text(user.email);
	$('.logo').attr('src', user.avatar);
}

let postInfo = 
'<div class="post">'+
        '<div class="post-author">'+
         '<span class="post-author-info">'+
            '<img src="res/images/avatar.png" alt="Post author">'+
            '<small>name lastname</small>'+
          '</span>'+
          '<small>month day, year 15:16</small>'+
        '</div>'+
        '<div class="post-image">'+
          '<img src="res/images/posts/1.jpg" alt="">'+
        '</div>'+
        '<div class="post-title">'+
          '<h3>Title</h3>'+
        '</div>'+
        '<div class="post-actions">'+
          '<button type="button" name="like" class="like-button">100k</button>'+
        '</div>'+
      '</div>';

function NewPosts(posts){
	for (post of posts){
		let postTemplate = $(postInfo);
		$('.post-author-info img',postTemplate).attr('src', post.author.avatar);
		$('.post-author-info small',postTemplate).text(post.author.firstname + " " + post.author.lastname);
		$('.post-author>small',postTemplate).text(post.createTime);
		$('.post-title>h3',postTemplate).text(post.text);
		$('.like-button',postTemplate).text(post.likes);

		//Add images

		$('section.main-container').append(postTemplate);
	}
}
