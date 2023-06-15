# API Generador de Matrículas

Este es un servicio API que genera matrículas aleatorias para diferentes países y también puede comprobar la validez de una matrícula para ciertos países.

## Descripción

El proyecto es un servidor de Node.js que utiliza Express para manejar las solicitudes HTTP. Las matrículas se generan y se comprueban mediante módulos específicos del país.

## Endpoints

El servidor maneja los siguientes endpoints:

- `GET /`: Devuelve un mensaje de bienvenida.
- `GET /generar-matricula/:pais`: Genera una matrícula aleatoria para el país especificado. Los países válidos son `es` para España, `us` para Estados Unidos, `aus` para Australia, `de` para Alemania, `fr` para Francia, `uk` para el Reino Unido e `it` para Italia.
- `GET /comprobar-matricula/:pais/:matricula`: Comprueba si una matrícula es válida para el país especificado. Los países soportados para esta funcionalidad son `es` para España, `us` para Estados Unidos, `aus` para Australia, `de` para Alemania, `fr` para Francia, `uk` para el Reino Unido e `it` para Italia.

## Uso

Para utilizar este API, puedes realizar solicitudes HTTP a los endpoints mencionados anteriormente, proporcionando la información necesaria en los parámetros de la URL. Aquí tienes algunos ejemplos:

- Para generar una matrícula aleatoria para Alemania: `GET /generar-matricula/de`
- Para comprobar si una matrícula es válida en Australia: `GET /comprobar-matricula/aus/ABC123`

Recuerda reemplazar `ABC123` con la matrícula que deseas comprobar.

