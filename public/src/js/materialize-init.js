$(".dropdown-button").dropdown();

$(".tooltipped").tooltip({ delay: 50 });

$('.carousel.carousel-slider').carousel({
	fullWidth: true,
	indicators: true,
});


$(".button-collapse").sideNav({
	menuWidth: 300, // Default is 300
	edge: 'right', // Choose the horizontal origin
	closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	draggable: true, // Choose whether you can drag to open on touch screens,
	onOpen: function(el) { }, // A function to be called when sideNav is opened
	onClose: function(el) { }, // A function to be called when sideNav is closed
});