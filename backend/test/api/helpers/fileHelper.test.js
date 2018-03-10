const assert = require('chai').assert
const sinon = require('sinon')
const fileHelper = require('../../../api/helpers/fileHelper')

const SAMPLES_PATH = `${__dirname}/../../samples`

/* global describe, it, beforeEach, afterEach */

describe('FileHelper', () => {

    let sandbox
    beforeEach(() => sandbox = sinon.sandbox.create())
    afterEach(() => sandbox.restore())

    describe('#getFileExtension', () => {

        it('should fail if no filename', () => {
            const result = fileHelper.getFileExtension(null)
            assert.deepEqual(result, {})
        })

        it('should fail if the filename is refering to unexisting file', () => {
            try {
                const result = fileHelper.getFileExtension(`${SAMPLES_PATH}/notAnExistingFile.png`)
                assert.fail(0, 1, `Should not be able to succeed to get extension of not existing file: ${result}`)
            } catch (err) {
                assert.equal(err.message, 'ENOENT: no such file or directory, lstat \'/home/gigouni/dev/apps/polymer2-medias-center/backend/test/api/helpers/../../samples/notAnExistingFile.png\'')
            }
        })

        describe('--> images', () => {
            it('should fail the extension is not handled yet', () => {
                const result = fileHelper.getFileExtension(`${SAMPLES_PATH}/example.bmp`)
                assert.deepEqual(result, {})
            })

            it('should succeed if the extension is handled', () => {
                const result = fileHelper.getFileExtension(`${SAMPLES_PATH}/example.png`)
                assert.deepEqual(result, {
                    extension: 'PNG',
                    type: 'image'
                })
            })
        })

        describe('--> videos', () => {
            it('should fail the extension is not handled yet', () => {
                const result = fileHelper.getFileExtension(`${SAMPLES_PATH}/example.avi`)
                assert.deepEqual(result, {})
            })

            it('should succeed if the extension is handled', () => {
                const result = fileHelper.getFileExtension(`${SAMPLES_PATH}/example.mp4`)
                assert.deepEqual(result, {
                    extension: 'MP4',
                    type: 'video'
                })
            })
        })

        describe('--> folders', () => {
            it('should succeed if the element is a folder', () => {
                const result = fileHelper.getFileExtension(`${SAMPLES_PATH}/folder/`)
                assert.deepEqual(result, {
                    type: 'folder'
                })
            })
        })
    })

})