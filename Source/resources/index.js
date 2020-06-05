'use strict'

var tipo = document.getElementById("tipo");
var ftipo = document.getElementById("ftipo");
var beneficios = document.getElementById("beneficios");
var fbeneficios = document.getElementById("fbeneficios");

function empresa(){
    beneficios.style.display = "none";
    tipo.style.display = "none";
    fbeneficios.required = false;
    ftipo.required = false;
}

function empleado(){
    beneficios.style.display = "block";
    tipo.style.display = "block";
    fbeneficios.required = true;
    ftipo.required = true;
}