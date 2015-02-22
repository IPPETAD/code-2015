function GrowthViewModel() {
	var self = this;

	self.location = ko.observable("Canada");
	self.industry = ko.observable();
	self.year = ko.observable(2015);
	
	self.pieTitle = ko.computed(function() {
		return "Industry workers in " + self.year();
	});
	self.timeTitle = ko.computed(function() {
		return "Workers by year for '" + self.industry() + "'";
	});

	self.summary = ko.computed(function() {
		return self.industry() + ", " + self.year();
	});
}

var vm = new GrowthViewModel();
$(function() {
	ko.applyBindings(vm);
});

var tmpdata =  [
    { "label": "Agriculture", "value": 1},
    { "label": "Utilities", "value": 1},
    { "label": "Forestry, fishing, mining, quarrying, oil and gas", "value": 1},
    { "label": "Educational services", "value": 1},
    { "label": "Other services", "value": 1},
    { "label": "Public administration", "value": 1},
    { "label": "Goods-producing sector", "value": 1},
    { "label": "Transportation and warehousing", "value": 1},
    { "label": "Finance, insurance, real estate and leasing", "value": 1},
    { "label": "Health care and social assistance", "value": 1},
    { "label": "Information, culture and recreation", "value": 1},
    { "label": "Accommodation and food services", "value": 1},
    { "label": "Construction", "value": 1},
    { "label": "Manufacturing", "value": 1},
    { "label": "Services-producing sector", "value": 1},
    { "label": "Professional, scientific and technical services", "value": 1},
    { "label": "Business, building and other support services", "value": 1}
];

var timedata = [
	{
		values: [{ x: 1424571789874, y: 17000},
				 { x: 1424658189874, y: 16000}],
		key: 'Years',
		color: "#ff7f0e"
	}];

var timeLapse = new TimeLapse(300,500);
timeLapse.drawChart("#time_lapse", timedata);
timeLapse.onNodeClick(function(label) {
	console.log(label);
});


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

var carl = null;
vm.year.subscribe(function(newValue) {
	$.post("/growth",
		{"year": newValue, "location": vm.location()},
		function (result) {
			var data = [];
        	$.each(JSON.parse(result), function(i,d) {
            	if (d.industry != "Total employed, all industries")
                	data.push({
                    	"label": d.industry,
                    	"value": parseInt(d.value)
                	});
        	});
			pieChart.updateChart(data);
		});
});

vm.industry.subscribe(function(newValue) {
	$.post("/growth",
		{"industry": newValue, "location": vm.location()},
		function (result) {
			var data = [];
			$.each(JSON.parse(result), function(i,d) {
				data.push({
					x: d.date,
					y: parseInt(d.value)
				})
            });
			timeLapse.updateChart([{
				values: data,
				key: 'Years',
				color: '#ff7f0e'
			}]);
		});	
});

vm.industry("Total employed, all industries");
