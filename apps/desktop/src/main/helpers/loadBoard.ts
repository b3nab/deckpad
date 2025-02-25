import { readFileSync } from 'fs'

export default function loadBoard(path) {
  // console.log('[loadBoard] from path ', path)
  const boardFile = readFileSync(path)
  // console.log('[loadBoard] boardFile ', boardFile.toString())
  const boardJson = JSON.parse(boardFile.toString())
  // console.log('[loadBoard] boardJson ', boardJson)
  // return boardJson
  return boardJson
}
