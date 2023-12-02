import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'

// @deckpad/plugin-companion
// extension-plugin
// --
// companion:
//    - action
const companion = () => {
  const [ something, setSomething ] = useState()

  return {
    'action': {
      label: 'My Action',
      inputs: [],
      fire: async (data) => {
        // action code
      },
    }
  }
}

export default companion