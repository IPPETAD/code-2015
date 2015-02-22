$(".title").attr('data-step', 1);
$(".title").attr('data-intro', 
	  "<p>This page presents opportunities for upcoming conferences.</p>");

$("#search").attr('data-step', 2);
$("#search").attr('data-intro',
	  "<p>This is a dynamic search bar</p>"
	+ "<p>From here you can put in relevant terms and our custom algorithm will match events with similar descriptions and titles. Try searching 'hackathon' later and see what comes up!</p>");

/*$(".filters").attr('data-step', 3);
$(".filters").attr('data-position', 'right');
$(".filters").attr('data-intro',
	  "<p>These filters provide additional support by distinguishing the different industries available. From here, you can find the conferences that match your business goals and interests.</p>"
	+ "<p>The industries listed match open data resources, demonstrating the complete integration of this system.</p>");*/

$(".pagination").attr('data-step', 4);
$(".pagination").attr("data-position", "top");
$(".pagination").attr('data-intro',
	  "<p>There are many conferences available, so don't hesitate to explore and further your business opportunities!</p>"
	+ "<p>Next up is how to create your own conferences and events.</p>");

var startTour = function() {
	introJs().setOption('doneLabel', 'Create').start().oncomplete(function() {
        window.location.href = "conference/new?tour=true";
    });
};

if (RegExp('tour', 'gi').test(window.location.search)) {
	startTour();
}
