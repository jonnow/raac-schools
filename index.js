// CommonJs
const fastify = require('fastify')({
  logger: true
})
const join = require('path').join
const db = require("./sqlite.js");
const errorMessage =
  "Whoops! Error connecting to the database–please try again!";

const { GetSchoolCoords } = require('./controllers/schoolData');

fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
  root: join(__dirname, "views"),
  layout: "./templates/layout",
  templates: join(__dirname, './views/templates/'),
  viewExt: 'hbs',
  options: {
    partials: {
      head: '/partials/head.hbs'
    }
  },
});

fastify.register(require("@fastify/static"), {
  root: join(__dirname, 'public'),
  prefix: '/public/',
})

fastify.decorate('notFound', (req, reply) => {
  reply.code(404).view('404', { pageTitle: '404 - Page not found' })
})

fastify.setNotFoundHandler(fastify.notFound)

fastify.addHook('preHandler', (req, reply, done) => {
  done()
})

fastify.get('/', async (req, reply) => {
  logVisit(req)
  return reply.view('index', { pageTitle: 'RAAC Schools map' })
})

fastify.get('/getSchools', async (req, reply) => {
  logVisit(req)
  const schoolsData = await GetSchoolCoords()
  return reply.send({ schools: schoolsData })
})

fastify.get('/about', (req, reply) => {
  logVisit(req)
  return reply.view('about', { pageTitle: 'About the RAAC Schools map' })
})

fastify.get('/data', (req, reply) => {
  logVisit(req)
  return reply.view('data', { pageTitle: 'Data used by this website' })
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

const logVisit = (req) => {
  const userHeaders = req.headers
  const timestamp = Date.now()
  const user = {
    method: req.method,
    url: req.url,
    lang: userHeaders['accept-language'],
    userAgent: userHeaders['user-agent'],
    timestamp: timestamp
  }
  db.addVisit(user);
}