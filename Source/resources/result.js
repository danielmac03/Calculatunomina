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

var tipo = url.searchParams.get("ftipo");

var beneficios = url.searchParams.get("fbeneficios");
beneficios = parseFloat(beneficios);

//Porcentajes de cada tipo de calculo
if(tipo == "empleado"){
    var porcentaje_cc = 4.7;
    var porcentaje_paro = url.searchParams.get("fcontrato");
    if (porcentaje_paro == "temporal"){
        porcentaje_paro = 1.6;
    }else{
        porcentaje_paro = 1.55;
    }
    var porcentaje_fp = 0.1;
    var porcentaje_fm = 2;
    var porcentaje_estructurales_no = 4.7;    
}else{
    var porcentaje_cc = 23.6;
    var porcentaje_paro = 5.5;
    var porcentaje_fp = 0.6;
    var porcentaje_fm = 12;
    var porcentaje_estructurales_no = 23.6;    
    var porcentaje_fogasa = 0.2;
    irpf = 0;
}


//Si los checkbox se han marcado en los extras se le asignan 
//a la variable con el valor al que hacen referencia
var csalari_base = url.searchParams.get("csalario_base");
if (csalari_base == 1){
    csalari_base = salario_base;
}else{
    csalari_base = 0;
}

var cantiguedad = url.searchParams.get("cantiguedad");
if (cantiguedad == 1){
    cantiguedad = antiguedad;
}else{
    cantiguedad = 0;
}

var chextras = url.searchParams.get("chextras");
if (chextras == 1){
    chextras = fm + estructurales_no;
}else{
    chextras = 0;
}

var cextras = url.searchParams.get("cextras");
if (cextras == 1){
    cextras = extras;
}else{
    cextras = 0;
}

//Si los parametros no requerios el valor és Nan se cambia a 0
antiguedad = isNaN(antiguedad) ? 0 : antiguedad;
fm = isNaN(fm) ? 0 : fm;
estructurales_no = isNaN(estructurales_no) ? 0 : estructurales_no;
extras = isNaN(extras) ? 0 : extras;
irpf = isNaN(irpf) ? 0 : irpf;
pagas = isNaN(pagas) ? 0 : pagas;
beneficios = isNaN(beneficios) ? 0 : beneficios;

//Cálculo de la nómina
var meritado = salario_base + antiguedad + fm + estructurales_no + extras;

var hextras = fm + estructurales_no;

var prorrata = (((csalari_base + cantiguedad + chextras + cextras) * pagas) + beneficios) /12;

var bccc = meritado - hextras + prorrata;

var cc = bccc/100 * porcentaje_cc;

var bccp = bccc + hextras;

var paro = bccp/100 * porcentaje_paro;

var fp = bccp/100 * porcentaje_fp;

var fm2 = fm/100 * porcentaje_fm;

var estructurales_no2 = estructurales_no/100 * porcentaje_estructurales_no;

irpf = meritado/100 * irpf;

if (tipo == "empleado"){
    var fogasa = 0;
}else{
    var fogasa = bccp/100 * porcentaje_fogasa;
}

var deduido = cc + paro + fp + fm2 + estructurales_no2 + irpf + fogasa;

if (tipo == "empleado"){
    var total = meritado - deduido;
}else{
    var total = meritado + deduido;
}

//Obtener los tags html i añadir los valores respectivos
document.getElementById("cc").innerHTML += cc.toFixed(2) + ' €';
document.getElementById("paro").innerHTML += paro.toFixed(2) + ' €';
document.getElementById("fp").innerHTML += fp.toFixed(2) + ' €';
document.getElementById("fm2").innerHTML += fm2.toFixed(2) + ' €';
document.getElementById("estructurales_no2").innerHTML += estructurales_no2.toFixed(2) + ' €';
if (tipo == "empresa"){
    document.getElementById("var").innerHTML = 'Fogasa: ' + fogasa.toFixed(2) + ' €';
}else{
    document.getElementById("var").innerHTML = 'IRPF: ' + irpf.toFixed(2) + ' €';
}

document.getElementById("salario_base").innerHTML += salario_base.toFixed(2) + ' €';
document.getElementById("antiguedad").innerHTML += antiguedad.toFixed(2) + ' €';
document.getElementById("fm").innerHTML = 'Fuerza mayor: ' + fm.toFixed(2) + ' €';
document.getElementById("estructurales_no").innerHTML += estructurales_no.toFixed(2) + ' €';
document.getElementById("extras").innerHTML += extras.toFixed(2) + ' €';

document.getElementById("deduido").innerHTML += '<b>' + deduido.toFixed(2) + ' €' + '</b>';
document.getElementById("total").innerHTML += '<b>' + total.toFixed(2) + ' €' + '</b>';