const express = require('express')
const app = express()
const FS = require('fs')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasCenterBackEnd'
})

const PATH = 'src/photos/'

app.get('/images', (req, res) => getPath().then(paths => res.send(paths)))

function getPath() {
    return new Promise((resolve, reject) => {
        let paths = []
        FS.readdir('../src/photos/', (err, files) => {
            files.forEach(filename => paths.push(`${PATH}${filename}`))
            LOG.info(`Read images: ${paths}`)
            resolve(paths)
        })
    })
}

app.listen(3000, () => LOG.info('Example app listening on port 3000!'))