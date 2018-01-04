

const CONFIG = require('./config')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'Swagger::App'
})

let SwaggerExpress = require('swagger-express-mw')
let app = require('express')()
module.exports = app

let config = {
    appRoot: __dirname
}

SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) {
        throw err
    }

    // Install middleware
    swaggerExpress.register(app)

    let port = CONFIG.BACKEND_PORT || 8002
    app.listen(port)

    if (swaggerExpress.runner.swagger.paths['/medias']) {
        LOG.info(`try this:\ncurl http://127.0.0.1:${port}/api/medias`)
    }
})