import { readFileSync } from 'fs'

export default function loadBoard(path) {
const boardFile = readFileSync(path)
let boardJson = JSON.parse(boardFile)
return boardJson
}
