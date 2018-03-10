const bunyan = require('bunyan')
const log = bunyan.createLogger({
    name: 'FileHelper'
})
const fs = require('fs')

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
            log.warn(`Missing filename param to get its extension.`)
            return {}
        }

        log.info('------------------------ New file ------------------------')
        log.info(`Caught file: ${JSON.stringify(filename)}`)

        if (fs.lstatSync(filename).isDirectory()) {
            log.info(`${filename} is a folder.`)
            return {
                type: 'folder'
            }
        }

        let extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length)
        let capitalized = extension.toUpperCase()
        log.info(`Caught file extension: ${extension} / ${capitalized}`)
        if (IMAGES_EXTENSIONS && IMAGES_EXTENSIONS.includes(capitalized)) {
            log.info(`The file ${filename} is an image.`)
            return {
                extension: capitalized,
                type: 'image'
            }
        } else if (VIDEOS_EXTENSIONS && VIDEOS_EXTENSIONS.includes(capitalized)) {
            log.info(`The file ${filename} is a video.`)
            return {
                extension: capitalized,
                type: 'video'
            }
        }

        log.warn('The media cannot be handled yet. Check its extension before trying again.')
        return {}
    }
}