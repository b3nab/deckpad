export { plugins } from './plugins'
export { deckServer } from './deckServer'
export { saveAndLoad } from './saveAndLoad'
export { image } from './image'

export const loadIPCs = (ipcs) => {
    ipcs.map((fn, i) => {
        const value = fn()
    })
}