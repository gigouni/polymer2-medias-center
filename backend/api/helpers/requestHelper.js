

const bunyan = require('bunyan')
const log = bunyan.createLogger({name: 'RequestHelper'})


module.exports = {

    /**
     * Display client IP to assume who's trying to access resources.
     * @param {Object} req - The request sent by the client to access resource.
     * @returns {String} The client IP hostname.
     */
    getClientIp(req) {
        if(!req) {
            log.warn(`Missing req param when trying to get client IP.`)
            return ''
        }
        let clientIp = req.headers.origin || req.headers.referer || 'unknown'
        log.info(`Client trying to access resource: ${clientIp}`)
        return clientIp
    }
}