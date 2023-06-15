function generarMatriculaEspana() {
    const numeros = generarAleatorio(1000, 9999);
    const letras = generarConsonantesAleatorias(3);
    return `${numeros}${letras}`;
  }
  
  function generarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function generarConsonantesAleatorias(numLetras) {
    const consonantes = 'BCDFGHJKLMNPQRSTVWXYZ';
    let resultado = '';
    for (let i = 0; i < numLetras; i++) {
      const indiceAleatorio = generarAleatorio(0, consonantes.length - 1);
      resultado += consonantes[indiceAleatorio];
    }
    return resultado;
  }
  
  module.exports = generarMatriculaEspana;