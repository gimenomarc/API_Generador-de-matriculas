const express = require('express');
const generarMatriculaEspana = require('./generadores/spain');
const generarMatriculaUSA = require('./generadores/usa');
const comprobarMatriculaEspana = require('./comprobadores/spain');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Generador de Matrículas. Utilice /generar-matricula/:pais para generar matrículas.');
});

app.get('/generar-matricula/:pais', (req, res) => {
    const pais = req.params.pais;
  
    let matricula;
  
    switch (pais.toLowerCase()) {
        case 'es':
            matricula = generarMatriculaEspana();
            break;
        case 'us':
            matricula = generarMatriculaUSA();
            break;
        default:
            res.status(400).json({ error: 'País no soportado' });
            return;
    }
  
    res.json({ matricula });
});

app.get('/comprobar-matricula/:pais/:matricula', (req, res) => {
    const pais = req.params.pais;
    const matricula = req.params.matricula;
    
    let esValida;
    
    switch (pais.toLowerCase()) {
        case 'es':
            esValida = comprobarMatriculaEspana(matricula);
            break;
        default:
            res.status(400).json({ error: 'País no soportado' });
            return;
    }
    
    res.json({ esValida });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});