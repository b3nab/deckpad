import SDK from '@deckpad/sdk'
import loudness from 'loudness'

const audio = () => {
  
  return ({
    'vol-up': {
      label: 'Volume Up',
      fire: async (data) => { loudness.setVolume(await loudness.getVolume() + (data.stepUp || 10)) },
      inputs: [{
        type: 'number',
        key: 'stepUp',
        label: 'Increment Step (default: 10)'
      }]
    },
    'vol-down': {
      label: 'Volume Down',
      fire: async (data) => { loudness.setVolume(await loudness.getVolume() - (data.stepDown || 10)) },
      inputs: [{
        type: 'number',
        key: 'stepDown',
        label: 'Decrement Step (default: 10)'
      }]
    },
    'vol-to': {
      label: 'Set Volume To',
      fire: async (data) => { loudness.setVolume(data.volume) },
      inputs: [{
        type: 'number',
        key: 'volume',
        label: 'volume 0-100'
      }]
    },
    'mute': {
      label: 'Mute',
      fire: async (data) => { loudness.setMuted(true) },
    },
    'unmute': {
      label: 'Unmute',
      fire: async (data) => { loudness.setMuted(false) },
    },
    'mute-toggle': {
        label: 'Toggle Mute',
        fire: async (data) => { loudness.setMuted(!await loudness.getMuted()) },
    },
  })
}

export default audio