const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'FileHelper'
})

const IMAGES_EXTENSIONS = [
    'JPG',
    'PNG',
    'JPEG'
]

const VIDEOS_EXTENSIONS = ['MP4']

module.exports = {

    /**
     * Parse a filename to get its extension and its type (image, video or whatever).
     * @param {String} filename - The name of the file, with its extension if existing.
     * @returns {Object} The extension and the type of media if handled or an empty object if not.
     */
    getFileExtension(filename) {
        if (!filename) {
            LOG.warn(`Missing filename param to get its extension.`)
            return {}
        }
        LOG.info('------------------------ New file ------------------------')
        LOG.info(`Caught file: ${JSON.stringify(filename)}`)
        let extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length)
        let capitalized = extension.toUpperCase()
        LOG.info(`Caught file extension: ${extension} / ${capitalized}`)
        if (IMAGES_EXTENSIONS && IMAGES_EXTENSIONS.includes(capitalized)) {
            LOG.info('The file is an image.')
            return {
                extension: capitalized,
                type: 'image'
            }
        } else if (VIDEOS_EXTENSIONS && VIDEOS_EXTENSIONS.includes(capitalized)) {
            LOG.info('The file is a video.')
            return {
                extension: capitalized,
                type: 'video'
            }
        }
        LOG.warn('The media cannot be handled yet. Check its extension before trying again.')
        return {}
    }
}