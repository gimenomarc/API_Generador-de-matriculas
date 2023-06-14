# API Generador de Matrículas

Este es un servicio API que genera matrículas aleatorias para diferentes países y también puede comprobar la validez de una matrícula para ciertos países.

## Descripción

El proyecto es un servidor de Node.js que utiliza Express para manejar las solicitudes HTTP. Las matrículas se generan y se comprueban mediante módulos específicos del país.

## Endpoints

El servidor maneja los siguientes endpoints:

- `GET /`: Devuelve un mensaje de bienvenida.
- `GET /generar-matricula/:pais`: Genera una matrícula aleatoria para el país especificado. Los países válidos son `es` para España y `us` para Estados Unidos.
- `GET /comprobar-matricula/:pais/:matricula`: Comprueba si una matrícula es válida para el país especificado. Actualmente solo España (`es`) es soportado para esta funcionalidad.
