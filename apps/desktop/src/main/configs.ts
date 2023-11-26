import { app } from 'electron'
import { join } from 'path'

export const extensionsDir = join(app.getPath('userData'), 'extensions')
