# TODO for MyDeck

## Deckboard & StreamDeck alternative app

*TODO*:

- Mobile components (Deck and DeckBtn)
- API layer for mobile app to talk with desktop
- Plugins for buttons' actions
  - MyDeck Base
    - open app
    - open url with default browser
    - media controls (play,pause,mute,vol+,vol-)
    - change deck page (only effects on companion app)
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

---

### Parts

#### Desktop App (Linux/MacOS/Windows)

Desktop app that let you configure the decks and buttons.

Features:

- Save/Load .board MyDeck configuration files
- Drag&Drop Buttons to switch position
- Customize and Configure Deck Buttons
  - Label
  - Image (supports: png, jpg and jpeg, webp and even GIFs!)
  - Colors for background and labels
  - Shape (circle, squared or transparent)

---

#### Mobile App (Android/iOS)

Mobile app visualizer for the configured decks.
