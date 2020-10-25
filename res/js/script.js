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

	// Browse.html part -----------------------------------------------------

	$.get('https://private-anon-1773a2ca57-wad20postit.apiary-mock.com/profiles')
		.done((profiles) => NewProfileInfo(profiles))
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
          '<img src="", alt="">'+
        '</div>'+
        '<div class="post-title">'+
          '<h3></h3>'+
        '</div>'+
        '<div class="post-actions">'+
          '<button type="button" name="like" class="like-button" onclick="likeButtonStyle(this)">100k</button>'+
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
				$('.post-image img', postTemplate).replaceWith('<video src="video.mp4", controls></video>')
				$('.post-image video', postTemplate).attr('src', post.media.url);
			}
		}
		$('.like-button',postTemplate).text(post.likes);
		$('section.main-container').append(postTemplate);
	}
}
function likeButtonStyle(_this) {
  _this.style.backgroundColor = '#01579b';
}

// Browse.html part -----------------------------------------------------
// Puts only one profile info everywhere, instead of putting all 4 different ones
let profileInfo = 
'<div class="profile">'+
	'<span class="author-info">'+
      '<img class="logo" src="res/images/avatar.png" class="avatar"><br>' +
      '<h4 class ="nameSurname">Name Surname</h4>'+
    '</span>'+ 
    '<div calss="follow-button">'+
    	'<button onclick="submitButtonStyle(this)" type="submit" class="stylebutton">Follow</button>' +
    '</div>'
'</div>';


function NewProfileInfo(profiles){
	for (profile of profiles){
		let profileTemplate = $(profileInfo)
		$('.logo', profileTemplate).attr('src', profile.avatar);
		$('.nameSurname', profileTemplate).text(profile.firstname + " " + profile.lastname);

		$('#browse-container').append(profileTemplate)
	}
}

// Button
function submitButtonStyle(_this) {
	var bg_color = window.getComputedStyle(_this, null).backgroundColor;
  	bg_color = bg_color.match(/\d+/g);

  	if (rgbToHex(bg_color) == '#800080'){
  		 _this.style.backgroundColor = '#808080'
  	}else{
  		 _this.style.backgroundColor = '#800080'
  	}
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
  return "#" + componentToHex(+rgb[0]) + componentToHex(+rgb[1]) + componentToHex(+rgb[2]);
}
