import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDeckPad } from '@renderer/lib/useDeckPad'

const ipc = window.electron.ipcRenderer || false

export const Settings = () => {
  const { setShowSettings, showSettings } = useDeckPad()
  const close = () => setShowSettings(false)
  const [configs, setConfigs] = useState()

  console.log('rendering Settings component, showSettings is ', showSettings)

  useEffect(() => {
    if (ipc) {
      ipc.on('configs-installed', (event, data) => {
        // console.log(`configs-installed are: ${JSON.stringify(data, null, 2)}`)
        console.log(`configs-installed are: ${Object.keys(data)}`)
        setConfigs(data)
      })
      ipc.send('configs-installed')
    }
    return () => {
      if (ipc) {
        ipc.removeAllListeners('configs-installed')
      }
    }
  }, [showSettings])

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={showSettings} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
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
                    Settings
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent you an email with all
                      of the details of your order.
                    </p>
                    {configs ? (
                      <ul>
                        {Object.keys(configs).map((pluginName, index) => (
                          <li key={index}>
                            {/* onClick={() => setActual(index)}> */}
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <p>{pluginName}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>{/* <LinearProgress /> */}</div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={close}
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
    </>
  )
}
