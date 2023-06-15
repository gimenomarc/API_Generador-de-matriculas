function comprobarMatriculaUK(matricula) {
    // Formato básico de matrículas del Reino Unido: 2 letras, 2 dígitos, espacio, 3 letras
    const regex = /^[A-Z]{2}\d{2}\s[A-Z]{3}$/;
    return regex.test(matricula);
}
module.exports = comprobarMatriculaUK;