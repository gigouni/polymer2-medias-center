

const CONFIG = require('../../config')
const REQUEST_HELPER = require('../helpers/requestHelper')
const FILE_HELPER = require('../helpers/fileHelper')
const FS = require('fs')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasController'
})

module.exports = {
    getAllMedias
}

/**
 * Concatenate the paths of all medias to fetch it to the frontend.
 * @param {Object} req - The request sent by the client to access resource.
 * @param {Object} res - The result of the sent request.
 * @returns {Array|Error} The list of medias paths or an error.
 */
function getAllMedias(req, res) {
    LOG.info('In the MediasController::getAllMedias() function.')
    REQUEST_HELPER.getClientIp(req)
    FS.readdir(CONFIG.MEDIAS_PATH_FROM_BACKEND, (err, files) => {
        let paths = []
        if (err) {
            LOG.error(`Cannot find medias in backend: ${err}`)
            res.json(paths)
            return
        }
        if (!files || files.length === 0) {
            LOG.error(`No medias found in ${__dirname}/${CONFIG.MEDIAS_PATH_FROM_BACKEND}.`)
            res.json(paths)
            return
        }
        files.forEach(filename => {
            const RES = FILE_HELPER.getFileExtension(filename)
            LOG.debug(RES)
            if(!RES || !RES.extension || !RES.type) {
                LOG.warn('The resulting object is not conform. It may be due to an unhandled extension.')
                return
            }
            paths.push({
                extension: RES.extension,
                filename: `${filename}`,
                path: `${CONFIG.MEDIAS_PATH_FROM_FRONTEND}${filename}`,
                type: RES.type
            })
        })
        LOG.info(`Read medias: ${JSON.stringify(paths, 0, 2)}`)
        res.json(paths)
    })
}