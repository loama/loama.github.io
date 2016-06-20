var request_alarm = "http://lupita.co/mx/mex/operaciones/request/unassignOrders/"

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function verifyAlarm(){
  console.log("it works!");
  $.ajax({
      url: request_alarm,
      type: "get",
      beforeSend: function(data) {
        //$("#loader").show();
      },
      success: function(data){
        //console.log("bien");
        console.log(data);
        if(data[0].count>0){
          console.log("suena");
          $("#rappiwhistle").get(0).play();
        }
        else{
          console.log("no suena");
          $("#rappiwhistle").get(0).pause();
          $("#rappiwhistle").get(0).currentTime = 0;
        }
      },
      error: function(data){
        console.log("error al refrescar la informacion de alarma");
        $("#loader").hide();
      }
    }); 
}

url_op_perm = "http://lupita.co/mx/mex/operaciones/request/getLupitaUsers/";
function getOperacionesPermList(){
  console.log("setInterval_algo");
  $.ajax({
      url: url_op_perm,
      type: "get",
      beforeSend: function(data) {
        //$("#loader").show();
      },
      success: function(data){
        $('#lupita_users_rows').empty();
        console.log(data);
        var number_of_users = data.length;
        //var table_content = document.getElementById("lupita_users_rows")
        /*
        MEX_MX_operaciones_general_manager
        MEX_MX_operaciones_manager_agilizadores
        MEX_MX_operaciones_agilizador
        MEX_MX_operaciones_rappitendero
        MEX_MX_operaciones_invitado
        */

        for(var i = 0 ; i<number_of_users; i++){
          var name = "<td>" + data[i].user__first_name + " " + data[i].user__last_name + "</td>";
          var email = "<td>" + data[i].user__email + "</td>";
          
          if(data[i].perms.length == 0){
            var option1 = "<option value='MEX_MX_operaciones_ninguno' selected>Ninguno</option>";
            var option2 = "<option value='MEX_MX_operaciones_invitado'>Invitado</option>";
            var option3 = "<option value='MEX_MX_operaciones_agilizador'>Agilizador</option>";
            var option4 = "<option value='MEX_MX_operaciones_manager_agilizadores'>Manager de Agilizadores</option>";
            var option5 = "<option value='MEX_MX_operaciones_zone_manager'>Manager de Zona</option>";
            var option6 = "<option value='MEX_MX_operaciones_general_manager'>Manager General</option>";
          }
          else{
            var option1 = "<option value='MEX_MX_operaciones_ninguno'>Ninguno</option>";
            
            if (data[i].perms[0].codename == 'MEX_MX_operaciones_invitado')
              var option2 = "<option value='MEX_MX_operaciones_invitado' selected>Invitado</option>";
            else
              var option2 = "<option value='MEX_MX_operaciones_invitado'>Invitado</option>";
            
            if (data[i].perms[0].codename == 'MEX_MX_operaciones_agilizador')
              var option3 = "<option value='MEX_MX_operaciones_agilizador' selected>Agilizador</option>";
            else
              var option3 = "<option value='MEX_MX_operaciones_agilizador'>Agilizador</option>";
            
            if (data[i].perms[0].codename == 'MEX_MX_operaciones_manager_agilizadores')
              var option4 = "<option value='MEX_MX_operaciones_manager_agilizadores' selected>Manager de Agilizadores</option>";
            else
              var option4 = "<option value='MEX_MX_operaciones_manager_agilizadores'>Manager de Agilizadores</option>";
  
            if (data[i].perms[0].codename == 'MEX_MX_operaciones_zone_manager')
              var option5 = "<option value='MEX_MX_operaciones_zone_manager' selected>Manager de Zona</option>";
            else
              var option5 = "<option value='MEX_MX_operaciones_zone_manager'>Manager de Zona</option>";
  
            if (data[i].perms[0].codename == 'MEX_MX_operaciones_general_manager')
              var option6 = "<option value='MEX_MX_operaciones_general_manager' selected>Manager General</option>";
            else
              var option6 = "<option value='MEX_MX_operaciones_general_manager'>Manager General</option>";
          }
          
         
          var permissions = "<td><select onchange='setPerms("+data[i].user__id+",this.value)' style='display:block'>"+ option1 + option2 + option3 + option4 + option5 + option6 + "</select></td>";
          $('#lupita_users_rows').append('<tr>' + name + email + permissions + '</tr>');
          console.log("sisisis");
        }
        /*if(data[0].count>0){
          console.log("suena");
          $("#rappiwhistle").get(0).play();
        }
        else{
          console.log("no suena");
          $("#rappiwhistle").get(0).pause();
          $("#rappiwhistle").get(0).currentTime = 0;
        }*/
      },
      error: function(data){
        console.log("error al refrescar la informacion de alarma");
      }
    }); 
}

function setPerms(user_id, new_perm){
  url_change_perms = "http://lupita.co/request/setNewPerm/" + user_id;
  token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  console.log("Changing perms ...");
  $.ajax({
      url: url_change_perms,
      type: "post",
      data: {permission:new_perm, csrfmiddlewaretoken:token},
      beforeSend: function(data) {
        //Nothing
        //$("#loader").show();
      },
      success: function(data){
        console.log("Se cambiaron bien");
        console.log(data);
      },
      error: function(data){
        console.log("Error al cambiar los permisos ...");
      }
    }); 
}
