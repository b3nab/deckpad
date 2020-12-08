import { ipcMain } from 'electron'
import express from 'express'
import path from 'path'
import iIP from 'internal-ip'
import QRCode from 'qrcode'
// import logger from 'morgan'
// import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { loadBoard, saveBoard } from '../helpers'
// import routes from './routes.js'

const startDeckServer = async ({store}) => {
    const deckServer = express()
    const port = 832
    const localIP = await iIP.v4()
    const ipQRCode = await QRCode.toString(`http://${localIP}:${port}`, {type: 'utf8'})
    // const publicPath = path.resolve(__dirname, '../dist')
    
    deckServer.use((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        next()
    })
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
        res
            .status(200)
            .send('hello world')
    })

    deckServer.get('/companion', (req, res) => {
        let currentBoard = store.get('currentBoard')
        const board = loadBoard(currentBoard)
        res.status(200)
            .send(JSON.stringify({board}))
    })
    deckServer.get('/getBoard', (req, res) => {
        // ipcMain.send()
        const board = []
        res
            .status(200)
            .send(board)
    })
    
    deckServer.post('/action', (req, res) => {
        const { position, action } = req.body
        console.log(`fire action from button @position ${position}`)
        res.status(200).send('ok')
    })
    
    // deckServer.use('/', routes)
    
    // deckServer.use(cookieParser())
    
    const server = deckServer.listen(port, '0.0.0.0', () => console.log(`
        deckServer listening on port ${port}
        It's accessible on LAN at address http://${localIP}:${port}`))

    return {
        server: server,
        qrCode: ipQRCode,
    }
}

// startDeckServer()

export {
    startDeckServer
}