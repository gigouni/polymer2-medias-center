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
    FS.readdir(CONFIG.MEDIAS_PATH_FROM_BACKEND, async (err, files) => {
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
        res.json(await _listFiles(files))
    })
}

/**
 * Prepare a Promise for each file to be able to work asynchronously.
 * @private
 * @param {Array} files - The list of files to parse.
 * @return {Array<Promise>} - A list of Promises which need to be fulfilled to be returned. 
 */
function _listFiles(files) {
    return Promise.all(files.map(file => _getChunk(file)))
        .then(result => Promise.resolve(result))
}

/**
 * Get a bunch of metadata about a specific file, using asynchronous functions.
 * @private
 * @param {String} filename - The name of the file.
 * @return {Promise<Object>} - The file metadata if fulfilled or a message if rejected. 
 */
function _getChunk(filename) {
    return new Promise(async (resolve, reject) => {
        const res = await FILE_HELPER.getFileExtension(CONFIG.MEDIAS_PATH_FROM_BACKEND + '' + filename)
        if (!res || !res.type) return reject('The resulting object is not conform. It may be due to an unhandled extension.')
        resolve({
            extension: res.extension,
            filename: `${filename}`,
            path: `${CONFIG.MEDIAS_PATH_FROM_FRONTEND}${filename}`,
            type: res.type
        })
    })
}