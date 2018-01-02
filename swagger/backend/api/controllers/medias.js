'use strict'

const CONFIG = require('../../config')
const FS = require('fs')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasController'
})

module.exports = {
    getAllMedias: getAllMedias
}

function getAllMedias(req, res) {
    LOG.info('In the MediasController::getAllMedias() function.')
    FS.readdir(CONFIG.raspPhotosPathFromBackend, (err, files) => {
        if(err) {
            LOG.error(`Cannot find images in backend: ${err}`)
            return
        }
        if(!files || files.length === 0) {
            LOG.error(`No photos found in ${CONFIG.raspPhotosPathFromBackend}.`)
            return
        }
        let paths = []
        files.forEach(filename => paths.push({path: `${CONFIG.raspPhotosPathFromFrontend}${filename}`}))
        LOG.info(`Read images: ${JSON.stringify(paths, 0, 2)}`)
        res.json(paths)
    })
}