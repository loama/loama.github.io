var searchQuery= "juan";
var searchUrl = "http://lupita.co/mx/mex/operaciones/request/search/"
var searchUrl2 = "http://lupita.co/mx/mex/customercare/request/search/"

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function searching() {

				searchQuery = $('#input-search').val();
	$.ajax({
	            type: "GET",
	            url: searchUrl + searchQuery,
	            dataType: "json",
	            success : function(searchQuery) {
	                          	json = searchQuery;
	                          
	                          	var storekeepersLength = json.storekeepers.length;
		                        var storesLength = json.stores.length;
		                        var storesCount = json.stores_results;
		                        var productsCount = json.products_results;
		                        var storekeepersCount = json.storekeepers_results;
		                        var productsLength = json.products.length;
		 
		                        $('#storekeepersLength').empty();
		                        $('#storekeepersLength').append("(" + storekeepersCount + ")");

		                        $('#storesLength').empty();
		                        $('#storesLength').append("(" + storesCount + ")");

		                        $('#productsLength').empty();
		                        $('#productsLength').append("(" + productsCount + ")");

		                        var i = 0;
		                        $('#storesList').empty();
	                          
	                          	if (storesLength == 0) {
	                          		$('#storesList').append("<p>No hay resultados para esta búsqueda</p>");
	                          	
	                          	} else {
		                          	for (i=0 ;i < storesLength; i++) {	
		                          		$('#storesList').append("<li class='has-action-left'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'></div><div class='list-content' style='margin-left:0 !important;'><span class='title'>" + json.stores[i].name + "</span><span class='caption'>" + json.stores[i].address + "</span></div></a></li>");	
	                          		};
	                          	}

		                        $('#storekeepersList').empty();
		                        for (i=0 ;i < storekeepersLength; i++) {
		                          	if (json.storekeepers[i].profile_pic == null) {
		                          		$('#storekeepersList').append("<li class='has-action-left'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'><img src=https://lh3.googleusercontent.com/KZo34rUn0lo8ubx_d2i3f6TOquUA542KjQT-Wjaddf9X-4953PvlNzu5q50oMzUJ7MEi=w300 class='img-radius' alt=''></div><div class='list-content'><span class='title'>" + json.storekeepers[i].first_name + " " + json.storekeepers[i].last_name + "</span><span class='caption'>ID:" + json.storekeepers[i].id + " Tel:" + json.storekeepers[i].telephone + "</span></div></a></li>");
		                          	} else {
		                          		$('#storekeepersList').append("<li class='has-action-left'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'><img src=http://v2.mxgrability.rappi.com/uploads/storekeepers/" + json.storekeepers[i].profile_pic + " class='img-radius' alt=''></div><div class='list-content'><span class='title'>" + json.storekeepers[i].first_name + " " + json.storekeepers[i].last_name + "</span><span class='caption'>" + json.storekeepers[i].id + " " + json.storekeepers[i].telephone + "</span></div></a></li>");
		                          	}	
		                        }

	                          	$('#productsList').empty();
	                          	
	                          	if (productsLength == 0) {
	                          		$('#productsList').append("<p>No hay resultados para esta búsqueda</p>");
	                          		

	                          	} else {
		                          	for (i=0 ;i < productsLength; i++) {
		                          		$('#productsList').append("<li class='has-action-left'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'><img src=http://v2.mxgrability.rappi.com/uploads/products/low/" + json.products[i].image + " alt=''></div><div class='list-content'><span class='title'>" + json.products[i].name + "</span><span class='caption'>" + json.products[i].description + "</span></div></a></li>");	
	                          		}

	                          	}
	                      	}
	                   });

		$.ajax({
	            type: "GET",
	            url: searchUrl2 + searchQuery,
	            dataType: "json",
	            success : function(searchQuery1) {
	                          json1 = searchQuery1;
	                          
	                          var ordersLength = json1.orders.length;
	                          var application_usersLength = json1.application_users.length;
	                          var application_usersCount = json1.application_users_results;
	                          var couponsCount = json1.coupons_results;
	                          var ordersCount = json1.orders_results;
	                          var couponsLength = json1.coupons.length;
	 
	                          $('#ordersLength').empty();
	                          $('#ordersLength').append("(" + ordersCount + ")");

	                          $('#usersLength').empty();
	                          $('#usersLength').append("(" + application_usersCount + ")");

	                          $('#couponsLength').empty();
	                          $('#couponsLength').append("(" + couponsCount + ")");

	                          var i = 0;
	                          var userid = 0;
	                          $('#usersList').empty();
	                          	
	                          	if (application_usersLength == 0) {
	                          		$('#usersList').append("<p>No hay resultados para esta búsqueda</p>");
	                          	} else {
		                          	for (i=0 ;i < application_usersLength; i++) {
		                          		
		                          		if (json1.application_users[i].profile_pic == null) {
		                          			
			                          		$('#usersList').append("<li class='has-action-left' data-toggle='modal' data-target='#largeModal' onclick='userModal("+ json1.application_users[i].id + "); closeorderdetail()'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'><img src=https://lh3.googleusercontent.com/KZo34rUn0lo8ubx_d2i3f6TOquUA542KjQT-Wjaddf9X-4953PvlNzu5q50oMzUJ7MEi=w300 class='img-radius' alt=''></div><div class='list-content'><span class='title'>" + json1.application_users[i].name + " " + "</span><span class='caption'>ID:<span id='userid"+i+ "'>" + json1.application_users[i].id + "</span> Tel:" + json1.application_users[i].phone + "</span></div></a></li>");
			                          	} else {
			                          		
			                          		$('#usersList').append("<li class='has-action-left' data-toggle='modal' data-target='#largeModal' onclick='userModal(" + json1.application_users[i].id + "); closeorderdetail()'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'><img src=http://v2.mxgrability.rappi.com/uploads/application_users/" + json1.application_users[i].profile_pic + " class='img-radius' alt=''></div><div class='list-content'><span class='title'>" + json1.application_users[i].name + " " + "</span><span class='caption'>ID:<span id='userid"+i+ "'>" + json1.application_users[i].id + "</span> Tel:" + json1.application_users[i].phone + "</span></div></a></li>");
			                          	}
			                        	  	
	                          		}
	                          	}
	                     

	                          $('#ordersList').empty();
	                          for (i=0 ;i < ordersLength; i++) {
	                          	$('#ordersList').append("<li onclick='userModal("+ json1.orders[i].application_user_id + "); openordermodal("+ json1.orders[i].id + ");' class='has-action-left' data-toggle='modal' data-target='#largeModal'><a href='#' class='hidden'><i class='ion-android-delete'></i></a><a href='#'' class='visible'><div class='list-action-left'></div><div class='list-content' style='margin-left:0 !important;'><span class='title'>Orden número: " + json1.orders[i].id + "</span><span class='caption'>" + json1.orders[i].state + " " + json1.orders[i].created_at + "</span></div></a></li>");	
	                          }

	                          $('#couponsList').empty();
	                          	
	                          	for (i=0 ;i < couponsLength; i++) {
	                          	
	                          }

	                         
	                      }
	                   });
}

