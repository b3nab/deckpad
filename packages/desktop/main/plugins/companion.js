import { ipcMain } from 'electron'

const companion = ({ store, updateProps }) => {
  let pages = []

  const start = () => {
    ipcMain.on('update-board', (event, board) => {
      console.log(`[companion] received update-board`)
      let newPages = []
      board.map(page => {
        newPages.push({value: page.id, name: page.name})
      })
      pages = newPages
      updateProps()
    })
  }

  const stop = () => {}
  
  const actions = () => ({
    'change-deck': {
      label: 'Change Deck Page',
      fire: async () => {},
      // probably it will not change "pages" because it's a variable
      // can try with a function (maybe general for actions or for a single action)
      options: pages
    }
  })
  
  return {
    start,
    stop,
    actions,
  }
}

export default companion