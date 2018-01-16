const assert = require('chai').assert
const requestHelper = require('../../../api/helpers/requestHelper')

/* global describe, it */

describe('RequestHelper', () => {

    describe('#getClientIp', () => {

        it('should fail if no req param is provided', () => {
            let req = null
            let origin = requestHelper.getClientIp(req)
            assert.exists(origin)
            assert.equal(origin, '')
        })

        it('should succeed with a correct req param (req.headers.origin version)', () => {
            let req = {
                headers: {
                    origin: 'requestHelperTest'
                }
            }
            let origin = requestHelper.getClientIp(req)
            assert.exists(origin)
            assert.equal(origin, 'requestHelperTest')
        })

        it('should succeed with a correct req param (req.headers.referer version)', () => {
            let req = {
                headers: {
                    origin: null,
                    referer: 'requestHelperTest'
                }
            }
            let origin = requestHelper.getClientIp(req)
            assert.exists(origin)
            assert.equal(origin, 'requestHelperTest')
        })

        it('should set client IP to unknown if it cannot get it from request', () => {
            let req = {
                headers: {
                    origin: null,
                    referer: null
                }
            }
            let origin = requestHelper.getClientIp(req)
            assert.exists(origin)
            assert.equal(origin, 'unknown')
        })
    })

})