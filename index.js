const 
    express = require( 'express' ),
    app = express(),
    { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, graphql } = require( 'graphql' ),
    PORT = 8080;

/** Define Schemas de GraphQL */
const courseSchema = new GraphQLObjectType({
    name: 'Course',
    fields: {
        title: {
            type: GraphQLString,
            views: GraphQLInt
        }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",          // Tipo que indica que es el Raiz a partir de donde se realizaran las consultas
        fields: {
            message: {
                type: GraphQLString,
                resolve() {
                    return 'Hola mundo!';
                }
            },
            course: {
                type: courseSchema,
                resolve() {
                    return { title: 'Curso de GraphQL', views: 1000 }
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