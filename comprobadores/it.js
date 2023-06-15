function comprobarMatriculaItalia(matricula) {
    // Formato básico de matrículas italianas: 2 letras, 3 dígitos, 2 letras
    const regex = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
    return regex.test(matricula);
}
module.exports = comprobarMatriculaItalia;
