import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'
import { shell } from 'electron'
import { execa } from 'execa'

// Commands Plugin
// --
// actions:
//    - open url
//    - open app / file
//    - execute hotkey
export const commands = () => {
  return {
    'open-url': {
      label: 'Open URL',
      inputs: [
        {
          key: 'url',
          type: 'url',
          label: 'Type the url to open'
        }
      ],
      fire: async (data) => {
        shell.openExternal(data.url)
      }
    },
    'open-file': {
      label: 'Open a file (also executable)',
      inputs: [
        {
          key: 'filePath',
          type: 'path',
          label: 'Insert the path to file'
        }
      ],
      fire: async (data) => {
        console.log('open-url action -- data => ', data)
        shell.openPath(data.filePath)
      }
    },
    'open-folder': {
      label: 'Open a folder',
      inputs: [
        {
          key: 'folderPath',
          type: 'path',
          label: 'Insert the path to folder',
          extra: { folder: true }
        }
      ],
      fire: async (data) => {
        console.log('open-url action -- data => ', data)
        shell.openPath(data.folderPath)
      }
    },
    shell: {
      label: 'Execute Shell command',
      inputs: [
        {
          key: 'sh',
          type: 'textarea',
          label: 'Write some shell commands'
        }
      ],
      fire: async (data) => {
        console.log('open-url action -- data => ', data)
        execa(data.sh)
      }
    },
    hotkey: {
      label: 'Replicate Hotkeys',
      inputs: [
        {
          key: 'hotkeys',
          type: 'keys',
          label: 'Press the keys to replicate'
        }
      ],
      fire: async (data) => {
        console.log('open-url action -- data => ', data)
      }
    }
  }
}

export default commands
