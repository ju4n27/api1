var fs = require('fs');

var data = fs.readFileSync('palabras.json');
var palabras = JSON.parse(data);
console.log('**Se leyó el archivo JSON**');

var express = require('express');
var app = express();
var env = require('dotenv');
env.config();
var port = process.env.PORT;
var server = app.listen(port, escuchando);

function escuchando(){
    console.log('**Escuchando el puerto 3000**');
}

app.use(express.static('website'));

app.get('/agregar/:palabra/:puntaje', mandarPalabra);
function mandarPalabra(pedido,respuesta){
    var palabra = pedido.params.palabra;
    var puntaje = Number(pedido.params.puntaje);
    var respuesta2;
    if(!puntaje){
        respuesta2 = {
            mensaje: "El puntaje es necesario!"
        }
    }
    else{
        palabras[palabra] = puntaje;
        data = JSON.stringify(palabras);
        fs.writeFile('palabras.json', data, terminado);
        respuesta2 = {
            mensaje: "Gracias por su palabra."
        }
        function terminado(){
            console.log('Se grabó en el archivo JSON');
        } 
    }
    respuesta.send(respuesta2);
}

app.get('/todos',mandarTodos);
function mandarTodos(pedido,respuesta){
    respuesta.send(palabras);
}

app.get('/buscar/:palabra', busqueda);
function busqueda(pedido,respuesta){
    var palabra = pedido.params.palabra;
    var respuesta2;
    if(palabras[palabra]){
        respuesta2 = {
            status: 'Encontrado!',
            palabra: palabra,
            puntaje: palabras[palabra]
        }
    }
    else{
        respuesta2 = {
            status: 'No encontrado',
            palabra: palabra
        }
    }
    respuesta.send(respuesta2);
}