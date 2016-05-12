(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function closeLoginModal() {
	$('#loginScreen').addClass("animated slideOutDown");
};

$("form").submit(function() {
      $.post($(this).attr("action"), $(this).serialize(), function(data) {
          $("#someDiv").html(data);
          jsondata = jQuery.parseJSON(data);
          alliance = jsondata.alliance_name;
          foto = jsondata.request;
          logincard = document.getElementById("#CardLogin");
          
          if (alliance == "falso") {
            console.log("cagadero");
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $('#CardLogin').addClass("animated shake").one(animationEnd, function() {
                $(this).removeClass('animated ' + 'shake')});
          } else { 
            var loginScreen = document.getElementById("loginScreen");
            $("#loginScreen").addClass("animated bounceOutDown");
            var foto = jsondata.request;
            console.log(foto);
            var background = "img/alianzas/" + foto + ".png"
            document.body.style.backgroundImage = 'url('+background+')';

          }

      $.ajax({
        type: "GET",
        url: "http://52.10.76.37/alien/public/orders/palmitos?type=finished",
        dataType: "json",
        success : function(data) {
                      json = data;

                      for (i = 0; i < json.length; i++){
                          products = data[i].products;
                          new_orders1= "<li><div class='collapsible-header'><div class='row' style='padding: 0'><div class='col s3 m2'><img src='http://v2.mxgrability.rappi.com/uploads/products/low/" + data[i].products[0].image + "' style='margin-top: 15px; max-height: 48px; max-width: 100%'></div><div class='col s6 m7' style='line-height: 1rem'><br><b class='product-title'>" + data[i].products[0].name + "</b><br>" + data[i].order_id + "<br><div style='text-overflow: ellipsis; max-width: 100%; height: 1rem; white-space: nowrap; overflow: hidden;'>" + data[i].products[0].description + "</div></div><div class='col s3 m3' style='text-align: right; line-height: 1rem'><br>" + data[i].datetime + "<br>" + data[i].status + "</div></div></div><div class='collapsible-body'><div class='container' id='collapsible"+ [i] +"' style='margin-bottom:20px'><table><thead><tr><th data-field='quantity'>Cantidad</th><th data-field='products'>Producto</th><th data-field='special'>Peticiones especiales</th></tr></thead><tbody id=tbody"+ [i] +"></tbody></table><center><a class='waves-effect waves-light btn purple'>Finalizada</a></center></div></div></li>";
                          $('#nuevasordenesTab').append(new_orders1);
                          $('#nuevasordenesTab').addClass("animated bounceInUp");
                          for (h = 0; h < products.length; h++){ 
                            order_data = "<tr>" + "<td>" + data[i].products[h].units + "</td>" + "<td>" + data[i].products[h].name + "</td>" + "<td>" + "</td>" + "</tr>";
                            collapsible = "#tbody" + [i];
                            $(collapsible).append(order_data);
                          } 
                      
                      }
                    if (json.length > 0) { $('#notifications').append("<span class='badge bg-red' style='position: absolute; top: 5px; right: 25px'>" + json.length + "</span>"); };

                      for (i = 0; i < json.length; i++){
                      var order_id=(data[i].order_id);
                      var order_status=(data[i].status);
                      var order_datetime=(data[i].datetime);
                        var order_products=(data[i].products.product_id);
                        for (h = 0; h < products.length; h++){
                          var product_id= (data[i].products[0].product_id);
                          
                        }
                        
                      }
                  }
               });



      });

      return false; // prevent normal submit
  });

function submitForm () {
  console.log("hola");
  $('#submitBtn').click();
};