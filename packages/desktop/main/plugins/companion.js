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


  dynamicBoard((board) => {
    console.log(`[dynamicBoard] update pages for plugin`)
    let newPages = []
    board.map(page => {
      newPages.push({value: page.id, label: page.name})
    })
    setPages(newPages)
  })
  
  return {
    'change-deck': {
      label: 'Change Deck Page',
      inputs: [
        {
          key: 'toPage',
          type: 'select',
          label: 'Choose page to go',
          extra: {
            // it will change options because "pages" it's a special hook variable!
            options: pages
          }
        }
      ],
      fire: async (data) => {
        console.log(`[FIRE ACTION] change-deck log`, data)
        const actualMobile = pages.findIndex(p => p.value == data.toPage)
        console.log(`[FIRE ACTION] change-deck log actualMobile is `, actualMobile)
        actualMobile != -1 && syncPage(actualMobile)
      },
    },
    // 'clock': {
    //   label: 'Show clock',
    //   inputs: [{
    //     type: 'radio',
    //     key: 'displayAs',
    //     label: 'Time Format',
    //     extra: {
    //       options: [{
    //         value: '12', label: 'AM/PM',
    //       }, {
    //         value: '24', label: '24H',
    //       }]
    //     }
    //   }],
    //   fire: async (data) => {
    //     syncLabel()
    //   }
    // }
  }
}

export default companion