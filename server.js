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
  max: 50 // limit each IP to 5 requests per windowMs
});

app.use(limiter);
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Generador de Matrículas. Utilice /generar-matricula/pais para generar matrículas. Ejemplos de países disponibles: es (España), us (Estados Unidos), uk (Reino Unido), de (Alemania), fr (Francia), it (Italia), aus (Australia). Por ejemplo, /generar-matricula/es generará una matrícula para España.');
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
