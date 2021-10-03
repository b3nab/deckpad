# TODO for DeckPad

## Deckboard & StreamDeck alternative app

*TODO*:

- migrate deckServer to WebSockets (using socket.io)
- Plugins for buttons' actions
  - Companion Actions
    - change deck page
  - DeckPad Base
    - open app
    - open url with default browser
    - media controls (play,pause,mute,vol+,vol-)
  - OBS
    - switch scenes
    - toggle studio mode
    - toggle single source visibility
    - toggle filters on sources
    - toggle filters on scenes

---

## Plugin System

Implementation of this plugin system is still a wip. Looking at these npm modules:

- live-plugin-manager
- electron-package-manager
- plug-and-play
- architect

Links:
https://codesandbox.io/s/hyper-engine-plugin-system-for-deckpad-1nsc2

https://overreacted.io/making-setinterval-declarative-with-react-hooks/
https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/
https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md
https://www.youtube.com/watch?v=RnwqU9dqTr4

### Plugins to develop

- shell commands
  - run command
  - change working dir
- obs
- vmix
- streamlabs
- gopro open api

---

### Parts

#### Desktop App (Linux/MacOS/Windows)

Desktop app that let you configure the decks and buttons.

Features:

- Save/Load .board DeckPad configuration files
- Drag&Drop Buttons to switch position
- Customize and Configure Deck Buttons
  - Label
  - Image (supports: png, jpg and jpeg, webp and even GIFs!)
  - Colors for background and labels
  - Shape (circle, squared or transparent)

---

#### Mobile App (Android/iOS)

Mobile app visualizer for the configured decks.

Features:

- View Board and send button action (on tap)
- Connect to DeckPad
  - Auto Connect with QRCode
  - Manually insert lan IP Address
