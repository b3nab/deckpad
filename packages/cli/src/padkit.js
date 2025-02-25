import init from './init'
// import link from './link'
// import pack from './pack'
// import release from './release'

const padkit = (command, inputs, flags, extra) => {
	switch (command) {
		case 'init':
			init(inputs)
			break
		// case 'link':
		// 	link()
		// 	break
		// case 'pack':
		// 	pack()
		// 	break
		// case 'release':
		// 	release()
		// break
		default:
			break
	}
}

export default padkit