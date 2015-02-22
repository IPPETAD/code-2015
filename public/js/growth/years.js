function YearChart(width) {
	this.width = width;
}

YearChart.prototype = {
	constructor: YearChart,

	drawChart: function(idSVG, data) {
		var self = this;
		this.id = idSVG;

		nv.addGraph(function() {
			self.chart = nv.models.discreteBarChart()
				.x(function(d) { return d.label })
				.y(function(d) { return d.value })
				.staggerLabels(true)
				.tooltips(true)
				.showXAxis(false)
				.showValues(true);

			self.updateChart(data)

			return self.chart;
		});
	},
	updateChart: function(data) {
	
		var data2 = [{
			key: "Values",
			values: data
		}];

		d3.select(this.id)
			.datum(data2)
			.transition().duration(500)
			.call(this.chart);

		if (this.callback) this.onBarClick(this.callback);

	},

	onBarClick: function(callback) {
		this.callback = callback;

		d3.selectAll('.nv-bar')
			.on('click', function(d) {
				callback(d.label);
			});
	}

};

