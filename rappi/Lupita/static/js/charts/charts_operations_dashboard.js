var jsoninput = "http://dev.lupita.co/mx/mex/operaciones/request/ordersChart/";


var orders1 = 0;
var orders2 = 0;
var orders3 = 0;
var orders4 = 0;
var orders5 = 0;
var orders6 = 0;
var orders7 = 0;
var orders8 = 0;
var orders9 = 0;
var orders10 = 0;
var orders11 = 0;
var orders12 = 0;
var orders13 = 0;
var orders14 = 0;
var orders15 = 0;
var orders16 = 0;

var orders1canceled = 0;
var orders2canceled = 0;
var orders3canceled = 0;
var orders4canceled = 0;
var orders5canceled = 0;
var orders6canceled = 0;
var orders7canceled = 0;
var orders8canceled = 0;
var orders9canceled = 0;
var orders10canceled = 0;
var orders11canceled = 0;
var orders12canceled = 0;
var orders13canceled = 0;
var orders14canceled = 0;
var orders15canceled = 0;
var orders16canceled = 0;

var sales = [];
var deliveryTimeChart = [];

var dates = {};

var date1 = 0;
var date2 = 0;
var date3 = 0;
var date4 = 0;
var date5 = 0;
var date6 = 0;
var date7 = 0;
var date8 = 0;
var date9 = 0;
var date10 = 0;
var date11 = 0;
var date12 = 0;
var date13 = 0;
var date14 = 0;
var date15 = 0;
var date16 = 0;


var orders_completed_now = 0;
var week_growth = 0;

/*$.ajax({
            type: "GET",
            url: "http://dev.lupita.co/mx/mex/operaciones/request/dashboard/",
            dataType: "json",
            success : function(datasales) {
                          json = datasales;
                          orders_completed_now = json.now.orders_completed;
                          week_growth = parseFloat(json.now.growth);
                          drawChart1(); 
                      }
                   });      

*/
/*
 $.ajax({
            type: "GET",
            url: "http://dev.lupita.co/mx/mex/operaciones/request/ordersChart/",
            dataType: "json",
            success : function(data) {
                          json = data;

                          orders1 = (data.now.completed[0].id__count);
                          orders2 = (data.now.completed[1].id__count);
                          orders3 = (data.now.completed[2].id__count);
                          orders4 = (data.now.completed[3].id__count);
                          orders5 = (data.now.completed[4].id__count);
                          orders6 = (data.now.completed[5].id__count);
                          orders7 = (data.now.completed[6].id__count);
                          orders8 = (data.now.completed[7].id__count);
                          orders9 = (data.now.completed[8].id__count);
                          orders10 = (data.now.completed[9].id__count);
                          orders11 = (data.now.completed[10].id__count);
                          orders12 = (data.now.completed[11].id__count);
                          orders13 = (data.now.completed[12].id__count);
                          orders14 = (data.now.completed[14].id__count);                
                          orders15 = (data.now.completed[13].id__count);
                          orders16 = (data.now.completed[15].id__count);

                          orders1canceled = (data.now.canceled[0].id__count);
                          orders2canceled = (data.now.canceled[1].id__count);
                          orders3canceled = (data.now.canceled[2].id__count);
                          orders4canceled = (data.now.canceled[3].id__count);
                          orders5canceled = (data.now.canceled[4].id__count);
                          orders6canceled = (data.now.canceled[5].id__count);
                          orders7canceled = (data.now.canceled[6].id__count);
                          orders8canceled = (data.now.canceled[7].id__count);
                          orders9canceled = (data.now.canceled[8].id__count);
                          orders10canceled = (data.now.canceled[9].id__count);
                          orders11canceled = (data.now.canceled[10].id__count);
                          orders12canceled = (data.now.canceled[11].id__count);
                          orders13canceled = (data.now.canceled[12].id__count);
                          orders14canceled = (data.now.canceled[13].id__count);
                          orders15canceled = (data.now.canceled[14].id__count);
                 

                          
                         
                         for (i = 0; i < json.length; i++){
                            
                          /*products = data[i].products;
                          $('#orders_new').append("<li class='accordion-item'><a href='#' class='item-content item-link'><div class='item-inner'><div class='item-title'>" 
                          + data[i].order_id + "&nbsp" + data[i].datetime + 
                          "</div></div></a><div class='accordion-item-content'><div class='content-block'>" 
                          + "<div id='content" + [i] + "'></div>" +
                          "</div></div></li>");*/
/*                    
                        }   

                         
                          
                      }
                   });
*/
/*
var days = ["domingo","lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
$.ajax({
            type: "GET",
            url: "http://dev.lupita.co/mx/mex/operaciones/request/salesChart/",
            dataType: "json",
            success : function(datasales) {
                          json = datasales;
                            sales[0] = ["", "", ""];
                            for (i = 0; i < 7; i++){
                              if (i < json.market.length - 7) {
                                sales[i+1] = [days[i],parseFloat(datasales.market[i].sum),parseFloat(datasales.market[i+json.market.length-7].sum)];
                                
                              } else {
                                sales[i+1] = [days[i],parseFloat(datasales.market[i].sum),0];
                                
                              }
                              dates[i] = (datasales.now[0].date);
                              
                            }
                            
                           
                     
                            drawChart2();
                                
                          
                      }
                   });



$.ajax({
            type: "GET",
            url: "http://dev.lupita.co/mx/mex/operaciones/request/deliveryTimeChart",
            dataType: "json",
            success : function(datadeliverytime) {
                          json = datadeliverytime;
                            deliveryTimeChart[0] = ["", "", ""];
                            for (i = 0; i < 15; i++){
                                
                                deliveryTimeChart[i+1] = [datadeliverytime.now[i].date,parseFloat(datadeliverytime.now[i].real_avg),parseFloat(datadeliverytime.now[i].eta_avg)];
                                
                            }

                      drawChart3();
                          
                      }
                   });                                         

*/
var canceledRazones = [];

