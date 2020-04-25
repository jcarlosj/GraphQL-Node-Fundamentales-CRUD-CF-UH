const 
    express = require( 'express' ),
    app = express(),
    { buildSchema } = require( 'graphql' ),
    gqlHttp = require( 'express-graphql' ),
    PORT = 8080,
    courses = require( './courses' );

/** Define Schema (Schema Definition Language)*/
const theSchema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }
    type Query {
        getCourses: [Course]
        getCourse( id: ID! ) : Course
    } 
    type Mutation {
        addCourse( title: String!, views: Int ) : Course
    }
`);

/** Midleware */
app .use( '/graphql', gqlHttp({
    schema: theSchema,
    rootValue: {        // Raiz de consultas de GraphQL
        getCourses() {
            return courses;
        },
        getCourse({ id }) {     // Destructuring
            console .log( 'Course ID', id );

            const course = courses .find( course => id == course .id );
            return course;
        },
        addCourse({ title, views }) {
            const 
                id = courses .length + 1,
                course = { id, title, views };

            courses .push( course );
            return course;
        }
    },
    graphiql: true      // Herramienta para el navegador para validar consultas de GraphQL
}));

/** Rutas */
app .get( '/', ( request, response ) => {
    response .send( '<h1>Preparando API con GraphQL</h1>' );
    console .log( courses );
});

/** Lanza servidor */
app .listen( PORT, () => {
    console .log( `Servidor corriendo en http://localhost:${ PORT }` );
});