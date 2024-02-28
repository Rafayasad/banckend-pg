console.clear();
const fastify = require('fastify');
const { Pool } = require('pg');

const server = fastify({
    logger: true,
});

server.register(require('fastify-knexjs'), {
    client: 'pg', // Specify the SQL database client (e.g., 'pg', 'mysql', 'sqlite3', etc.)
    connection: {
        // Provide the database connection configuration
        host: 'localhost',
        user: 'postgres',
        password: '12345',
        database: 'postgres',
    },
}, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

server.get('/', (req, res) => {
    res.code(200).send('Server is running now.');
});


const fastifyServer = async () => {
    try {
        await server.listen({ port: 3000 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
fastifyServer();
