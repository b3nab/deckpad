import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'

// System Plugin
// --
// actions:
//    - system
const system = () => {

  return {
    'system': {
      label: 'System',
      fire: async (data) => {},
    },
  }
}

export default system