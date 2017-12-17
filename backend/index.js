const express = require('express')
const app = express()
const FS = require('fs')
const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({
    name: 'MediasCenterBackEnd'
})

const PATH = 'src/photos/'

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/api/images', (req, res) => getPath().then(paths => res.send(paths)))

function getPath() {
    return new Promise(resolve => {
        let paths = []
        FS.readdir('photos/', (err, files) => {
            files.forEach(filename => paths.push(`${PATH}${filename}`))
            LOG.info(`Read images: ${paths}`)
            resolve(paths)
        })
    })
}

app.listen(8002, () => LOG.info('Example app listening on port 8002!'))