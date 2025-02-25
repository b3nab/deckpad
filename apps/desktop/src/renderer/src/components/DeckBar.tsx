import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Btn, Status } from '@renderer/ui'
import { QRCodeModal } from '@renderer/components/modals'

export const DeckBar = (): JSX.Element => {
  const {
    newBoard,
    loadBoard,
    saveBoard,
    saveBoardAs,
    setShowSettings,
    setShowExtensions,
    serverStatus,
    serverIP,
    serverStartStop,
    companionName
  } = useDeckPad()
  const [showQrCode, setShowQrCode] = useState<boolean>(false)
  const closeQrCode = () => setShowQrCode(false)
  const openSettings = () => setShowSettings(true)
  const openExtensions = () => setShowExtensions(true)
  const serverStartStopText = serverStatus ? 'STOP' : 'START'
  const serverStartStopIcon = serverStatus ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
      />
    </svg>
  )
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Btn onClick={() => newBoard()}>NEW</Btn>
          <Btn onClick={() => loadBoard()}>LOAD</Btn>
          <Btn onClick={() => saveBoard()}>SAVE</Btn>
          <Btn onClick={() => saveBoardAs()}>SAVE AS..</Btn>
          <Btn onClick={() => openSettings()}>SETTINGS</Btn>
          <Btn onClick={() => openExtensions()}>EXTENSIONS</Btn>
        </div>
        <div className="flex gap-4">
          <Btn primary onClick={() => serverStartStop()}>
            <>
              {serverStartStopIcon}
              {serverStartStopText}
            </>
          </Btn>
          <Btn primary onClick={() => setShowQrCode(true)}>
            QRCODE
          </Btn>
          <QRCodeModal showQrCode={showQrCode} closeQrCode={closeQrCode} />
        </div>
      </div>
      <div className="flex flex-col items-end gap-4">
        <Status status={!!companionName}>
          {!!companionName ? <div>CONNECTED TO: {companionName}</div> : <div>NOT CONNECTED</div>}
        </Status>
        {/* <div className="flex gap-4">
          <Status status={true}>LAN</Status>
          <Status status={false}>BLUETOOTH</Status>
        </div> */}
        <div className="flex gap-4">
          <Status status={serverStatus}>STATUS</Status>
        </div>
      </div>
    </div>
  )
}
