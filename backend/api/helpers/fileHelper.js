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

            return {}
        }
        LOG.info('------------------------ New file ------------------------')
        LOG.info(`Caught file: ${JSON.stringify(filename)}`)
        let extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
        let capitalized = extension.toUpperCase()
        LOG.info(`Caught file extension: ${extension} / ${capitalized}`)
        if (IMAGES_EXTENSIONS.includes(capitalized)) {

            return {
                extension: capitalized,
                type: 'image'
            }
        }
        LOG.info('The file is a video. Or something else. But not an image.')

        return {
            extension: capitalized,
            type: 'video'
        }
    }
}