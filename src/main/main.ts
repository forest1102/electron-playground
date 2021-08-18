'use strict';

import { app } from 'electron';
import './ipc/ipcActions';
import { createWindow } from './lib/Windows';
import { createTray } from './lib/Tray';

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.once('window-all-closed', () => app.quit());
