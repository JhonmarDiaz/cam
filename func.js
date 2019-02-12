
var estudiantes = [];

$(document).ready(function () {

    //alert("Listo");
    $(".guardar").click(guardar);
    //$("#txtedades").change(refrescar);
    $("#txtedades").keyup(refrescar);
     $("#btnGuardar3").click(traer);
});
function guardar() {

    var n = document.getElementById("txtNombre").value;
    var a = document.getElementById("txtApellido").value;
    var e = document.getElementById("txtDireccion").value;
    //var an=document.getElementById("txtAnionacimiento").value;
    var n = $("#txtNombre").val();
    var a = $("#txtApellido").val();
    var e = $("#txtDireccion").val();
    var an = $("#txtAnionacimiento").val();

    var e1 = new estudiante(n, a, e,  an);

    estudiantes.push(e1);
    
    
    //window.alert(estudiantes[0].edad());

    //$("#lista").append("<li>"+e1.toString()+"</li>");     
    console.log(estudiantes);

    refrescar();

    var n = $("#txtNombre").val("");
    var a = $("#txtApellido").val("");
    var e = $("#txtDireccion").val("");
    var an = $("#txtAnionacimiento").val("");
}

function estudiante(n, a, e, an) {
    this.nombre = n;
    this.apellido = a;
    this.direccion = e;
    this.anio = an;

    this.edad = function () {
        return 2018 - this.anio;
    };

    this.toString = function () {
        return this.nombre + " " + this.apellido + " " + this.direccion + " " + this.edad();
    };
}

function refrescar() {
    var datos = "";
    var edadmin = $("#txtedades").val();
    var objest = {};
    for (var i = 0; i < estudiantes.length; i++)
    {
        objest = estudiantes[i];
        if (objest.edad() < edadmin) {
            datos = datos + "<li>" + objest.toString() + "<input data-indice='" + i + "' type='submit' value='Eliminar' class='eliminar'/> </li>";
        }
    }

    $("#lista").html(datos);
    $(".eliminar").click(
            function () {
                eliminar($(this).data("indice"));
            }
    );
}

function eliminar(indice) {
    //alert("Seguro Eliminar");
    console.log(estudiantes);
    estudiantes.splice(indice, 1);
    console.log(estudiantes);
    //alert(indice);
    refrescar();
}

function traer(){
     $.ajax({
                    type: "POST",
                    //url: "/Home/GetPersons",
					url: "http://sqldesarrollo9208.cloudapp.net/TestP/Home/GetPersons",
                    data: { annoMaximo: 2018 },
                    success: function (r) {
                        agregar(r);
                    },
                    error: function (err) {
                        console.log("Error");
                        console.log(err);
                    }
                });
           console.log("continua");
}
function agregar(datos){
    console.log(datos);
    for (var i = 0; i < datos.length; i++) {
        ob=datos[i];
     var e1 = new estudiante(ob.nombre, ob.apellido, ob.direccion, ob.annoNacimiento);
    estudiantes.push(e1);
    }
    refrescar();
}