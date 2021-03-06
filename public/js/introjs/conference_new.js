introJs().onchange(function(el) {
    console.log(el);
});
$(".wizard-header").attr('data-step', 1);
$(".wizard-header").attr('data-intro',
      "<p>This wizard helps you plan your conferences and events.</p>"
    + "<p>We'll help you target a Canadian industry, find the best city to host your event, find a suitable venue, and make the best conference you've ever thrown.</p>"
    + "<p>Let's get started.</p>");

$(".industry_body").attr('data-step', 2);
//$(".industry_body").attr('data-position', 'top');
$(".industry_body").attr('data-intro',
      "<p>To begin with, select a Canadian industry to target. This helps users find your conference, helps the system provide recommendations, and correlates with real open government data.</p>"
    + "<p>Press next and we'll select one for you.</p>");

$(".industry-select").attr('data-step', 3);
$(".industry-select").attr('data-intro',
    "<p>Industry is set! Let's continue.</p>");

$("#map-industry").attr('data-step', 4);
$("#map-industry").attr("data-position", "top");
$("#map-industry").attr('data-intro',
	  "<p>Now to select a city.</p>"
	+ "<p>We use open government data to measure the growth of labour force for your chosen industry. The circles on this map indicate the relative change between provinces over the past 5 years. If you were to choose a different industry on the previous tab, you will end up with different results.</p>");  

$(".location-select").attr('data-step', 5);
$(".location-select").attr("data-position", "top");
$(".location-select").attr('data-intro',
	  "<p>From here you can choose a major city across Canada.</p>"
	+ "<p>We use the open data to generate a suggestion. This demonstrates how data can be used for more than just fancy graphs - it can be used to solve real problems and provide amazing services.</p>"
	+ "<p>Let's move on to the next tab.</p>");

$("#map-venues").attr('data-step', 6);
$("#map-venues").attr("data-position", "top");
$("#map-venues").attr('data-intro',
	  "<p>Available venues!</p>"
	+ "<p>From your desired city, we can help you find professional establishments to host your event. Just click the conference centre of your choice to have it registered for your event.</p>"
	+ "<p>Let's move on to the details.</p>");

$(".details-info").attr('data-step', 7);
$(".details-info").attr('data-intro',
	  "<p>Additional details.</p>"
	+ "<p>Finally, you have the opportunity to provide details about your event. We highly recommend to keep the information detailed and the tags numerous in order to ensure others can find and join your conference.</p>"
	+ "<p>We hope you've enjoyed this guide through our wizard. Feel free to create some example conferences to try it out. Next, we'll be touring our industry growth page.</p>");



var startTour = function() {
	introJs()
		.setOption('doneLabel', 'Growth!')
		.oncomplete(function() {
        	window.location.href = "/growth?tour=true";
    	})
		.onchange(function(el) {
			var step = parseInt(el.getAttribute("data-step"));
			console.log(step);
			switch(step) {
				case 3:
					vm.industry("Agriculture");
					break;
				case 4:
					$('.btn-next').click();
					break;
				case 6:
					$('.btn-next').click();
					break;
				case 7:
					$('.btn-next').click();
					break;
				default:
			}
		}).start();
};

if (RegExp('tour', 'gi').test(window.location.search)) {
    startTour();
}

