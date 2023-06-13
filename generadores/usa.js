function generarMatriculaUSA() {
    const letras = generarLetrasAleatorias(3);
    const numeros = generarAleatorio(100, 999);
    return `${letras}${numeros}`;
  }
  
  function generarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function generarLetrasAleatorias(numLetras) {
    let resultado = '';
    for (let i = 0; i < numLetras; i++) {
      const charCode = generarAleatorio(65, 90);  // Códigos ASCII para A-Z
      resultado += String.fromCharCode(charCode);
    }
    return resultado;
  }
  
  module.exports = generarMatriculaUSA;
