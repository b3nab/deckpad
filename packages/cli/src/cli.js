#!/usr/bin/env node
import pkg from '../package.json'
import updateNotifier from 'update-notifier'
import meow from 'meow'
import padkit from './padkit.js'

// padkit CLI Tool
// 🔰💥💫🦄🧰🧑‍💻
const cli = meow(`
	Usage
	  $ padkit <command>

  Commands:
    - init
    🦄 init 🦄 - Create your extension the right way
    - pack
    📦 pack 📦 - Build a package for your extension
    - release
    💫 release 💫 - Release your extension to the store

	Examples
	  $ padkit init [folder-name]
	  $ padkit pack
	  $ padkit release
`, {
	importMeta: import.meta,
})

updateNotifier({pkg}).notify()

if(cli.input.length == 0) {
  cli.showHelp()
} else {
  padkit(cli.input[0], cli.input.slice(1), cli.flags, cli)
}