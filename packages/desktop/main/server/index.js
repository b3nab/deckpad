import { ipcMain } from 'electron'
import express from 'express'
import path from 'path'
import iIP from 'internal-ip'
import QRCode from 'qrcode'
import pubsub from 'electron-pubsub'
import bodyParser from 'body-parser'
import { loadBoard, saveBoard } from '../helpers'

const startDeckServer = async ({store}) => {
  const deckServer = express()
  const port = 832
  const localIP = await iIP.v4()
  const ipQRCode = await QRCode.toString(`http://${localIP}:${port}`, {type: 'utf8'})
  
  deckServer.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  
  deckServer.use(bodyParser.json())
  deckServer.use(bodyParser.urlencoded({
    extended:true
  }))
  
  deckServer.get('/companion', (req, res) => {
    let currentBoard = store.get('currentBoard')
    const board = loadBoard(currentBoard)
    res.status(200)
    .send(JSON.stringify({board}))
  })
  
  deckServer.post('/action', async (req, res) => {
    const { position, action } = req.body
    console.log(`fire action from button @position ${position}\nwith action: ${JSON.stringify(action, null, 2)}`)
    const fireStatus = await firePlugin({action, position})
    
    res.status(200).send(fireStatus)
  })
  
  const server = deckServer.listen(port, '0.0.0.0', () => console.log(`
  deckServer listening on port ${port}
  It's accessible on LAN at address http://${localIP}:${port}`))
  
  return {
    server: server,
    qrCode: ipQRCode,
  }
}

const firePlugin = async ({action, position}) => {
  if(!action.plugin || !action.type || !action.options) return false
  pubsub.publish('fire-plugin', action)
  return true
}

export {
  startDeckServer
}