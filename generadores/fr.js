function generarMatriculaFrancia() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let matricula = '';
  
    // 2 letras al inicio
    for (let i = 0; i < 2; i++) {
      matricula += letras[Math.floor(Math.random() * letras.length)];
    }
  
    // seguido por 3 números
    for (let i = 0; i < 3; i++) {
      matricula += Math.floor(Math.random() * 10);
    }
  
    matricula += ' ';
  
    // terminado con 2 letras
    for (let i = 0; i < 2; i++) {
      matricula += letras[Math.floor(Math.random() * letras.length)];
    }
  
    return matricula;
  }
  
  module.exports = generarMatriculaFrancia;
  