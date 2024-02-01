const express = require('express');
const app = express();
const port = 3000;

// Indica que los archivos estáticos están en el directorio 'public'
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
