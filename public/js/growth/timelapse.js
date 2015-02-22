function TimeLapse() {}

TimeLapse.prototype = {
	constructor: TimeLapse,
	drawChart: function(idSVG, data) {
		var self = this;
		
		self.id = idSVG;

		nv.addGraph(function() {
			self.chart = nv.models.lineChart()
				.margin({left: 100})
				.useInteractiveGuideline(true)
				.transitionDuration(350)
				.showLegend(false)
				.showYAxis(true)
				.showXAxis(true);
			
			self.chart.xAxis
				.axisLabel('Year')
				.tickFormat(function(d) { return d3.time.format('%Y')(new Date(d));});
			self.chart.yAxis
				.axisLabel('Total workers');

			self.chart.forceY(0);

			self.updateChart(data);
			nv.utils.windowResize(function() { self.chart.update() });
		
			return self.chart;
		});
	},

	updateChart: function(data) {
		
		d3.select(this.id)
			.datum(data)
			.call(this.chart);
	}
}
		