function reload() {
	$.ajax({
		            type: "GET",
		            url: "http://lupita.co/mx/mex/operaciones/request/dashboardkpis",
		            dataType: "json",
		            success : function(kpis) {
		                          json = kpis;
		                          $('#kpi1').empty();
		                          $('#kpi2').empty();
		                          $('#kpi3').empty();
		                          $('#kpi4').empty();
		                          $('#kpi5').empty();
		                          $('#kpi6').empty();

		                        if (json.market.orders_growth > 0) { 
		                       		$('#kpi1').append("<span class='name'>Pedidos Market</span><span class='price text-green'><i class='ion-arrow-up-b'></i>" + json.market.orders_growth + "%</span>");   
		                       	} else {
		                       		$('#kpi1').append("<span class='name'>Pedidos Market</span><span class='price text-red'><i class='ion-arrow-down-b'></i>" + json.market.orders_growth + "%</span>");
		                       	}

		                       	if (json.market.sales_growth > 0) { 
		                       		$('#kpi2').append("<span class='name'>Ventas $ Market</span><span class='price text-green'><i class='ion-arrow-up-b'></i>" + json.market.sales_growth + "%</span>");   
		                       	} else {
		                       		$('#kpi2').append("<span class='name'>Ventas $ Market</span><span class='price text-red'><i class='ion-arrow-down-b'></i>" + json.market.sales_growth + "%</span>");
		                       	}

		                       	if (json.market.ticket_avg_growth > 0) { 
		                       		$('#kpi3').append("<span class='name'>Ticket Market</span><span class='price text-green'><i class='ion-arrow-up-b'></i>" + json.market.ticket_avg_growth + "%</span>");   
		                       	} else {
		                       		$('#kpi3').append("<span class='name'>Ticket Market</span><span class='price text-red'><i class='ion-arrow-down-b'></i>" + json.market.ticket_avg_growth + "%</span>");
		                       	}

		                       	if (json.now.orders_growth > 0) { 
		                       		$('#kpi4').append("<span class='name'>Pedidos Now</span><span class='price text-green'><i class='ion-arrow-up-b'></i>" + json.now.orders_growth + "%</span>");   
		                       	} else {
		                       		$('#kpi4').append("<span class='name'>Pedidos Now</span><span class='price text-red'><i class='ion-arrow-down-b'></i>" + json.now.orders_growth + "%</span>");
		                       	}

		                       	if (json.now.sales_growth > 0) { 
		                       		$('#kpi5').append("<span class='name'>Ventas $ Now</span><span class='price text-green'><i class='ion-arrow-up-b'></i>" + json.now.sales_growth + "%</span>");   
		                       	} else {
		                       		$('#kpi5').append("<span class='name'>Ventas $ Now</span><span class='price text-red'><i class='ion-arrow-down-b'></i>" + json.now.sales_growth + "%</span>");
		                       	}

		                       	if (json.now.ticket_avg_growth > 0) { 
		                       		$('#kpi6').append("<span class='name'>Ticket Now</span><span class='price text-green'><i class='ion-arrow-up-b'></i>" + json.now.ticket_avg_growth + "%</span>");   
		                       	} else {
		                       		$('#kpi6').append("<span class='name'>Ticket Now</span><span class='price text-red'><i class='ion-arrow-down-b'></i>" + json.now.ticket_avg_growth + "%</span>");
		                       	}
		       
		                    }	
		  });                        

$.ajax({
	            type: "GET",
	            url: "http://lupita.co/mx/mex/operaciones/request/badRates",
	            dataType: "json",
	            success : function(badrates) {
	                        json = badrates;
	                       	$('#badrates').empty(); 
	                       	for (i=0 ;i < badrates.bad_rated.length; i++) { 
		                       $('#badrates').append("<div class='frame'><div class='timeline-badge' style='background-color:red; border:none'><i class='fa fa-thumbs-down' style='top:1px'></i></div> <span class='timeline-date' style='color:red'><a href='http://lupita.co/mx/mex/rappitenderos/" + json.bad_rated[i].order__storekeeper__id + "'>" + json.bad_rated[i].order__storekeeper__first_name + "</a><span style='color:#5A88B0'> " + json.bad_rated[i].order__storekeeper__id + " " + json.bad_rated[i].order__purchase_type + "</span></span><div class='timeline-content'>" + json.bad_rated[i].comments + "</div></div>");   
		                    }
		                    for (i=0 ;i < badrates.delayed.length; i++) { 
		                       $('#badrates').append("<div class='frame'><div class='timeline-badge' style='background-color:red; border:none'><i class='fa fa-clock-o' style='top:1px'></i></div> <span class='timeline-date' style='color:red'><a href='http://lupita.co/mx/mex/rappitenderos/" + json.delayed[i].storekeeper_id + "'>" + json.delayed[i].storekeeper__first_name + " " + json.delayed[i].storekeeper__last_name + "</a><span style='color:#5A88B0'> 693</span></span><div class='timeline-content'>ETA: " + json.delayed[i].storekeeper_id + " " + json.bad_rated[i].order__purchase_type + "</div></div>");   
		                    }  
	                      }

	  });
}
function dashboardkpis(){
	$.ajax({
		            type: "GET",
		            url: "http://lupita.co/mx/mex/operaciones/request/dashboard",
		            dataType: "json",
		            success : function(dashboard) {
		            			json = dashboard;
		                        
		                       	$('#dashboard-market-growth').empty();
		                       	$('#dashboard-market-growth').append(json.market.growth.substring(0, 6) + "%");

		                       
			                    $('#dashboard-market-delivery').empty(); 
			                    $('#dashboard-market-delivery').append(json.market.real_time.substring(0, 5));

			                    $('#dashboard-now-growth').empty();
		                       	$('#dashboard-now-growth').append(json.now.growth.substring(0, 6) + "%");

		                       	
			                    $('#dashboard-now-delivery').empty(); 
			                    $('#dashboard-now-delivery').append(json.now.real_time.substring(0, 5));     
			                    
			                     
		                      }


		  });


	$.ajax({
		            type: "GET",
		            url: "http://lupita.co/mx/mex/operaciones/request/sales",
		            dataType: "json",
		            success : function(dashboard) {
		            			json = dashboard;


		            			var sales_percentage_now = (json.now.USD / (json.market.USD + json.now.USD) * 100).toFixed(2) + "%";
		            			var sales_percentage_market = (json.market.USD / (json.market.USD + json.now.USD) * 100).toFixed(2) + "%";
		                       	
		                       	$('#dashboard-market-orders').empty();
			                    $('#dashboard-market-orders').append(sales_percentage_market);

		                       	$('#dashboard-now-orders').empty();
			                    $('#dashboard-now-orders').append(sales_percentage_now);

			                    
		                      }


		  });
};
dashboardkpis();
reload();
setInterval(dashboardkpis, 1*60*1000);
setInterval(reload, 30*1000);
$.ajax({
	            type: "GET",
	            url: "http://lupita.co/mx/mex/operaciones/request/oneStars",
	            dataType: "json",
	            success : function(oneStars) {
	                        json = oneStars;
	                       	$('#badrated').empty(); 
	                       	
	                       	for ( i=0; i < oneStars.length; i++) {
	                       		if (json[i].profile_pic != null) {
		                       		$('#badrated').append("<div class='card tile card-friend'><a href='user-profile.html'><img src=http://v2.mxgrability.rappi.com/uploads/storekeepers/" + json[i].profile_pic + " class='user-photo' style='width:80px' alt=''></a><div class='friend-content'><p class='title' style='white-space: nowrap;  width: 12em; overflow: hidden;text-overflow: ellipsis;'><a href=http://lupita.co/mx/mex/rappitenderos/"+ json[i].storekeeper_id + ">" + json[i].first_name + " " + json[i].last_name + "</a></p><p><a href='user-profile.html' style='color:red'>Mal calificadas: " + json[i].orders_rated + " órdenes</a></p><p><a href='user-profile.html'>Total: " + json[i].total_orders + " órdenes</a></p></div></div>");
		                   		}
		                   		else {
		                   			$('#badrated').append("<div class='card tile card-friend'><a href='user-profile.html'><img src=https://lh3.googleusercontent.com/KZo34rUn0lo8ubx_d2i3f6TOquUA542KjQT-Wjaddf9X-4953PvlNzu5q50oMzUJ7MEi=w300 class='user-photo' style='width:80px' alt=''></a><div class='friend-content'><p class='title' style='white-space: nowrap;  width: 12em; overflow: hidden;text-overflow: ellipsis;'><a href=http://lupita.co/mx/mex/rappitenderos/"+ json[i].storekeeper_id + ">" + json[i].first_name  + " " + json[i].last_name + "</a></p><p><a href='user-profile.html' style='color:red'>Mal calificadas: " + json[i].orders_rated + " órdenes</a></p><p><a href='user-profile.html'>Total:" + json[i].total_orders + " órdenes</a></p></div></div>");
		                   		}
		                   	
		                   	}
		                    
	                      }

	  });

