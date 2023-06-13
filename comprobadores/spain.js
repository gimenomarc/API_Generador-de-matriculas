function comprobarMatriculaEspana(matricula) {
    // Comprobamos que tenga la longitud correcta
    if (matricula.length !== 7) {
      return false;
    }
  
    // Desglosamos la matrícula en dígitos y letras
    const digitos = matricula.slice(0, 4);
    const letras = matricula.slice(4);
  
    // Comprobamos que la parte de los dígitos solo contenga números
    if (!/^\d{4}$/.test(digitos)) {
      return false;
    }
  
    // Comprobamos que la parte de las letras solo contenga las letras permitidas
    if (!/^[BCDFGHJKLMNPRSTVWXYZ]{3}$/.test(letras)) {
      return false;
    }
  
    // Si ha pasado todas las comprobaciones, la matrícula es válida
    return true;
  }
  
  module.exports = comprobarMatriculaEspana;
  