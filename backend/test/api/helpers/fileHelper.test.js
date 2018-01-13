const assert = require('chai').assert
const fileHelper = require('../../../api/helpers/fileHelper')

/* global describe, it */

describe('FileHelper', () => {

    describe('#getFileExtension', () => {

        it('should fail if no filename', () => {
            let filename = null
            let extension = fileHelper.getFileExtension(filename)
            assert.exists(extension)
            assert.deepEqual(extension, {})
        })

        it('should succeed (image version)', () => {
            let filename = 'example.png'
            let res = fileHelper.getFileExtension(filename)
            assert.exists(res)
            assert.equal(res.extension, 'PNG')
            assert.equal(res.type, 'image')
        })


        it('should fail if the extension is not handled yet (video version - AVI)', () => {
            let filename = 'example.avi'
            let extension = fileHelper.getFileExtension(filename)
            assert.exists(extension)
            assert.deepEqual(extension, {})
        })


        it('should succeed (video version)', () => {
            let filename = 'example.mp4'
            let res = fileHelper.getFileExtension(filename)
            assert.exists(res)
            assert.equal(res.extension, 'MP4')
            assert.equal(res.type, 'video')
        })
    })

})