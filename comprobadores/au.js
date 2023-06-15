function comprobarMatriculaAustralia(matricula) {
    // Formato básico de matrículas australianas: 1-3 letras, 2-4 dígitos, 1-3 letras
    const regex = /^[A-Z]{1,3}\d{2,4}[A-Z]{1,3}$/;
    return regex.test(matricula);
}
module.exports = comprobarMatriculaAustralia;
