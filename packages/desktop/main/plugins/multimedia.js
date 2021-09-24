import { ipcMain } from 'electron'
import loudness from 'loudness'

const multimedia = ({ store, toIO, sendMessageToRenderer, updateProps }) => { 
  // await loudness.setVolume(45)
  // const vol = await loudness.getVolume()
  // // vol = 45
  // await loudness.setMuted(false)
  // const mute = await loudness.getMuted()
  // // mute = false
  const start = () => {
    ipcMain.on('update-board', (event, board) => {
      console.log(`[multimedia] received update-board`)
      updateProps()
    })
  }

  const stop = () => {}
  
  const actions = () => ({
    'vol-up': {
      label: 'Volume Up Button',
      fire: async (data) => { loudness.setVolume(await loudness.getVolume() + 10) },
    },
    'vol-down': {
      label: 'Volume Down Button',
      fire: async (data) => { loudness.setVolume(await loudness.getVolume() - 10) },
    },
    'vol-to': {
      label: 'Volume To Value Button',
      fire: async (data) => { loudness.setVolume(data.volume) },
    },
    'mute': {
      label: 'Mute Button',
      fire: async (data) => { loudness.setMuted(true) },
    },
    'unmute': {
      label: 'Unmute Button',
      fire: async (data) => { loudness.setMuted(false) },
    },
    'mute-toggle': {
        label: 'Mute Toggle Button',
        fire: async (data) => { loudness.setMuted(!await loudness.getMuted()) },
    },
  })
  
  return {
    start,
    stop,
    actions,
  }
}

export default multimedia