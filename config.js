/**
 * @description Configuration file to pool constants for frontend AND backend.
 * @author Nicolas GIGOU <nicolas.gigou@gmail.com>
 */

 const CONFIG = {
    raspLocalIp: "192.168.1.49",
    raspPublicIp: "176.140.18.135",
    raspFrontPort: 8001,
    raspBackPort: 8002,
    raspPhotosPathInBackend: 'photos/',
    raspPhotosPathInBackendFromFrontend: '../backend/photos/'
}

window.config = CONFIG