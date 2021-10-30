import { useState, useEffect } from '@deckpad/sdk'

// The plugin itself is a single function with no arguments
const example = () => {
  // Demo of useState hook
  const [ counter, setCounter ] = useState(0)
  const [ text, setText ] = useState('initial')
  console.log(`text is "${text}"`)
  
  
  // Demo of useEffect hook - empty array dependencies, so only on first init is called
  useEffect(() => {
    console.log('useEffect - single dep || 1st resolve')
    setText('setted')
  }, [])
  
  // Demo of useEffect hook - only one dependency, called when text change
  useEffect(() => {
    console.log('useEffect - multi dep || 1st resolve and text update and counter update')
  }, [text, counter])
  
  // Demo of useEffect hook - no dependencies, called every resolve
  useEffect(() => {
    console.log('useEffect - no dep || every resolve')
  })
  
  return {
    'counter': {
      label: 'state counter',
      fire: async (data) => setCounter(counter+1),
      inputs: [
        {
          key: 'toPage',
          type: 'select',
          label: 'Text',
          extra: {
            options: [{
              value: counter, label: counter
            }]
          }
        }
      ],
    },
    'text': {
      label: 'state text',
      fire: async (data) => setText(data),
      inputs: [
        {
          key: 'toPage',
          type: 'select',
          label: 'Text',
          extra: {
            options: [{
              value: text, label: text
            }]
          }
        }
      ],
    },
    'external-module': {
      label: 'toggle mute external',
      fire: async (data) => { loudness.setMuted(!(await loudness.getMuted())) },
    },
  };
}

export default example