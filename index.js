const 
    express = require( 'express' ),
    app = express(),
    { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql } = require( 'graphql' ),
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
    /** Habilita consulta a GraphQL */
    graphql(            // Toda consulta retorna una Promesa
        schema,         // Nombre del Schema
        `{ message }`   // Consulta (en este caso al campo llamado 'message')
    ) .then( data => response .json( data ) )
      .catch( error => console .log( error ) );

});

/** Lanza servidor */
app .listen( PORT, () => {
    console .log( `Servidor corriendo en http://localhost:${ PORT }` );
});