$.ajax({
            type: "GET",
            url: "http://dev.lupita.co/mx/mex/operaciones/request/canceledReasons/",
            dataType: "json",
            success : function(canceledReasons) {
                          json = canceledReasons;
                          
                          canceledRazones[0] = ["string", "nomames"];
                            for (i = 0; i < json.length; i++){
                             
                              canceledRazones[i+1] = [json[i].order_cancel_reason__reason, json[i].total];
                              
                              
                            }
                      }
      });         
/*
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart1);
function drawChart1() {
  var data = google.visualization.arrayToDataTable(sales);

  var options = {
    title: '',
    hAxis: {
            textPosition: 'none',
            gridlines: {color: 'white'}
            },
    vAxis: {
            textPosition: 'none',
            gridlines: {color: 'white'}
          },
    chartArea: {width: '100%', height: '100%'},
    colors: ["#bbdefb", "#c8e6c9"],
    tooltip: {trigger: 'none' },
    backgroundColor: 'transparent',
 };
/*
var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
  chart.draw(data, options);
}

// Chart // 
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart2);
function drawChart2() {
  var data = google.visualization.arrayToDataTable([
    ['Fecha', 'Completadas', 'Canceladas'],
    [dates[1],  orders1,  orders1canceled],
    [dates[2],  orders2,  orders2canceled],
    [dates[3],  orders3,  orders3canceled],
    [dates[4],  orders4,  orders4canceled],
    [dates[5],  orders5,  orders5canceled],
    [dates[6],  orders6,  orders6canceled],
    [dates[7],  orders7,  orders7canceled],
    [dates[8],  orders8,  orders8canceled],
    [dates[9],  orders9,  orders9canceled],
    [dates[10],  orders10, orders10canceled],
    [dates[11],  orders11, orders11canceled],
    [dates[12],  orders12, orders12canceled],
    [dates[13],  orders13, orders13canceled],
    [dates[14],  orders14, orders14canceled],
    [dates[15],  orders15, orders15canceled]

  ]);

  var options = {
    title:  '',
    hAxis: {
            textPosition: 'none',
            gridlines: {color: 'white'}
            },
    vAxis: {
            textPosition: 'none',
            gridlines: {color: 'white'}
          },
    chartArea: {width: '100%', height: '100%'},
    colors: ['#bbdefb', '#ffcdd2'],
    tooltip: {isHtml: true },
    backgroundColor: 'transparent',
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}
*/
// Chart // 
/*
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart3);
function drawChart3() {
  var data = google.visualization.arrayToDataTable(deliveryTimeChart);

  var options = {
    title:  '',
    hAxis: {
            textPosition: 'none',
            gridlines: {color: 'white'}
            },
    vAxis: {
            textPosition: 'none',
            gridlines: {color: 'white'}
          },
    chartArea: {width: '100%', height: '100%'},
    colors: ['#ffcdd2', '#bbdefb'],
    tooltip: {isHtml: true},
    backgroundColor: 'transparent',
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div3'));
  chart.draw(data, options);
}


google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart4);
function drawChart4() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2013',  1000,      400],
    ['2014',  1170,      460],
    ['2015',  ,       1120],
    ['2016',  8,      540]
  ]);

  var options = {
    title:  '',
    hAxis: {textPosition: 'none'},
    vAxis: {textPosition: 'none'},
    chartArea: {width: '100%', height: '100%'},
    colors: ['#03a9f4', 'red'],
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div4'));
  chart.draw(data, options);
}


google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart6);
function drawChart6() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2013',  1000,      400],
    ['2014',  1170,      460],
    ['2015',  660,       1120],
    ['2016',  1030,      540]
  ]);

  var options = {
    title:  '',
    hAxis: {textPosition: 'none'},
    vAxis: {textPosition: 'none'},
    chartArea: {width: '100%', height: '100%'},
    colors: ['#03a9f4', 'red'],
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div6'));
  chart.draw(data, options);
}

*/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart5);
function drawChart5() {
  var data = google.visualization.arrayToDataTable(
    canceledRazones
  );

  var options = {
    title:  '',
    hAxis: {textPosition: 'none'},
    vAxis: {textPosition: 'none'},
    chartArea: {width: '100%', height: '100%'},
  
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div5'));
  chart.draw(data, options);
}



// Draw chart
$(window).resize(function(){
  console.log("ya");

  drawChart5();


});

// Reminder: you need to put https://www.google.com/jsapi in the head of your document or as an external resource on codepen //