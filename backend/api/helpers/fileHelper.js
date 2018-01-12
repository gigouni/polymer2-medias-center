'use strict'

const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'FileHelper'
})

const IMAGES_EXTENSIONS = [
    'JPG',
    'PNG',
    'JPEG'
]

module.exports = {

    getFileExtension(filename) {
        if (!filename) {
            LOG.warn(`Missing filename param to get its extension.`)

            return
        }
        LOG.info(`Caught file: ${JSON.stringify(filename)}`)
        let extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
        let capitalized = extension.toUpperCase()
        LOG.info(`Caught file extension: ${extension} / ${capitalized}`)
        if(IMAGES_EXTENSIONS.includes(capitalized)) {
            LOG.info('IT IS AN IMAGE!')
        } else {
            LOG.info('IT IS A VIDEO!')
        }
    }
}