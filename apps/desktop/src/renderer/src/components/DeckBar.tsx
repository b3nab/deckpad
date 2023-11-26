import QRCode from 'react-qr-code'
import { useDeckPad } from '@renderer/lib/useDeckPad'

const Btn = (props): JSX.Element => (
  <button
    {...props}
    className={`flex gap-2 items-center text-white ${
      props.primary ? 'text-sm bg-indigo-600' : 'text-xs bg-cyan-600'
    } rounded-full p-3`}
  >
    {props.children}
  </button>
)

const Status = (props): JSX.Element => (
  <div className={`text-white p-3 flex gap-2 items-center`}>
    {props.children}
    <span
      className={`${props.status ? 'bg-success' : 'bg-error'} inline-block w-4 h-4 rounded-full`}
    />
  </div>
)

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
  const openSettings = () => setShowSettings(true)
  const openExtensions = () => setShowExtensions(true)
  const showQrCode = () => alert('QRCODE POPUP NEED IMPLEMENTATION!')
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
          <Btn
            primary
            data-popover-target="popover-click"
            data-popover-trigger="click"
            type="button"
          >
            QRCODE
          </Btn>
          {/* <button
            data-popover-target="popover-click"
            data-popover-trigger="click"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Click popover
          </button> */}
          {/* <div
            data-popover
            id="popover-click"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          >
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Popover click</h3>
            </div>
            <div className="px-3 py-2">
              <p>And here's some amazing content. It's very engaging. Right?</p>
              {serverIP ? <QRCode value={serverIP} /> : <p>Please start the server first.</p>}
            </div>
            <div data-popper-arrow></div>
          </div> */}
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
