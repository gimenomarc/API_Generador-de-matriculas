function generarMatriculaAlemania() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let matricula = '';
  
    // 1-3 letras al inicio
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      matricula += letras[Math.floor(Math.random() * letras.length)];
    }
  
    matricula += ' ';
  
    // seguido por 1-4 números
    for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
      matricula += Math.floor(Math.random() * 10);
    }
  
    return matricula;
  }
  
  module.exports = generarMatriculaAlemania;
  