introJs().onchange(function(el) {
    console.log(el);
});
$(".wizard-header").attr('data-step', 1);
$(".wizard-header").attr('data-intro',
      "<p>This wizard helps you plan your conferences and events.</p>"
    + "<p>We'll help you target a Canadian industry, find the best city to host your event, find a suitable venue, and make the best gosh darn conference you've ever thrown.</p>"
    + "<p>Let's get started.</p>");

$(".industry_body").attr('data-step', 2);
$(".industry_body").attr('data-intro',
      "<p>The title says it all.</p>"
    + "<p>To begin with, select a Canadian industry to target. This helps users find your conference, helps the system provide recommendations, and correlates with real open government data.</p>"
    + "<p>Press next and we'll select a value.</p>");

$(".industry-info-text").attr('data-step', 3);
$(".industry-info-text").attr('data-intro',
    "<p>Industry is set! Let's continue.</p>");

//vm
var startTour = function() {
	introJs()
		.setOption('doneLabel', 'Growth!')
		.oncomplete(function() {
        	window.location.href = "/growth?tour=true";
    	})
		.onchange(function(el) {
			console.log(el);
		}).start();
};

if (RegExp('tour', 'gi').test(window.location.search)) {
    startTour();
}

