const fastify = require('fastify')({ logger: true });
let http = require('http').Server(fastify);
let io = require('socket.io')(http);

// App constants
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const template_prefix = "/templates"

// Templating
fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    }
})

// Run the server
const start = async () => {
    try {
        await fastify.listen(port, host);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

// Start the server
start();