$.ajax({
	            type: "GET",
	            url: "http://lupita.co/mx/mex/operaciones/request/fiveStars",
	            dataType: "json",
	            success : function(fiveStars) {
	                        json = fiveStars;
	                       	$('#goodrated').empty(); 
	                       	
	                       	for ( i=0; i < fiveStars.length; i++) {
	                       		if (json[i].profile_pic != null) {
		                       		$('#goodrated').append("<div class='card tile card-friend'><a href='user-profile.html'><img src=http://v2.mxgrability.rappi.com/uploads/storekeepers/" + json[i].profile_pic + " class='user-photo' style='width:80px' alt=''></a><div class='friend-content'><p class='title' style='white-space: nowrap;  width: 12em; overflow: hidden;text-overflow: ellipsis;'><a href=http://lupita.co/mx/mex/rappitenderos/"+ json[i].storekeeper_id + ">" + json[i].first_name + " " + json[i].last_name + "</a></p><p><a href='user-profile.html' style='color:#ffc400'>5 estrellas: " + json[i].orders_rated + " órdenes</a></p><p><a href='user-profile.html'>Total: " + json[i].total_orders + " órdenes</a></p></div></div>");
		                   		}
		                   		else {
		                   			$('#goodrated').append("<div class='card tile card-friend'><a href='user-profile.html'><img src=https://lh3.googleusercontent.com/KZo34rUn0lo8ubx_d2i3f6TOquUA542KjQT-Wjaddf9X-4953PvlNzu5q50oMzUJ7MEi=w300 class='user-photo' style='width:80px' alt=''></a><div class='friend-content'><p class='title' style='white-space: nowrap;  width: 12em; overflow: hidden;text-overflow: ellipsis;'><a href=http://lupita.co/mx/mex/rappitenderos/"+ json[i].storekeeper_id + ">" + json[i].first_name + " " + json[i].last_name + "</a></p><p><a href='user-profile.html' style='color:#ffc400'>5 estrellas: " + json[i].orders_rated + " órdenes</a></p><p><a href='user-profile.html'>Total:" + json[i].total_orders + " órdenes</a></p></div></div>");
		                   		}
		                  
		                   	}
		                    
	                      }

	  });
