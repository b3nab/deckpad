import { useState, syncPage, syncLabel, dynamicBoard } from '@deckpad/sdk'
import os from 'os'

// @deckpad/plugin-system
// extension-plugin
// --
// system:
//    - memory-used
//    - uptime
const system = () => {

  return {
    'memory-used': {
      label: 'Memory In Use',
      fire: async (data) => {
        const total = os.totalmem()
        const free = os.freemem()
        const used = total - free
        const human = Math.ceil(used / (1,074*e+6)) + ' MiB'
        console.log('[SYSTEM] => "memory": ', `total: ${total}, free: ${free}, used: ${used} - human: ${human}`)
        syncLabel(human)
      },
    },
    // 'cpu-load': {
    //   label: 'CPU Load in %',
    //   fire: async (data) => {
    //     const total = os.totalmem()
    //     const free = os.freemem()
    //     const used = total - free
    //     const human = Math.ceil(used / 1000000) + ' MB'
    //     syncLabel(human)
    //   },
    // },
    'uptime': {
      label: 'Total System Uptime',
      fire: async (data) => {
        let ut_sec = os.uptime()
        let ut_min = ut_sec/60
        let ut_hour = ut_min/60

        ut_sec = Math.floor(ut_sec)
        ut_min = Math.floor(ut_min)
        ut_hour = Math.floor(ut_hour)

        ut_hour = ut_hour%60
        ut_min = ut_min%60
        ut_sec = ut_sec%60
        // console.log("Up time: "
        //   + ut_hour + " Hour(s) "
        //   + ut_min + " minute(s) and "
        //   + ut_sec + " second(s)")

        syncLabel(`${ut_hour}:${ut_min}:${ut_sec}`)

      },
    },
  }
}

export default system