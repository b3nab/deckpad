import express from 'express'
import path from 'path'
import iIP from 'internal-ip'
import QRCode from 'qrcode'
// import logger from 'morgan'
// import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// import routes from './routes.js'

const startDeckServer = async () => {
    const deckServer = express()
    const port = 832
    const localIP = await iIP.v4()
    const ipQRCode = await QRCode.toString(`http://${localIP}:${port}`, {type: 'utf8'})
    // const publicPath = path.resolve(__dirname, '../dist')
    
    // point for static assets
    // deckServer.use(express.static(publicPath))
    
    //view engine setup
    // deckServer.set('views', path.join(__dirname, '../dist'))
    // deckServer.engine('html', require('ejs').renderFile)
    // deckServer.set('view engine', 'html')
    
    // deckServer.use(logger('dev'))
    deckServer.use(bodyParser.json())
    deckServer.use(bodyParser.urlencoded({
        extended:true
    }))
    
    deckServer.get('/hello', (req, res) => {
        res.status(200).send('hello world')
    })
    
    // deckServer.use('/', routes)
    
    // deckServer.use(cookieParser())
    
    const server = deckServer.listen(port, '0.0.0.0', () => console.log(`
        deckServer listening on port ${port}
        It's accessible on LAN at address http://${localIP}:${port}
        You can also scan this QRCode from the mobile app: \n${ipQRCode}`))
}

startDeckServer()

export {
    startDeckServer
}