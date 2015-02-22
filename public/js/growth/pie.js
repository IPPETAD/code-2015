function PieChart(width, height) {
	this.width = width;
	this.height = height;
}

PieChart.prototype = {
    constructor: PieChart,

    drawChart: function(idSVG, data) {
        var self = this;
        this.id = idSVG;

        nv.addGraph(function() {
            self.chart = nv.models.pieChart()
                .width(self.width)
                .height(self.height)
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(false)
				.showLegend(false);

			self.updateChart(data)
 			nv.utils.windowResize(function() { self.chart.update() });


            return self.chart;
        });

    },

    updateChart: function(data) {
        d3.select(this.id)
            .datum(data)
            .transition().duration(1200)
			.attr('width', this.width)
			.attr('height', this.height)
            .call(this.chart);

		if (this.callback) this.onSliceClick(this.callback);

    },

	onSliceClick: function(callback) {
		this.callback = callback;

        /* SLICE CLICK */
        d3.selectAll('.nv-slice')
            .on('click', function(d) {
				callback(d.data.label);
            });

        /* LEGEND CLICK */
        d3.selectAll('.nv-series')
            .on('click', function(d) {
				callback(d.label);
            })
            .on('dblclick', function() {});
	}

};
