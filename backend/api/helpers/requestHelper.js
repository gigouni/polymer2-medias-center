'use strict'

const BUNYAN = require('bunyan')
const LOG = BUNYAN.createLogger({name: 'RequestHelper'})


module.exports = {

    /**
     * Display client IP to assume who's trying to access resources.
     * @param {Object} req - The request sent by the client to access resource.
     * @returns {*} Nothing yet.
     */
    getClientIp(req) {
        if(!req) {
            LOG.warn(`Missing req param when trying to get client IP.`)
            return
        }
        let clientIp = req.headers.origin || req.headers.referer || 'unknown'
        LOG.info(`Client trying to access resource: ${clientIp}`)
    }
}