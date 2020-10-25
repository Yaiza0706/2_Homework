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

	$( "button.like-button" ).on('click', ()=>{
		$(".like-button.liked").toggle();
	});

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
          '<img src="", alt="This post have no media">'+
        '</div>'+
        '<div class="post-title">'+
          '<h3></h3>'+
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
		if(post.text !== null){
			$('.post-title>h3',postTemplate).text(post.text);
		} else{

		}
		if(post.media !== null){
			if(post.media.type === "image"){
				$('.post-image img', postTemplate).attr('src', post.media.url);

		  }
			if(post.media.type === "video"){
				$('.post-image img', postTemplate).replaceWith('<video src="video.mp4", controls></video>').attr('src', post.media.url);
			}
		}
		$('.like-button',postTemplate).text(post.likes);
		$('section.main-container').append(postTemplate);
	}
}
