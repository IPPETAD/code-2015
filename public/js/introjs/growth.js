$(".title").attr('data-step', 1);
$(".title").attr('data-intro',
      "<p>This page holds dynamic views illustrating industry growth!</p>"
	+ "<p>By combining open government data and interactive views, we provide a disruptive portal through which one can explore Canadian industry in new and exciting ways.</p>");

$(".time").attr('data-step', 2);
$(".time").attr('data-intro',
	  "<p>This line chart shows labour force growth for over a decade.</p>"
	+ "<p>By default, this illustrates the growth for all industries. If you mouse over a certain year, you can see the respective value. By then selecting, the other charts filter to show the data for just that year</p>");

$(".pie").attr('data-step', 3);
$(".pie").attr("data-position", "top");
$(".pie").attr('data-intro',
	  "<p>The pie chart shows the distribution of industries across Canada for the given year.</p>"
	+ "<p>You can mouse over each slice to see details. If you click on a given slice, the line graph above dynamically shifts to show the growth for that industry over time.</p>");

$(".bar").attr('data-step', 4);
$(".bar").attr("data-position", "top");
$(".bar").attr('data-intro',
	  "<p>This bar chart provides a different view of the industry data.</p>"
	+ "<p>This holds the same data as the pie chart, but laid out in another manner. The bars can be selected to provide dynamic filtering as well!</p>");

$(".navbar").attr('data-step', 5);
$(".navbar").attr('data-intro',
	  "<p>Well, that's everything! We hope you've enjoyed your tour through the magical world of conference planning.</p>"
	+ "<p>Feel free to fill up our database with conferences, peruse the open data graphs, or do this tour again!</p>");


var startTour = function() {
	introJs().start();
}

if (RegExp('tour', 'gi').test(window.location.search)) {
	startTour();
}

