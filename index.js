const 
    express = require( 'express' ),
    app = express(),
    { buildSchema } = require( 'graphql' ),
    PORT = 8080;

/** Define Schema */
const theSchema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }
    type Query {
        getCourses: [Course]
    }
`);

/** Rutas */
app .get( '/', ( request, response ) => {
    response .send( '<h1>Preparando API con GraphQL</h1>' );
});

/** Lanza servidor */
app .listen( PORT, () => {
    console .log( `Servidor corriendo en http://localhost:${ PORT }` );
});