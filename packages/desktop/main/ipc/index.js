export { deckServer } from './deckServer'
export { saveAndLoad } from './saveAndLoad'
export { image } from './image'

export const loadIPCs = (configProps, ipcs) => {
    ipcs.map((fn, i) => {
        fn(configProps)
    })
}