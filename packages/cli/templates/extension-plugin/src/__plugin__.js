import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'

// ${package_name}
// extension-${type}
// --
// ${ext_name}:
//    - action
const ${ext_name} = () => {
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

export default ${ext_name}