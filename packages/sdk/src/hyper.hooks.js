// @deckpad/sdk
// Copyright (c) b3nab
// ---
// --- 
// Hyper
// a plugin manager system
// deeply inspired by React.js and ReactFiber implementation
// ---
import Hyper from './hyper'

function resolveHype() {
  const hype = Hyper.hype
  if(hype === null) {
    console.error(
      'Invalid hook call. Hooks can only be called inside of the body of a function plugin. This could happen for' +
        ' one of the following reasons:\n' +
        '1. You might be breaking the Rules of Hooks\n' +
        '2. You might be breaking the Rules of Hooks\n' +
        '3. You might be breaking the Rules of Hooks!\n' +
        'See https://deckpad.js.org/docs/invalid-hook-call for tips about how to debug and fix this problem.',
    )
  }
  // console.log('resolveHype - hype = ', hype)
  return hype
}
function resolveOrigin() {
  const origin = Hyper.origin
  if(origin === null) {
    console.error(
      'Invalid hook call. Hooks can only be called inside of the body of a function plugin. This could happen for' +
        ' one of the following reasons:\n' +
        '1. You might be breaking the Rules of Hooks\n' +
        '2. You might be breaking the Rules of Hooks\n' +
        '3. You might be breaking the Rules of Hooks!\n' +
        'See https://deckpad.js.org/docs/invalid-hook-call for tips about how to debug and fix this problem.',
    )
  }
  // console.log('resolveOrigin - origin = ', origin)
  return origin
}


export function useState(initialState) {
  const dispatcher = resolveHype()
  return dispatcher.useState(initialState)
}
export function useEffect(cb, deps) {
  const dispatcher = resolveHype()
  return dispatcher.useEffect(cb, deps)
}
export function dynamicBoard(cb) {
  const dispatcher = resolveHype()
  return dispatcher.dynamicBoard(cb)
}
export function syncPage(id) {
  const dispatcher = resolveHype()
  return dispatcher.syncPage(id)
}

// WIP HOOKS
export function syncLabel(txt) {
  const dispatcher = resolveHype()
  const origin = resolveOrigin()
  return dispatcher.syncLabel(txt, origin)
}
export function useReducer(reducer, args, init=null) {
  const dispatcher = resolveHype()
  return dispatcher.useReducer(reducer, args, init)
}
export function useDebounce(initialState) {
  const dispatcher = resolveHype()
  return dispatcher.useDebounce(initialState)
}