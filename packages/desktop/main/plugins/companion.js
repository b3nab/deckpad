// Companion Plugin
// --
// actions:
//    - change-deck
const companion = (hypers) => {
  const {
    useState,
    useEffect,
    syncPage,
    syncLabel,
    dynamicBoard,
  } = hypers


  const [ pages, setPages ] = useState([])


  dynamicBoard((board,) => {
    console.log(`[dynamicBoard] update pages for plugin`)
    let newPages = []
    board.map(page => {
      newPages.push({value: page.id, name: page.name})
    })
    setPages(newPages)
  })
  
  return {
    'change-deck': {
      label: 'Change Deck Page',
      fire: async (data) => {
        // console.log(`[FIRE ACTION] change-deck log`, data)
        
        const actualMobile = pages.findIndex(p => p.value == data.options)
        console.log(`[FIRE ACTION] change-deck log actualMobile is `, actualMobile)

        actualMobile != -1 && syncPage(actualMobile)
      },
      // it will change options because "pages" it's a special hook variable!
      options: pages
    }
  }
}

export default companion