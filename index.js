// CommonJs
const fastify = require('fastify')({
  logger: true
})
const join = require('path').join

//const schoolsData = require('./data/raac_data.json');
const schoolsData = [
    {
        'type': 'Feature',
        'properties': {
            'id': 1,
            'name': 'test',
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
                -4.0527319,
                51.728138, 
            ],
        }
    },  
    {
        'type': 'Feature',
        'properties': {
            'id': 2,
            'name': 'test',
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
                -4.0527319,
                53.728138, 
            ],
        }
    },  
    {
        'type': 'Feature',
        'properties': {
            'id': 3,
            'name': 'test',
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
                -4.0527319,
                54.728138, 
            ],
        }
    },  
    {
        'type': 'Feature',
        'properties': {
            'id': 4,
            'name': 'test',
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
                -4.0527319,
                55.728138, 
            ],
        }
    },  
    {
        'type': 'Feature',
        'properties': {
            'id': 5,
            'name': 'test',
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
               -4.0527319,
                56.728138, 
            ],
        }
    },    
];

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


fastify.get('/', async (request, reply) => {
  return reply.view('index', {pageTitle: 'Homepage', schoolsData: schoolsData})
})

fastify.get('/update', (request, reply) => {
    if(request.query.postcodes == 1) {
        console.log('Updating postcodes...')
    }

    return reply.send({
        'status': 'success'
    })
})
//https://api.ideal-postcodes.co.uk/v1/addresses?api_key=iddqd&lon=-0.12767&lat=51.503541
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