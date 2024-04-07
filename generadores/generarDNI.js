function generarDNI() {
    const letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let numeroDNI = '';
    let letraDNI = '';
  
    for (let i = 0; i < 8; i++) {
      numeroDNI += Math.floor(Math.random() * 10);
    }
  
    const resto = numeroDNI % 23;
    letraDNI = letrasDNI.charAt(resto);
  
    return numeroDNI + letraDNI;
  }
  
  module.exports = generarDNI;
  