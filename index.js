const 
    express = require( 'express' ),
    app = express(),
    { buildSchema } = require( 'graphql' ),
    gqlHttp = require( 'express-graphql' ),
    PORT = 8080;

let courses = require( './courses' );

/** Define Schema (Schema Definition Language)*/
const theSchema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }
    type Alert {
        message: String
    }
    input CourseInput {
        title: String!
        views: Int
    }
    type Query {
        getCourses( page: Int, limit: Int = 1 ): [Course]
        getCourse( id: ID! ) : Course
    } 
    type Mutation {
        addCourse( input: CourseInput ) : Course
        updateCourse( id: ID!, input: CourseInput ) : Course
        deleteCourse( id: ID! ) : Alert
    }
`);

/** Midleware */
app .use( '/graphql', gqlHttp({
    schema: theSchema,
    rootValue: {        // Raiz de consultas de GraphQL
        getCourses({ page, limit }) {
            
            if( page !== undefined ) {
                console .log( 'pagina', page, 'muestra', limit );
                return courses .slice( ( page - 1 ) * limit, ( page ) * limit );
            }
            
            return courses;
        },
        getCourse({ id }) {     // Destructuring
            console .log( 'Course ID', id );
            
            return course;
        },
        addCourse({ input }) {
            const 
                { title, views } = input,       // Destructuring
                id = courses .length + 1,
                course = { id, title, views };

            courses .push( course );
            return course;
        }, 
        updateCourse({ id, input }) {
            const 
                index = courses .findIndex( course => id == course .id );
                course = courses[ index ],
                newCourse = Object .assign( course, input );     // Spread
            
            courses[ index ] = newCourse;

            return newCourse;
        },
        deleteCourse({ id }) {
            courses = courses .filter( course => id != course .id );

            return { message: `El curso con id ${ id } fue eliminado` }
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