var useridnext = 0;
function userModal(userid) {
	useridnext = userid; 
	$('#user-orders').empty();
   	$('#user-stats1').empty();
   	$('#user-stats2').empty();
   	$('#user-name').empty();
   	$('#user-lastname').empty();
   	$('#user-profilepic').empty();

	
 // Function for users orders in modal
	$.ajax({
	            type: "GET",
	            url: "http://lupita.co/mx/mex/customercare/request/user/" + userid + "/orders/page/1",
	            dataType: "json",
	            success : function(userOrders) {
	            			
	                        json = userOrders;
	                       	$('#user-orders').empty(); 
	                       	
	                       	if (json.orders.length == 0) {$('#user-orders').append("no hay ordenes");}

	                       	for ( i=0; i < json.orders.length; i++) {
	                       		
	                       		if (json.orders[i].products != null) {
	                       			var products = json.orders[i].products + "<br>"
	                       		}
	                       		else {
	                       			var products = ""
	                       		}

	                       		if (json.orders[i].coupon_code != null ) {
	                       			var coupon = "<span style='border-style:dotted; border-color:red'>" + json.orders[i].coupon_code + "</span>" + "<br>";
	                       		} else {
	                       			var coupon = "";
	                       		}

	                       		if (json.orders[i].created_at.substring(5, 7) == 06) { var mes = "JUN" } else if (json.orders[i].created_at.substring(5, 7) == 07) { var mes = "JUL"}  else if (json.orders[i].created_at.substring(5, 7) == 05) { var mes = "MAY"}  else if (json.orders[i].created_at.substring(5, 7) == 01) { var mes = "ENE"}  else if (json.orders[i].created_at.substring(5, 7) == 02) { var mes = "FEB"}  else if (json.orders[i].created_at.substring(5, 7) == 03) { var mes = "MAR"}  else if (json.orders[i].created_at.substring(5, 7) == 04) { var mes = "ABR"}  else if (json.orders[i].created_at.substring(5, 7) == 08) { var mes = "AGO"}  else if (json.orders[i].created_at.substring(5, 7) == 09) { var mes = "SEP"}  else if (json.orders[i].created_at.substring(5, 7) == 10) { var mes = "OCT"}  else if (json.orders[i].created_at.substring(5, 7) == 11) { var mes = "NOV"}  else if (json.orders[i].created_at.substring(5, 7) == 12) { var mes = "DIC"}  else { var mes = "Algo se rompió, avisanos"};
	                       		
	                       		$('#user-orders').append("<li style='border-radius:10px; background-color: white; -webkit-box-shadow: 2px 2px 10px #a0a0a0; -moz-box-shadow: 2px 2px 10px #a0a0a0; box-shadow: 2px 2px 10px #a0a0a0;'>  \
	                       									<div class='row' style='border-width:10px; border-radius:10px'> \
	                       										<div class='col-sm-3'>" +
	                       											"<div style='border-radius:2px; width: 70px;'> " + json.orders[i].order_id + "</div>" +
	                       											"<img src=http://lupita.co/static/img/calendar-icon.png style='margin-left:-10px; width:100%'><span style='position: absolute; top: 40px;left: 35px;font-weight: 600;color: white;'>" +
	                       											mes + "</span>" +
	                       											"<span style='position:absolute; top: 70px; left: 35px; font-weight:600; font-size:30px; color:#3b3b3b;'>"+ json.orders[i].created_at.substring(8, 10) + 
	                       											"</span><br>" 
	                       											+ 
	                       									   "</div> \
	                       									   	<div class='col-sm-6'>" + 
	                       									   		products +
	                       											json.orders[i].whim +
	                       										  "<br>" +
	                       										"</div> \
	                       										<div class='col-sm-2'>" 
	                       										  	+ "$" + json.orders[i].total_value + 
	                       										  	"<br>" +
	                       										  	coupon +
	                       										  	json.orders[i].state +  
	                       										"</div>" +
	                       										"<div class='col-sm-1'><i class='fa fa-chevron-right' aria-hidden='true' style='font-size:30px' onclick=openordermodal(" + json.orders[i].order_id + ")></i></div> \
	                       									</div> \
	                       								  </li><br>"

	                       								);
	                       	}
	                       	
	                      }



	  });

	$.ajax({
	            type: "GET",
	            url: "http://lupita.co/mx/mex/customercare/request/user/" + userid + "/profile",
	            dataType: "json",
	            success : function(userProfile) {
	                        json = userProfile;
	                       	
	                       	$('#user-name').append(json[0].nombre + "<br>" + "<div id='rateYo'></div>" + "<span style='position:absolute; top: 0; top: 125px; left: 60px;'>" + json[0].lupita_application_user_id + "</span>" );
	                       	var debtorders = json[0].pedidos_cc - json[0].pagados_cc;
	                       	if (json[0].debe == "SI") { $('#user-name').append("<div style='background-color: #606060; border-radius: 10px; margin-left:5%; position: absolute; top: 200px; width: 90%;'><span>" + "DEBE" + "</span></div>") }
	                      
	                     
	                       	if (json[0].profile_pic == null) {
	                       		$('#user-profilepic').prepend("<img src=https://lh3.googleusercontent.com/KZo34rUn0lo8ubx_d2i3f6TOquUA542KjQT-Wjaddf9X-4953PvlNzu5q50oMzUJ7MEi=w300 style='width:30%; border-radius: 10px; box-shadow: 2px 2px 10px #202020; margin-top: 2em'>");	
	                       	} else {
	                       		$('#user-profilepic').prepend("<img src=http://v2.mxgrability.rappi.com/uploads/application_users/" + json[0].profile_pic + " style='width:30%; border-radius: 10px; box-shadow: 2px 2px 10px #202020; margin-top: 2em'>");
	                       	}
	                       	

	                       	$('#user-stats1').append( "<span style='color:white'><br>" + json[0].email + 
	                       														"<br>" + json[0].telefono + 
	                       														"<br>" +
	                       							  "</span>" +
	                       							  							"<br><center><span style='color:white; font-size:20px'>" + 
	                       							  							
	                       							  							"Órdenes</span></center>" + 
	                       							  "<span style='color:white'><br>" + "Efectivo: " + json[0].cash + 
	                       							  							"<br>"+ "Tarjeta: " + json[0].pedidos_cc +
	                       							  							"<br>" + "Completados: " + json[0].finalizados +
	                       							  							"<br>" + "Cancelados: " + json[0].cancelados +
	                       							  							"<br>" + "Pagado: $"  + json[0].invertido + 
	                       							  							"<br>" + "Tarjetas: "  + json[0].tarjeta + 
	                       							  "</span>"

	                       							);

	                       	if (json[0].deleted_at != null) { $('#user-stats1').append("<span style='position:absolute; top: -145px; transform: rotate(-45deg); left: 90px; color: white; z-index:1000'>Desactivado</span>" + "<div style='width: 85.39px;height: 83.39px; background-color: #000; border-radius: 10px; position: absolute; top: -172px; left: 97px; opacity: .6; } '>hola</div>");  }
	                      
 
						      $("#rateYo").rateYo({
						        rating: Math.round(json[0].avg_rate * 100) /100,
						        starWidth: "20px",
						        readOnly: true,
						      });
						     
					

	                       	if (json[0].length > 0) {
	                       		
	                       	} else {
	                       		
	                       	}
	                      
		                    $('#user-stats2').append();
		                    $('#user-stats1').append();
		                    
	                      }

	  });
}	   
function openordermodal (orderid) {
	$('#order-detail').css("display", "block");
	var url = "http://lupita.co/mx/mex/customercare/request/user/" + useridnext + "/orders/" + orderid + "/";
	$.ajax({
	            type: "GET",
	            url: "http://lupita.co/mx/mex/customercare/request/user/" + useridnext + "/orders/" + orderid + "/",
	            dataType: "json",
	            success : function(orderdetail) {
	            									json = orderdetail;
	            									$('#order-detail-eta').empty();
													$('#order-detail-eta').append(json.eta);
													$('#order-detail-real').empty();
													if (json.real_time != null) {
													$('#order-detail-real').append(json.real_time.substring(2,4));
													}
													$('#order-detail-storekeeper-img').empty();
													$('#order-detail-storekeeper-img').append("<img src=http://v2.mxgrability.rappi.com/uploads/storekeepers/" + json.storekeeper_photo + " style='width:70%; border-radius: 50%;'>");
													$('#order-detail-storekeeper-name').empty();
													$('#order-detail-storekeeper-name').append(json.storekeeper);

													$('#order-detail-tip').empty();
													$('#order-detail-tip').append(json.tip);

													$('#order-detail-products-total').empty();
													$('#order-detail-whims-total').empty();
													for (var whims = 0; whims < json.order_whims.length; whims++) {
														$('#order-detail-whims-total').append(json.order_whims[whims].price + "<br>");
													}
													

													$('#order-detail-storekeeper-phone').empty();
													$('#order-detail-storekeeper-phone').append(json.storekeeper_phone);

													$('#order-detail-total-value').empty();
													$('#order-detail-total-value').append(json.total_value);

													$('#order-detail-coupon').empty();
													$('#order-detail-coupon').append(json.coupon_code);
													

													$('#order-detail-time').empty();
													$('#order-detail-time').append(json.created_at);
													$('#order-detail-type').empty();
													$('#order-detail-type').append(json.payment_method);
													$('#order-detail-address').append(json.address);


													$('#order-detail-products').empty();
													for (var pro = 0; pro < json.products.length; pro++) {
														$('#order-detail-products').append("<div class='row'>\
																	                            <div class='col-sm-3'>\
																	                              <img src='http://v2.mxgrability.rappi.com/uploads/products/high/" + json.products[pro].product__image + "' style='width:100%'>\
																	                            </div>\
																	                            <div class='col-sm-6' style='line-height:16px'>\
																	                              <br>\
																	                              <span style='font-weight:bold; font-size:'>" + json.products[pro].product__name + "<span><br>\
																	                              <span style='font-size:12px'>" + json.products[pro].product__description + "</span> \
																	                            </div>\
																	                            <div class='col-sm-3'>\
																	                            " + json.products[pro].units + "   $" + json.products[pro].unit_price + "\
																	                            </div>\
																	                          </div><hr style='margin: 0'>");
													}

													$('#order-detail-whims').empty();
													for (var whi = 0; whi < json.order_whims.length; whi++) {
														$('#order-detail-whims').append("<div class='row'> \
																	                          <div class='col-sm-9' style='line-height:16px'>\
																	                            <br>\
																	                            <span style='font-weight:bold; font-size:'>" + json.order_whims[whi].name + "<span><br>\
																	                            <!--<span style='font-size:12px'>Los mejores chilaquiles de</span>--> \
																	                          </div>\
																	                          <div class='col-sm-3'>\
																	                          1   $" + json.order_whims[whi].price + "\
																	                          </div>\
																	                        </div><hr style='margin: 0'>");
													}
													$('#order-detail-messages').empty();
													for (var message = 0; message < json.chat_messages.length; message++) {
													if (json.chat_messages[message].channel.split('_')[1] == "storekeeper") {
														$('#order-detail-messages').append("\
															<div class='message left'>\
											                  <div class='message-text'>" + json.chat_messages[message].alert.split(':')[1] + "</div>\
											                </div>\
										                ")
										                } else {
										                	$('#order-detail-messages').append("\
																<div class='message right'>\
												                  <div class='message-text'>" + json.chat_messages[message].alert.split(':')[1] + "</div>\
												                </div>\
											                ")	
										                }
													}

													var s = "hola : quiero";
												
													
												}
			});										
}

function closeorderdetail(){
	$('#order-detail').css("display", "none");
}
userModal(); 	     	      	            