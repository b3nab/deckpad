import { Dialog, Transition } from '@headlessui/react'
import QRCode from 'react-qr-code'
import { useDeckPad } from '@renderer/lib/useDeckPad'
import { Fragment } from 'react'

const ipc = window.electron.ipcRenderer || false

export const QRCodeModal = ({ showQrCode, closeQrCode }) => {
  const { serverIP } = useDeckPad()
  return (
    <Transition appear show={showQrCode} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeQrCode}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  QR Code
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    To connect DeckPad Companion App just scan this qrcode with DeckPad App.
                  </p>
                  <div className="flex justify-center mt-2">
                    {serverIP ? <QRCode value={serverIP} /> : <p>Please start the server first.</p>}
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeQrCode}
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
