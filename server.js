const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Ruta para guardar
  if (req.method === 'POST' && req.url === '/api/guardar') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.writeFile('mensaje.txt', data.mensaje, err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al guardar');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Texto guardado con éxito');
          }
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('JSON inválido');
      }
    });
  }

  // Ruta para leer
  else if (req.method === 'GET' && req.url === '/api/leer') {
    fs.readFile('mensaje.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Archivo no encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  }

  // Servir HTML y archivos estáticos desde /public
  else {
    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fullPath = path.join(__dirname, 'website', filePath);
    
    fs.readFile(fullPath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Archivo no encontrado');
      } else {
        const ext = path.extname(fullPath);
        const mime = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css'
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': mime });
        res.end(content);
      }
    });
  }
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
