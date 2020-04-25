const 
    express = require( 'express' ),
    app = express(),
    { GraphQLSchema, GraphQLObjectType, GraphQLString } = require( 'graphql' ),
    PORT = 8080;

/** Define Schema de GraphQL */
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            message: {
                type: GraphQLString,
                resolve() {
                    return 'Hola mundo!';
                }
            }
        }
    })
});

/** Rutas */
app .get( '/', ( request, response ) => {
    response .send( '<h1>Servidor HTTP con Express!</h1>' );
});

/** Lanza servidor */
app .listen( PORT, () => {
    console .log( `Servidor corriendo en http://localhost:${ PORT }` );
});