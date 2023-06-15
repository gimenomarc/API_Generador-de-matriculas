function comprobarMatriculaUSA(matricula) {
    // Comprobamos que tenga la longitud correcta
    if (matricula.length !== 7) {
        return false;
    }

    // Comprobamos que la matrícula solo contenga letras y números
    if (!/^[A-Z0-9]{7}$/.test(matricula)) {
        return false;
    }

    // Si ha pasado todas las comprobaciones, la matrícula es válida
    return true;
}

module.exports = comprobarMatriculaUSA;