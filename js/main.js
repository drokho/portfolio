$(document).ready(function() {
				
	$('.toggle').hide();
	$('.main_nav-img').hide();
	
	$(function() {
		$(' #da-thumbs > li ').each( function() { $(this).hoverdir(); } );
	});
	
	$('.more-work').click(function(e) {
		e.preventDefault();
		$('.toggle').slideToggle();
		if(this.text == 'Less Work')
		{
			this.text = 'More Work';
			return;
		}
		this.text = 'Less Work';
	});
	
	/*
	$( '#info' ).submit(function( event ) {

		if($('#name').val() != '' && $('#email').val() != '' && $('#phone').val() != '' && $('#message').val() != '' && $('#honeypot').val() == '')
		{
			return;
		}
		alert('Please enter Name, Phone number, and a valid Email address.');
		event.preventDefault();
	});
	*/
	
	$('#submit').click( function(e) {	
        e.preventDefault();
		var form = $(this.form);
		
		
		form.validate({
			rules: {
				'name': {
					  required: true
				},
				'phone': {
					  required: true
				},
				'email': {
					  required: true,
					  email: true
				},
				'message': {
					  required: true
				}
			},
			messages: {
				'name': 'Name is required.',
				'phone': 'Phone number is required.',
				'email': 'We need your email so we can respond to your comment!!',
				'message': 'You need to write something here.'
			}
			
		});
		
		if(form.valid()) {
			$.ajax({
				type : form.attr('method'),
				url : form.attr('action'),          
				data: {
					'name': $('#name').val(),
					'phone': $('#phone').val(),
					'email': $('#email').val(),
					'message': $('#message').val()
				},
				success:function (response) {
                    $('.response').show();
					$('.response').html(response);
				}          
			});  
		}
		
		
	});
	
	
	$(document).bind("scroll", function(){    
		if ($(document).scrollTop() <= 200) 
		{
		   $('.main_nav-img').fadeOut();
		}
		else
		{
			$('.main_nav-img').fadeIn();
		}
	});
	
	$('.main_nav-link').click(function(e) {
		var target = '#' + $(this).text().toLowerCase();
        //alert(target)
		
		$('html,body').animate({
			'scrollTop':   $(target).offset().top-142
		}, 1000);
		
		e.preventDefault();
	});
});

var app = new Vue({
  el: '#app',
  data: {
    date: new Date().getFullYear()
  }
})