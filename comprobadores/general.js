// general.js
const comprobarMatriculaEspana = require('./spain');
const comprobarMatriculaUSA = require('./usa');
const comprobarMatriculaUK = require('./gb');
const comprobarMatriculaAlemania = require('./de');
const comprobarMatriculaFrancia = require('./fr');
const comprobarMatriculaItalia = require('./it');
const comprobarMatriculaAustralia = require('./au');

const determinarPais = (matricula) => {
  if (comprobarMatriculaEspana(matricula)) return 'Spain';
  if (comprobarMatriculaUSA(matricula)) return 'USA';
  if (comprobarMatriculaUK(matricula)) return 'UK';
  if (comprobarMatriculaAlemania(matricula)) return 'Germany';
  if (comprobarMatriculaFrancia(matricula)) return 'France';
  if (comprobarMatriculaItalia(matricula)) return 'Italy';
  if (comprobarMatriculaAustralia(matricula)) return 'Australia';

  return null;
};

module.exports = determinarPais;
