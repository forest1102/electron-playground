import path from 'path';
import { Tray, Menu, app } from 'electron';

import { trayImagePath } from '../lib/Const';

let tray = null;

const createTray = () => {
  const image = path.join(app.getAppPath(), trayImagePath);
  tray = new Tray(image);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
};

export { tray, createTray };
