let request = require('supertest')
let server = require('../../../app')
let assert = require('chai').assert

/* global describe, it */

describe('MediasController', () => {

    describe('GET /api/medias', () => {

        it('should return a default string', done => {

            request(server).
                get('/api/medias').
                set('Accept', 'application/json').
                expect('Content-Type', /json/).
                expect(200).
                end((err, res) => {
                    assert.notExists(err)
                    assert.deepEqual(res.body, [
                        {
                            "extension": "JPG",
                            "filename": "example1.jpg",
                            "path": "../medias/example1.jpg",
                            "type": "image"
                        },
                        {
                            "extension": "JPG",
                            "filename": "example2.jpg",
                            "path": "../medias/example2.jpg",
                            "type": "image"
                        },
                        {
                            "extension": "JPG",
                            "filename": "example3.jpg",
                            "path": "../medias/example3.jpg",
                            "type": "image"
                        },
                        {
                            "extension": "JPG",
                            "filename": "example4.jpg",
                            "path": "../medias/example4.jpg",
                            "type": "image"
                        },
                        {
                            "filename": "folderTest",
                            "path": "../medias/folderTest",
                            "type": "folder"
                        },
                        {
                            "extension": "MP4",
                            "filename": "small.mp4",
                            "path": "../medias/small.mp4",
                            "type": "video"
                        }
                    ])
                    done()
                })
        })

    })

})