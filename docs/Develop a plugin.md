# Start developing a plugin for DeckPad

Create a new plugin for DeckPad is really simple, you need to know a bit of Javascript and if you know React.js you are almoast done.


## Basics

### **Naming conventions**

Your plugin must start with `deckpad-` so if you are creating a plugin named "GoPro", you should rename it accordingly like `deckpad-gopro`. The internal plugin system (called **Hyper**) searches only plugins with the name `deckpad-*`.

You can release your plugin publishing it as a npm package using the npm library. Really simple.

### Plugin lifecycle

The plugin is a simple function that will run every times a new board is loaded, on board updates and on hooks updates. If you're familiar with React.js functional component lifecycle then you know how the plugin lifecycle works.
```
// LIFECYCLE

=> deckpad starts

- register(plugin) // init plugins
- run plugin fn() - 1st run

# lifecycle hooks running
- now the plugin in registered inside deckpad
```

## Plugin utilities

The plugin is a simple function, takes one input and returns an output as object, that corresponds to the plugin available actions.

So a plugin file is basically this:
```js
export default (hypers) => {
  // ...some logic
  return {
    // actions
  }
}
```

The input parameter is an object, internally we use to call it `hypers`.
The hypers object has all utilities you need to start developing.
```js
const {
    useState,
    useEffect,
    syncPage,
    syncLabel,
    dynamicBoard,
  } = hypers
```

The output object is a collection of key:value, we used to call that object `actions`.
The actions object has all the actions the plugin can do. Actions have this format:
```js
{
  'take-photo': {
    type: ACTION_TYPE,
    label: 'Take a photo with your GoPro',
    inputs: [
      // {my input type}
    ]
  }
}  
```


### Plugin Action - INPUTS

The plugin return an object as said before, where every key is a plugin's action object and it can have an `inputs` elements list in it.

### Input Types
Input types can be of this kind:

- **Simple inputs**
  - checkbox
  - *Text kind*
    - text
    - textearea
    - email
    - password
    - color
    - number
    - file path
    - url link
- **Advanced Inputs**
  - range
  - radio
  - select
  - *Date kind*
    - date time
    - date
    - time

## Input Object
Every input object needs to have two properties, `key` and `type`, to properly pass data values to the fire function.
Additionally this object can have `label` (string) and `extra` (object) that has properties based on the type of input - please note that only advanced inputs have possibility to use the extra parameter.
```js
{
  key: 'NAME',
  type: 'INPUT_TYPE',
  ?label: 'input label',
  ?extra: {}
}
```

### Advanced input types - extra properties

There are some advanced inputs that need some extra parameters to know what to show. Here are couple of examples for advanced inputs:

- *Range* Input
```js
{
  key: 'volume',
  type: 'range',
  label: 'Set Volume to:',
  extra: {
    defaultValue: '50', // optional
    min: '0',
    max: '100'
  }
}
```

- *Radio* Input
```js
{
  key: 'browser',
  type: 'radio',
  label: 'Browser to open',
  extra: {
    defaultValue: 'chrome', // optional
    options: [{
      value: 'chrome', label: 'Google Chrome',
    },{
      value: 'firefox', label: 'Mozilla Firefox',
    },{
      value: 'edge', label: 'Microsoft Edge',
    }]
  }
}
```

- *Select* Input
```js
{
  key: 'browser',
  type: 'radio',
  label: 'Browser to open',
  extra: {
    defaultValue: 'chrome', // optional
    options: [{
      value: 'chrome', label: 'Google Chrome',
    },{
      value: 'firefox', label: 'Mozilla Firefox',
    },{
      value: 'edge', label: 'Microsoft Edge',
    }]
  }
}
```
