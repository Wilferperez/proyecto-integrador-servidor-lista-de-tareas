const http = require('http');

// Arreglo de tareas
const tasks = [
  { id: 1, task: 'Hacer ejercicio en las mañanas' },
  { id: 2, task: 'Tomar proteinas' },
  { id: 3, task: 'Tomar creatina' }
];

// Crear el servidor
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'GET' && req.url === '/tasks') {
    // Si la solicitud es una petición GET a la ruta '/tasks', devolvemos el arreglo de tareas en formato JSON
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
  } else {
    // Si la solicitud no coincide con la ruta, respondemos con un error 404
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

// Escuchar en un puerto específico (por ejemplo, el puerto 3000)
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


