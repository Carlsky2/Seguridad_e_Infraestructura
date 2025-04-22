const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

//rutas
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM usuarios');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/', async (req, res) => {
    const { nombre, edad } = req.body;
    try {
        await pool.query('INSERT INTO usuarios(nombre, edad) VALUES($1, $2)', [nombre, edad]);
        res.status(200).send({message: 'Usuario creado correctamente'});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE usuarios( id SERIAL PRIMARY KEY, nombre VARCHAR(50), edad INT)');
        res.status(200).send({message: 'Tabla creada correctamente'});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        
    }
})

app.get('/drop', async (req, res) => {
    try {
        await pool.query('DROP TABLE IF EXISTS usuarios');
        res.status(200).send({ message: 'Tabla "usuarios" eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


app.listen(port, () => console.log(`Server funcionando en el puerto: ${port}`));