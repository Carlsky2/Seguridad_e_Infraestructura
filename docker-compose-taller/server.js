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

app.put('/', async (req, res) => {
    const { id, nombre, edad } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, edad = $2 WHERE id = $3', [nombre, edad, id]);
        if (result.rowCount === 0) {
            res.status(404).send({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).send({ message: 'Usuario actualizado correctamente' });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Eliminar un usuario existente
app.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).send({ message: 'Usuario eliminado correctamente' });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

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