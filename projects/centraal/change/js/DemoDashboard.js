(function (namespace, $) {
	"use strict";

	var DemoDashboard = function () {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function () {
			o.initialize();
		});

	};
	var p = DemoDashboard.prototype;

	// =========================================================================
	// MEMBERS
	// =========================================================================

	p.rickshawSeries = [[], []];
	p.rickshawGraph = null;
	p.rickshawRandomData = null;
	p.rickshawTimer = null;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function () {
		this._initSparklines();
		this._initFlotVisitors();
		this._initRickshaw();
		this._initKnob();
		this._initFlotRegistration();
	};

	// =========================================================================
	// Sparklines
	// =========================================================================

	p._initSparklines = function () {
		// Generate random sparkline data
		var points = [20, 10, 25, 15, 30, 20, 30, 10, 15, 10, 20, 25, 25, 15, 20, 25, 10, 67, 10, 20, 25, 15, 25, 97, 10, 30, 10, 38, 20, 15, 82, 44, 20, 25, 20, 10, 20, 38];

		materialadmin.App.callOnResize(function () {
			var options = $('.sparkline-revenue').data();
			options.type = 'line';
			options.width = '100%';
			options.height = $('.sparkline-revenue').height() + 'px';
			options.fillColor = false;
			$('.sparkline-revenue').sparkline(points, options);
		});

		materialadmin.App.callOnResize(function () {
			var parent = $('.sparkline-visits').closest('.card-body');
			var barWidth = 6;
			var spacing = (parent.width() - (points.length * barWidth)) / points.length;

			var options = $('.sparkline-visits').data();
			options.type = 'bar';
			options.barWidth = barWidth;
			options.barSpacing = spacing;
			options.height = $('.sparkline-visits').height() + 'px';
			options.fillColor = false;
			$('.sparkline-visits').sparkline(points, options);
		});
	};
	
	// =========================================================================
	// FLOT
	// =========================================================================

	p._initFlotVisitors = function () {
		var o = this;
		var chart = $("#flot-visitors");
		
		// Elements check
		if (!$.isFunction($.fn.plot) || chart.length === 0) {
			return;
		}
		
		// Chart data
		var data = [
			{
				label: 'Privado',
				data: [
					[moment().subtract(168, 'hours').valueOf(), 50],
					[moment().subtract(144, 'hours').valueOf(), 70],
					[moment().subtract(108, 'hours').valueOf(), 82],
					[moment().subtract(70, 'hours').valueOf(), 54],
					[moment().subtract(30, 'hours').valueOf(), 88],
					[moment().subtract(12, 'hours').valueOf(), 80],
					[moment().valueOf(), 54]
				],
				last: true
			},
			{
				label: 'Coworking',
				data: [
					[moment().subtract(168, 'hours').valueOf(), 50],
					[moment().subtract(155, 'hours').valueOf(), 74],
					[moment().subtract(132, 'hours').valueOf(), 44],
					[moment().subtract(36, 'hours').valueOf(), 82],
					[moment().subtract(12, 'hours').valueOf(), 70],
					[moment().valueOf(), 60]
				],
				last: true
			}
		];
		
		// Chart options
		var labelColor = chart.css('color');
		var options = {
			colors: chart.data('color').split(','),
			series: {
				shadowSize: 0,
				lines: {
					show: true,
					lineWidth: false,
					fill: true
				},
				curvedLines: {
					apply: true,
					active: true,
					monotonicFit: false
			   }
			},
			legend: {
				container: $('#flot-visitors-legend')
			},
			xaxis: {
				mode: "time",
				timeformat: "%d %b",
				font: {color: labelColor}
			},
			yaxis: {
				font: {color: labelColor}
			},
			grid: {
				borderWidth: 0,
				color: labelColor,
				hoverable: true
			}
		};
		chart.width('100%');
		
		// Create chart
		var plot = $.plot(chart, data, options);

		// Hover function
		var tip, previousPoint = null;
		chart.bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint !== item.dataIndex) {
					previousPoint = item.dataIndex;

					var x = item.datapoint[0];
					var y = item.datapoint[1];
					var tipLabel = '<strong>' + $(this).data('title') + '</strong>';
					var tipContent = Math.round(y) + " " + item.series.label.toLowerCase() + " on " + moment(x).format('dddd');

					if (tip !== undefined) {
						$(tip).popover('destroy');
					}
					tip = $('<div></div>').appendTo('body').css({left: item.pageX, top: item.pageY - 5, position: 'absolute'});
					tip.popover({html: true, title: tipLabel, content: tipContent, placement: 'top'}).popover('show');
				}
			}
			else {
				if (tip !== undefined) {
					$(tip).popover('destroy');
				}
				previousPoint = null;
			}
		});
	};

	// =========================================================================
	// Rickshaw
	// =========================================================================

	p._initRickshaw = function () {
		// Don't init a rickshaw graph twice
		if (this.rickshawGraph !== null) {
			return;
		}

		var o = this;

		// Create random data
		this.rickshawRandomData = new Rickshaw.Fixtures.RandomData(50);
		for (var i = 0; i < 75; i++) {
			this.rickshawRandomData.addData(this.rickshawSeries);
		}
		
		// Update knob charts
		this._updateKnob();

		// Init Richshaw graph
		this.rickshawGraph = new Rickshaw.Graph({
			element: $('#rickshawGraph').get(0),
			width: $('#rickshawGraph').closest('.card-body').width(),
			height: $('#rickshawGraph').height(),
			interpolation: 'linear',
			renderer: 'area',
			series: [
				{
					data: this.rickshawSeries[0],
					color: $('#rickshawGraph').data('color1'),
					name: 'miembros'
				}, {
					data: this.rickshawSeries[1],
					color: $('#rickshawGraph').data('color2'),
					name: 'miembros + invitados'
				}
			]
		});

		// Add hover info
		var hoverDetail = new Rickshaw.Graph.HoverDetail({
			graph: this.rickshawGraph
		});

		// Render graph
		this.rickshawGraph.render();

		// Add animated data
		clearInterval(this.rickshawTimer);
		this.rickshawTimer = setInterval(function () {
			o._refreshRickshaw();
		}, 2000);

		materialadmin.App.callOnResize(function () {
			o.rickshawGraph.configure({
				height: $('#rickshawGraph').height(),
				width: $('#rickshawGraph').closest('.card-body').outerWidth()
			});
			o.rickshawGraph.render();
		});
	};

	p._refreshRickshaw = function () {
		this.rickshawRandomData.removeData(this.rickshawSeries);
		this.rickshawRandomData.addData(this.rickshawSeries);
		this.rickshawGraph.update();
		this._updateKnob();
	};

	// =========================================================================
	// KNOB
	// =========================================================================

	p._initKnob = function () {
		if (!$.isFunction($.fn.knob)) {
			return;
		}

		$('.dial').each(function () {
			var options = materialadmin.App.getKnobStyle($(this));
			$(this).knob(options);
		});
	};

	p._updateKnob = function () {
		var val1 = this.rickshawSeries[0][this.rickshawSeries[0].length - 2];
		var val2 = this.rickshawSeries[0][this.rickshawSeries[0].length - 1];

		$({animatedVal: val1.y}).animate({animatedVal: val2.y}, {
			duration: 1200,
			easing: "swing",
			step: function () {
				$('#serverStatusKnob input').val(Math.ceil(this.animatedVal)).trigger("change");
			}
		});
	};
	
	// =========================================================================
	// FLOT
	// =========================================================================

	p._initFlotRegistration = function () {
		var o = this;
		var chart = $("#flot-registrations");
		
		// Elements check
		if (!$.isFunction($.fn.plot) || chart.length === 0) {
			return;
		}
		
		// Chart data
		var data = [
			{
				label: 'Registrations',
				data: [
					[moment().subtract(11, 'month').valueOf(), 110000],
					[moment().subtract(10, 'month').valueOf(), 245000],
					[moment().subtract(9, 'month').valueOf(), 380000],
					[moment().subtract(8, 'month').valueOf(), 265000],
					[moment().subtract(7, 'month').valueOf(), 390500],
					[moment().subtract(6, 'month').valueOf(), 525000],
					[moment().subtract(5, 'month').valueOf(), 360000],
					[moment().subtract(4, 'month').valueOf(), 490000],
					[moment().subtract(3, 'month').valueOf(), 620000],
					[moment().subtract(2, 'month').valueOf(), 519500],
					[moment().subtract(1, 'month').valueOf(), 650000],
					[moment().valueOf(), 780500]
				],
				last: true
			}
		];

		// Chart options
		var labelColor = chart.css('color');
		var options = {
			colors: chart.data('color').split(','),
			series: {
				shadowSize: 0,
				lines: {
					show: true,
					lineWidth: 2
				},
				points: {
					show: true,
					radius: 3,
					lineWidth: 2
				}
			},
			legend: {
				show: false
			},
			xaxis: {
				mode: "time",
				timeformat: "%b %y",
				color: 'rgba(0, 0, 0, 0)',
				font: {color: labelColor}
			},
			yaxis: {
				font: {color: labelColor}
			},
			grid: {
				borderWidth: 0,
				color: labelColor,
				hoverable: true
			}
		};
		chart.width('100%');
		
		// Create chart
		var plot = $.plot(chart, data, options);

		// Hover function
		var tip, previousPoint = null;
		chart.bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint !== item.dataIndex) {
					previousPoint = item.dataIndex;

					var x = item.datapoint[0];
					var y = item.datapoint[1];
					var tipLabel = '<strong>' + $(this).data('title') + '</strong>';
					var tipContent = y + " " + item.series.label.toLowerCase() + " on " + moment(x).format('dddd');

					if (tip !== undefined) {
						$(tip).popover('destroy');
					}
					tip = $('<div></div>').appendTo('body').css({left: item.pageX, top: item.pageY - 5, position: 'absolute'});
					tip.popover({html: true, title: tipLabel, content: tipContent, placement: 'top'}).popover('show');
				}
			}
			else {
				if (tip !== undefined) {
					$(tip).popover('destroy');
				}
				previousPoint = null;
			}
		});
	};

	// =========================================================================
	namespace.DemoDashboard = new DemoDashboard;
}(this.materialadmin, jQuery)); // pass in (namespace, jQuery):
