function GrowthViewModel() {
	var self = this;

	self.industry_default = "Total employed, all industries (x 1,000)";

	self.location = ko.observable("Canada");
	self.industry = ko.observable(self.industry_default);
	self.year = ko.observable("2015");
	
	self.pieTitle = ko.computed(function() {
		return "Industries in " + self.year();
	});

	self.summary = ko.computed(function() {
		return self.year() + ", " + self.industry() + ", " + self.location();
	});
}

$(function() {
	ko.applyBindings(new GrowthViewModel())
});

var tmpdata =  [
    { "label": "Agriculture (x 1,000)", "value": 1},
    { "label": "Utilities (x 1,000)", "value": 1},
    { "label": "Forestry, fishing, mining, quarrying, oil and gas (x 1,000)", "value": 1},
    { "label": "Educational services (x 1,000)", "value": 1},
    { "label": "Other services (x 1,000)", "value": 1},
    { "label": "Public administration (x 1,000)", "value": 1},
    { "label": "Goods-producing sector (x 1,000)", "value": 1},
    { "label": "Transportation and warehousing (x 1,000)", "value": 1},
    { "label": "Finance, insurance, real estate and leasing (x 1,000)", "value": 1},
    { "label": "Health care and social assistance (x 1,000)", "value": 1},
    { "label": "Information, culture and recreation (x 1,000)", "value": 1},
    { "label": "Accommodation and food services (x 1,000)", "value": 1},
    { "label": "Construction (x 1,000)", "value": 1},
    { "label": "Manufacturing (x 1,000)", "value": 1},
    { "label": "Services-producing sector (x 1,000)", "value": 1},
    { "label": "Professional, scientific and technical services (x 1,000)", "value": 1},
    { "label": "Business, building and other support services (x 1,000)", "value": 1}
];

var timedata = [
	{
		values: [{ x: 1424571789874, y: 30},
				 { x: 1424658189874, y: 35}],
		key: 'Years',
		color: "#ff7f0e"
	}];

var timeLapse = new TimeLapse(300,300);
timeLapse.drawChart("#time_lapse", timedata);


var pieChart = new PieChart(300,300);
pieChart.drawChart("#pie_chart", tmpdata);
pieChart.onSliceClick(function(label) {
    console.log(label);
});

var yearChart = new YearChart(300);
yearChart.drawChart("#year_chart", tmpdata);
yearChart.onBarClick(function(label) {
    console.log(label);
});

$.post("/growth/yearly",
    {"year": 2015, "location": "Canada"},
    function(result) {
        var data = [];
        $.each(JSON.parse(result), function(i,d) {
            if (d.industry != "Total employed, all industries (x 1,000)")
                data.push({
                    "label": d.industry,
                    "value": parseInt(d.value)
                });
        });
        pieChart.updateChart(data);
        yearChart.updateChart(data);
    }
);

