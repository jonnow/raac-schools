const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
  reply.send({ message: 'Hello from Fastify on Vercel!' });
});

module.exports = fastify.serverless();
