'use strict'

const CONFIG = require('../../config')
const REQUEST_HELPER = require('../helpers/requestHelper')
const FS = require('fs')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasController'
})

module.exports = {
    getAllMedias: getAllMedias
}

/**
 * Concatenate the paths of all images to fetch it to the frontend.
 * @param {Object} req - The request sent by the client to access resource.
 * @param {Object} res - The result of the sent request.
 * @returns {Array|Error} The list of images paths or an error.
 */
function getAllMedias(req, res) {
    LOG.info('In the MediasController::getAllMedias() function.')
    REQUEST_HELPER.getClientIp(req)
    FS.readdir(CONFIG.MEDIAS_PATH_FROM_BACKEND, (err, files) => {
        if(err) {
            LOG.error(`Cannot find images in backend: ${err}`)
            return
        }
        if(!files || files.length === 0) {
            LOG.error(`No photos found in ${__dirname}/${CONFIG.MEDIAS_PATH_FROM_BACKEND}.`)
            return
        }
        let paths = []
        files.forEach(filename => paths.push({path: `${CONFIG.MEDIAS_PATH_FROM_FRONTEND}${filename}`}))
        LOG.info(`Read images: ${JSON.stringify(paths, 0, 2)}`)
        res.json(paths)
    })
}