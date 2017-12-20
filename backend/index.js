const express = require('express')
const app = express()
const CONFIG = require('./config')
const FS = require('fs')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasCenterBackEnd'
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/api/images', (req, res) => getPath().then(paths => res.send(paths)))

/**
 * Concatenate the paths of all images to fetch it to the frontend.
 *
 * @returns {Promise.Array|Error} The list of images path if fulfilled or an error if rejected.
 */
function getPath() {
    return new Promise((resolve, reject) => {
        let paths = []
        FS.readdir(CONFIG.raspPhotosPathFromBackend, (err, files) => {
            if(err) reject(new Error(`Cannot find images in backend: ${err}`))
            files.forEach(filename => paths.push(`${CONFIG.raspPhotosPathFromFrontend}${filename}`))
            LOG.info(`Read images: ${paths}`)
            resolve(paths)
        })
    })
}

app.listen(CONFIG.raspBackPort, () => LOG.info(`Backend listening on port ${CONFIG.raspBackPort}!`))