const 
    express = require( 'express' ),
    app = express(),
    PORT = 8080;

/** Rutas */
app .get( '/', ( request, response ) => {
    response .send( '<h1>Servidor HTTP con Express!</h1>' );
});

/** Lanza servidor */
app .listen( PORT, () => {
    console .log( `Servidor corriendo en http://localhost:${ PORT }` );
});