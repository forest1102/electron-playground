'use strict';

import path from 'path';
import url from 'url';
import { BrowserWindow, screen } from 'electron';

import { bootReactDevtools } from './ReactDevtools';

let mainWindow: BrowserWindow;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    bootReactDevtools();

    mainWindow.webContents.on('did-frame-finish-load', async () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/mainView/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
};

export { mainWindow, createWindow };
