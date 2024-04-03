const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const Parser = require('rss-parser');
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
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 50
});

app.use(limiter);
app.use(cors());

const parser = new Parser();

// WELCOME MESSAGE
app.get('/v1/', (req, res) => {
  const welcomeMessage = {
    message: "Welcome to the License Plate Generator API",
    endpoints: {
      generate_license_plate: {
        description: "Generate a random license plate for the specified country.",
        endpoint: "/generate-license-plate/:country?quantity=:quantity",
        example: "/generate-license-plate/es?quantity=5"
      },
      determine_country: {
        description: "Determine the country by a given license plate.",
        endpoint: "/determine-country/:licensePlate",
        example: "/determine-country/123ABC"
      },
      validate_license_plate: {
        description: "Validate a license plate for the specified country.",
        endpoint: "/validate-license-plate/:country/:licensePlate",
        example: "/validate-license-plate/es/123ABC"
      }
    },
    available_countries: ["es", "us", "uk", "de", "fr", "it", "aus"],
    quantity_parameter: "quantity",
    usage_example: "/generate-license-plate/es?quantity=5"
  };

  res.json(welcomeMessage);
});

// GENERADORES DE MATRICULAS
app.get('/v1/generate-license-plate/:country', (req, res) => {
  const pais = req.params.country;
  const cantidad = Math.min(req.query.quantity || 1, 500);

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
app.get('/v1/determine-country/:licensePlate', (req, res) => {
  const matricula = req.params.licensePlate; // Corregido a req.params.licensePlate
  const pais = determinarPais(matricula);

  if (!pais) {
    res.status(400).json({ error: 'Matrícula no reconocida' });
    return;
  }

  res.json({ pais });
});

// COMPROBADORES DE MATRICULAS
app.get('/v1/validate-license-plate/:country/:licensePlate', (req, res) => {
  const pais = req.params.pais;
  const matriculas = req.query.matriculas.split(',');

  if (matriculas.length > 100) {
    res.status(400).json({ error: 'No se puede validar más de 100 matrículas a la vez' });
    return;
  }

  const resultados = {};

  for (let matricula of matriculas) {
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

    resultados[matricula] = esValida;
  }

  res.json({ resultados });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});