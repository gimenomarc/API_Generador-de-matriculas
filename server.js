const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); 
const generarMatriculaEspana = require('./generadores/spain');
const generarMatriculaUSA = require('./generadores/usa');
const generarMatriculaUK = require('./generadores/gb');
const generarMatriculaAlemania = require('./generadores/de');
const generarMatriculaFrancia = require('./generadores/fr');
const generarMatriculaItalia = require('./generadores/it');
const generarMatriculaAustralia = require('./generadores/au');
const comprobarMatriculaEspana = require('./comprobadores/spain');
const comprobarMatriculaUSA = require('./comprobadores/usa');
const comprobarMatriculaUK = require('./comprobadores/gb');
const comprobarMatriculaAlemania = require('./comprobadores/de');
const comprobarMatriculaFrancia = require('./comprobadores/fr');
const comprobarMatriculaItalia = require('./comprobadores/it');
const comprobarMatriculaAustralia = require('./comprobadores/au');
const determinarPais = require('./comprobadores/general');

const app = express();
const port = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50 // limit each IP to 50 requests per minute
});

app.use(limiter);
app.use(cors());

// Mensaje de bienvenida
app.get('/', (req, res) => {
  const welcomeMessage = `
    <h1>Bienvenido a la API de Generador de Matrículas</h1>
    <p>Utilice los siguientes métodos para generar y comprobar matrículas:</p>
    <ul>
      <li>Generar Matrícula: <code>/generar-matricula/:pais</code></li>
      <li>Determinar País por Matrícula: <code>/determinar-pais/:matricula</code></li>
      <li>Comprobar Matrícula: <code>/comprobar-matricula/:pais/:matricula</code></li>
    </ul>
    <p>Ejemplos de países disponibles:</p>
    <ul>
      <li>España (es)</li>
      <li>Estados Unidos (us)</li>
      <li>Reino Unido (uk)</li>
      <li>Alemania (de)</li>
      <li>Francia (fr)</li>
      <li>Italia (it)</li>
      <li>Australia (aus)</li>
    </ul>
    <p>Ejemplo: <code>/generar-matricula/es</code> generará una matrícula para España.</p>
  `;

  res.send(welcomeMessage);
});

// GENERADORES DE MATRICULAS
app.get('/generar-matricula/:pais', (req, res) => {
  const pais = req.params.pais;
  const cantidad = Math.min(req.query.cantidad || 1, 50); // obtener la cantidad desde los parámetros de consulta, con un máximo de 50

  let matriculas = [];

  for (let i = 0; i < cantidad; i++) {
    let matricula;

    switch (pais.toLowerCase()) {
      case 'es':
        matricula = generarMatriculaEspana();
        break;
      case 'us':
        matricula = generarMatriculaUSA();
        break;
      case 'uk':
        matricula = generarMatriculaUK();
        break;
      case 'de':
        matricula = generarMatriculaAlemania();
        break;
      case 'fr':
        matricula = generarMatriculaFrancia();
        break;
      case 'it':
        matricula = generarMatriculaItalia();
        break;
      case 'aus':
        matricula = generarMatriculaAustralia();
        break;
      default:
        res.status(400).json({ error: 'País no encontrado' });
        return;
    }

    matriculas.push(matricula);
  }

  res.json({ matriculas });
});

// DETERMINADOR DE PAÍS
app.get('/determinar-pais/:matricula', (req, res) => {
  const matricula = req.params.matricula;
  const pais = determinarPais(matricula);

  if (!pais) {
    res.status(400).json({ error: 'Matrícula no reconocida' });
    return;
  }

  res.json({ pais });
});

// COMPROBADORES DE MATRICULAS
app.get('/comprobar-matricula/:pais/:matricula', (req, res) => {
  const pais = req.params.pais;
  const matricula = req.params.matricula;

  let esValida;

  switch (pais.toLowerCase()) {
    case 'es':
      esValida = comprobarMatriculaEspana(matricula);
      break;
    case 'us':
      esValida = comprobarMatriculaUSA(matricula);
      break;
    case 'uk':
      esValida = comprobarMatriculaUK(matricula);
      break;
    case 'de':
      esValida = comprobarMatriculaAlemania(matricula);
      break;
    case 'fr':
      esValida = comprobarMatriculaFrancia(matricula);
      break;
    case 'it':
      esValida = comprobarMatriculaItalia(matricula);
      break;
    case 'aus':
      esValida = comprobarMatriculaAustralia(matricula);
      break;
    default:
      res.status(400).json({ error: 'País no encontrado' });
      return;
  }

  res.json({ esValida });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
