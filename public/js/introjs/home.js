$(".navbar").attr('data-step', 1);
$(".navbar").attr('data-intro', 
	  "<p>Hello, and welcome to CONstellation!</p>" 
	+ "<p>Our purpose is to make conference planning and joining a breeze using intuitive design and open government data.</p>"
	+ "<p>If you close the tour, you can continue from the footer on any page. Let's get started!</p>" );

$(".browse").attr('data-step', 2);
$(".browse").attr('data-intro',
	  "<p>From here you can browse all conferences available.</p>"
	+ "<p>You can filter by tags, browse recommended conferences, or even search by your interests!</p>");

$(".create").attr('data-step', 3);
$(".create").attr('data-intro',
	  "<p>This portal holds the magical 'conference wizard.'</p>"
	+ "<p>This allows easy creation of your own conferences and events. You can select an industry target, browse nearby venues, and even receive advice derived from open government data on where to host your event!</p>");

$(".growth").attr('data-step', 4);
$(".growth").attr('data-intro',
	  "<p>Here you can view industry field growth.</p>"
	+ "<p>Detailed growth analytics provide an easy way to inspect industries across Canada. This not only provides a simple and sleek way to visualize industry growth, but provides it in a manner that is actually useful - especially for those looking to host conferences or enter new business areas.</p>");


$(".tour").attr("data-step", 5);
$(".tour").attr("data-position", "top");
$(".tour").attr('data-intro',
	  "<p>Alright, time to move on!</p>"
	+ "<p>You can come press the button to visit 'Browse', or end your tour here and look around on your own time!</p>");

$(".tour").on('click', function() {
	introJs().setOption('doneLabel', 'Browse!').start().oncomplete(function() {
		window.location.href = "browse?tour=true";
	});
});
