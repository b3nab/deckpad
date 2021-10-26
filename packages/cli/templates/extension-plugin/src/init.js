import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'

// ${name}
// extension-${type}
// --
// myplugin:
//    - action
const myplugin = () => {
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

export default myplugin