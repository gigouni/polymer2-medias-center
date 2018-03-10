const config = require('../../config')
const requestHelper = require('../helpers/requestHelper')
const fileHelper = require('../helpers/fileHelper')
const fs = require('fs')
const bunyan = require('bunyan')
const log = bunyan.createLogger({
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
    log.info('In the MediasController::getAllMedias() function.')
    requestHelper.getClientIp(req)
    fs.readdir(config.MEDIAS_PATH_FROM_BACKEND, async (err, files) => {
        if (err) {
            log.error(`Cannot find medias in backend: ${err}`)
            res.json([])
            return
        }
        if (!files || files.length === 0) {
            log.error(`No medias found in ${__dirname}/${config.MEDIAS_PATH_FROM_BACKEND}.`)
            res.json([])
            return
        }

        let list
        try {
            list = await _listFiles(files)
            // Remove empty objects from array
            list = list.filter(value => Object.keys(value).length !== 0) 
        } catch (e) {
            log.warn(`Cannot list files: ${e}`)
            list = []
        }

        res.json(list)
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
    return new Promise((resolve, reject) => {
        const res = fileHelper.getFileExtension(config.MEDIAS_PATH_FROM_BACKEND + '' + filename)
        if (!res || !res.type) resolve({})
        resolve({
            extension: res.extension,
            filename: `${filename}`,
            path: `${config.MEDIAS_PATH_FROM_FRONTEND}${filename}`,
            type: res.type
        })
    })
}