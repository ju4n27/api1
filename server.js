//archivo js "server.js"
//Esto es solo una prueba, a ver si muere la "base de datos"
var fs = require('fs');

var DB = fs.readFileSync('DB.json');
var textosGuardados = JSON.parse(DB);
console.log('**Se leyó el archivo JSON**');

var express = require('express');
var app = express();
var env = require('dotenv');
env.config();
var port = process.env.PORT;
var server = app.listen(port, escuchando);

function escuchando(){
    console.log('**Escuchando el puerto 2727**');
}
app.use(express.static('website'));
app.use(express.json({limit:'1mb'}));

app.get('/servicio', mandarTexto);
function mandarTexto(pedido,respuesta){
    console.log("** Han mandado algo **");
    const data = pedido.body;
    data.tiempoDeLlegada = Date.now();
    
    textosGuardados.push(texto);
    data = JSON.stringify(textosGuardados);
    fs.writeFile('DB.json', data, terminado);
    function terminado(){
        console.log('Se grabó en el archivo JSON');
    }
    respuesta.json({
        status: '**Se pudo mandar!',
        data: data
    });
}

app.get('/servicio', recibirTexto);
function recibir(pedido,respuesta){
    respuesta.json({
       data: DB
    }); 
}
