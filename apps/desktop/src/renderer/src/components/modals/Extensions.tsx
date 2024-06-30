import { Dialog, Transition } from '@headlessui/react'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { useState, useEffect, Fragment, ChangeEvent } from 'react'

const ipc = window.electron.ipcRenderer || false

export const Extensions = () => {
  const { setShowExtensions, showExtensions, plugins } = useDeckPad()
  const closeExtensions = () => setShowExtensions(false)
  const [inputted, setInputTo] = useState<string>('')
  const [extensionsDir, setExtsDir] = useState<string>()
  const [installed, setInstalled] = useState<string[]>([])
  useEffect(() => {
    console.log('input changed to => ', inputted)
    if (ipc) {
      ;(async () => {
        const extensionsDir = await ipc.invoke('extensions.get-dir')
        setExtsDir(extensionsDir)
        console.log('Extension Directory is => ', extensionsDir)
      })()
    }
  })

  const install = async () => {
    ipc.on(`epm-installed-${inputted}`, (event, err, pluginPath) => {
      console.log('Installed package at position: ', pluginPath)
      setInstalled([...installed, inputted])
    })
    ipc.send('epm-install', extensionsDir, inputted, 'latest')
    // const res = ipc.invoke('extensions.install', inputted)
    // console.log('Install res => ', res)
  }

  const doWith = (p) => {
    return async () => {
      ipc.invoke('extensions.use', p)
    }
  }

  return (
    <Transition appear show={showExtensions} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeExtensions}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Extensions
                </Dialog.Title>
                {plugins && (
                  <div className="mt-2">
                    <input
                      type="text"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setInputTo(e.target.value)}
                    />
                    <button onClick={() => install()}>INSTALL</button>
                    <ul>
                      {[...installed, ...Object.keys(plugins)].map((pluginName, index) => (
                        <li key={index}>
                          {/* onClick={() => setActual(index)}> */}
                          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                          <p onClick={doWith(pluginName)}>{pluginName}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeExtensions}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
