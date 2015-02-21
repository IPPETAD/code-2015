function PieChart() {
	this.width = 300;
	this.height = 300;
}

PieChart.prototype = {
    constructor: PieChart,

    drawChart: function(idSVG, data) {
        var self = this;
        this.id = idSVG;

        nv.addGraph(function() {
            self.chart = nv.models.pie()
                .width(self.width)
                .height(self.height)
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true);

			self.updateChart(data)

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
    }

};

var testdata = [[
    {label: "One", value: 5},
    {label: "Two", value: 2},
    {label: "Three", value: 9},
    {label: "Four", value: 7},
    {label: "Five", value: 4},
    {label: "Six", value: 3},
    {label: "Seven", value: 0.5}
]];

var pieChart = new PieChart();
pieChart.drawChart("#pie_chart", testdata);

