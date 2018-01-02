'use strict'

const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasController'
})

module.exports = {
    getAllMedias: getAllMedias
}

function getAllMedias(req, res) {
    LOG.info('In the MediasController::getAllMedias() function.')
    res.json([{path: 'tmpFilePath.png'}])
}