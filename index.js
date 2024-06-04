const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Datos de ejemplo
let tasks = [
    { id: 1, title: 'Tarea 1', description: 'Realizar trabajo rest api', done: false },
    { id: 2, title: 'Tarea 2', description: 'realizar granpql intento 5', done: false }
];

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Obtener una tarea específica por ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    Object.assign(task, req.body);
    res.json(task);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
