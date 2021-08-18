'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

import { session } from 'electron';

import { reactDevtools, extDir } from './Const';

const searchReactDevtools = async () => {
  const dirPath = path.join(os.homedir(), extDir, reactDevtools);

  return await fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift()
    )
    .catch((err) => console.log(`Error: ${err}`));
};

const installDevExtension = async () => {
  await installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

export const bootReactDevtools = async () => {
  const extPath = await searchReactDevtools();
  if (!extPath) {
    installDevExtension();
    bootReactDevtools();
  } else {
    await session.defaultSession
      .loadExtension(extPath, {
        allowFileAccess: true,
      })
      .then(() => console.log('React Devtools loaded...'))
      .catch((err) => console.log(err));
  }
};
