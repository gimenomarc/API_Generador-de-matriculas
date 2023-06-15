
function comprobarMatriculaAlemania(matricula) {
    // Formato básico de matrículas alemanas: 1-3 letras, 1-2 dígitos, 1-2 letras, 1-4 dígitos
    const regex = /^[A-Z]{1,3}\-\d{1,2}[A-Z]{1,2}\-\d{1,4}$/;
    return regex.test(matricula);
}
module.exports = comprobarMatriculaAlemania;
