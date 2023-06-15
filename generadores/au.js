function generarMatriculaAustralia() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let matricula = '';
  
    // 3 letras al inicio
    for (let i = 0; i < 3; i++) {
      matricula += letras[Math.floor(Math.random() * letras.length)];
    }
  
    // seguido por 3 números
    for (let i = 0; i < 3; i++) {
      matricula += Math.floor(Math.random() * 10);
    }
  
    return matricula;
  }
  
  module.exports = generarMatriculaAustralia;
  