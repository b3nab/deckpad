import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'

// Companion Plugin
// --
// actions:
//    - change-deck
const companion = () => {  
  const [ pages, setPages ] = useState([])
  const [ counter, setCounter ] = useState(0)
  const [ clock, setClock ] = useState({})
  
  dynamicBoard((board) => {
    console.log(`[dynamicBoard] update pages for plugin`)
    let newPages = []
    board.map(page => {
      newPages.push({value: page.id, label: page.name})
    })
    setPages(newPages)
  })

  const getClock = (data) => {
    const datetime = new Date()
    const hours = datetime.getHours()
    const mins = datetime.getMinutes()
    const secs = data.showSeconds ? ':'+datetime.getSeconds() : ''
    const time24h = `${hours}:${mins}${secs}`
    const amORpm = datetime.getHours() < 13 ? 'AM' : 'PM'
    const isAM = amORpm == 'AM'
    const time12h = `${isAM ? hours : hours - 12}:${mins}${secs}${amORpm}`
    syncLabel(data.displayAs == '12h' ? time12h : time24h)
  }
  
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
    'clock': {
      label: 'Show clock',
      inputs: [{
        type: 'select',
        key: 'displayAs',
        label: 'Time Format',
        extra: {
          options: [{
            value: '12h', label: 'AM/PM',
          }, {
            value: '24h', label: '24H',
          }]
        }
      }, {
        type: 'checkbox',
        key: 'showSeconds',
        label: 'showSeconds'
      }],
      fire: async (data) => {
        // setInterval(() => {
          getClock(data)
        // }, 1000);
      }
    },
    'counter': {
      label: 'Simple Counter',
      fire: async (data) => {
        const upVal = counter + 1
        setCounter(upVal)
        syncLabel(upVal)
      },
    },
  }
}

export default companion