$(".title").attr('data-step', 1);
$(".title").attr('data-intro', 
	  "<p>This page allows browsing the conferences!</p>");

var startTour = function() {
	introJs().setOption('doneLabel', 'Create').start().oncomplete(function() {
        window.location.href = "conference/new?tour=true";
    });
};

if (RegExp('tour', 'gi').test(window.location.search)) {
	startTour();
}
