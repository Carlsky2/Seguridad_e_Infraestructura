const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('api rest cortesia de fernando'));

app.listen(3000, () => {
    console.log('La API REST está escuchando en el puerto 3000!');
})

