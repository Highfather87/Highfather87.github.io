$(function(){
	setInterval(function(){articleTada();}, 4000)	
	smoothScroll(300);
});

$(window).scroll(function(){
	youtubeVidScroll();
	startArticles(); 
});

function youtubeVidScroll() {
	var wScroll = $(window).scrollTop();
	//console.log(wScroll);

	//$('.video-strip').css('background-position','center' + wScroll +'px');
	$('.video-strip').css('background-position','center -'+ wScroll +'px');
}

function startArticles(){
	var wScroll = $(window).scrollTop();

	if($('section.articles').offset().top - $(window).height()/2 < wScroll) {
		$('.article-thumb').each(function(i){ 
			setTimeout(function(){
				$('.article-thumb').eq(i).addClass('is-visible');
			}, 200 * i);
		});
	}
}

//find random article and add is-emph to it, which is an animation in the thumb article css element 
function articleTada(){
	var randNum = Math.floor(Math.random()* $('.article-thumb').length) + 1

	$('.article-thumb').eq(randNum).addClass('is-emph')
		.siblings().removeClass('is-emph');
}

//controls scrolling from header nav bar

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function (event) {
		var target= $( $(this).attr('href'));

		if (target.length) {
			event.preventDefault();
			$('html, body').animate ({ scrollTop: target.offset().top}, duration);
		}
	});
}

