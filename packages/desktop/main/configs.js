import { app } from 'electron'
import path from 'path'

export const extensionsDir = path.join(app.getPath('userData'), 'extensions')