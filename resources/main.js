'use strict'

//Obtener url
var url_string = window.location.href;
var url = new URL(url_string);

//Asignar los parametros de la url a las respectivas variables
var salario_base = url.searchParams.get("fsalario_base");
salario_base = parseFloat(salario_base);

var antiguedad = url.searchParams.get("fantiguedad");
antiguedad = parseFloat(antiguedad);

var fm = url.searchParams.get("ffm");
fm = parseFloat(fm)

var estructurales_no = url.searchParams.get("festructurales_no");
estructurales_no = parseFloat(estructurales_no)

var extras = url.searchParams.get("fextras");
extras = parseFloat(extras);

var pagas = url.searchParams.get("fpagas");
pagas = parseFloat(pagas);

var irpf = url.searchParams.get("firpf");
irpf = parseFloat(irpf);

//Si los checkbox se han marcado en los extras se le asignan 
//a la variable con el valor al que hacen referencia
var csalari_base = url.searchParams.get("csalario_base");
if (csalari_base == 1){
    csalari_base = salario_base;
}else{
    csalari_base = 0
}

var cantiguedad = url.searchParams.get("cantiguedad");
if (cantiguedad == 1){
    cantiguedad = antiguedad;
}else{
    cantiguedad = 0
}

var chextras = url.searchParams.get("chextras");
if (chextras == 1){
    chextras = fm + estructurales_no;
}else{
    chextras = 0
}

var cextras = url.searchParams.get("cextras");
if (cextras == 1){
    cextras = extras;
}else{
    cextras = 0
}

var contrato = url.searchParams.get("fcontrato");
if (contrato == "temporal"){
    contrato = 1.60;
}else{
    contrato = 1.55;
}
contrato = parseFloat(contrato)

//Cálculo de la nómina
var meritado = salario_base + antiguedad + fm + estructurales_no + extras;

var hextras = fm + estructurales_no;

var prorrata = (csalari_base + cantiguedad + chextras + cextras) * pagas /12;

const bccc = meritado - hextras + prorrata;

var cc = bccc/100 * 4.7;

var bccp = bccc + hextras;

var paro = bccp/100 * contrato;

var fp = bccp/100 * 0.1;

var fm2 = fm/100 * 2;

var estructurales_no2 = estructurales_no/100 * 4.7;

irpf = meritado/100 * irpf;

var deduido = cc + paro + fp + fm2 + estructurales_no2 + irpf;

var recibir = meritado - deduido;

//Obtener los tags html i añadir los valores respectivos
document.getElementById("cc").innerHTML += cc.toFixed(2) + '€';
document.getElementById("paro").innerHTML += paro.toFixed(2) + '€';
document.getElementById("fp").innerHTML += fp.toFixed(2) + '€';
document.getElementById("fm2").innerHTML += fm2.toFixed(2) + '€';
document.getElementById("estructurales_no2").innerHTML += estructurales_no2.toFixed(2) + '€';
document.getElementById("irpf").innerHTML += irpf.toFixed(2) + '€';

document.getElementById("salario_base").innerHTML += salario_base.toFixed(2) + '€';
document.getElementById("antiguedad").innerHTML += antiguedad.toFixed(2) + '€';
document.getElementById("fm").innerHTML += fm.toFixed(2) + '€';
document.getElementById("estructurales_no").innerHTML += estructurales_no.toFixed(2) + '€';
document.getElementById("extras").innerHTML += extras.toFixed(2) + '€';

document.getElementById("deduido").innerHTML += '<b>' + deduido.toFixed(2) + '€' + '</b>';
document.getElementById("recibir").innerHTML += '<b>' + recibir.toFixed(2) + '€' + '</b>';