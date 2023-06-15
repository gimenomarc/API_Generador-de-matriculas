function generarMatriculaUK() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let matricula = '';
  
    // 2 letras al inicio
    for (let i = 0; i < 2; i++) {
      matricula += letras[Math.floor(Math.random() * letras.length)];
    }
  
    // seguido por 2 números
    for (let i = 0; i < 2; i++) {
      matricula += Math.floor(Math.random() * 10);
    }
  
    // terminado con 3 letras
    for (let i = 0; i < 3; i++) {
      matricula += letras[Math.floor(Math.random() * letras.length)];
    }
  
    return matricula;
  }
  
  module.exports = generarMatriculaUK;
  