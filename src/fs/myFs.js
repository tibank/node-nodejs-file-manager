import path from 'node:path';
import { stdout } from 'node:process';
import { readdir, access, stat, rename, rm as remove } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { app } from '../app.js';
import { getFileAbsolutePath } from '../util/getFileAbsolutePath.js';

const fileExists = async (file) => {
  try {
    await access(file);
    return true;
  } catch (err) {
    return false;
  }
};

const up = async () => {
  app.currentDir = path.join(app.currentDir, '..');
  console.log(app.msgCurrentDir());
};

const cd = async (dir) => {
  const newCurrentDir = path.isAbsolute(dir) ? dir : path.resolve(path.join(app.currentDir, dir));
  if (await fileExists(newCurrentDir)) {
    app.currentDir = newCurrentDir;
  } else {
    console.log('Operation failed');
  }
  console.log(app.msgCurrentDir());
};

const list = async () => {
  try {
    (await readdir(app.currentDir)).forEach((file) => console.log(file));
  } catch (err) {
    console.log('Invalid input');
  }
  console.log(app.msgCurrentDir());
};

const cat = async (source) => {
  const sourceFullName = getFileAbsolutePath(source);

  try {
    const readStream = createReadStream(sourceFullName, { encoding: 'utf8' });
    await new Promise((resolve) => {
      readStream
        .on('error', () => {
          console.log(`Operation faild\n${app.msgCurrentDir()}`);
        })
        .on('end', () => {
          console.log('\n' + app.msgCurrentDir());
          resolve();
        })
        .pipe(stdout);
    });
  } catch (error) {
    console.log(`Operation faild\n${app.msgCurrentDir()}`);
  }
};

const add = async (source) => {
  const targetFullName = getFileAbsolutePath(source);

  if (~source.indexOf(path.sep)) {
    console.log('Invalid input');
  } else if (await fileExists(targetFullName)) {
    console.log('Operation failed');
  } else {
    try {
      const writeStream = createWriteStream(targetFullName, { encoding: 'utf8', flags: 'wx' });
      writeStream.write('');
    } catch (err) {
      console.log(`Operation failed t ${err}`);
    }
  }
  console.log(app.msgCurrentDir());
};

const cp = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  const targetFullName = getFileAbsolutePath(target);
  const targetDir = path.dirname(targetFullName);

  try {
    const sourceStat = await stat(sourceFullName);
    const targetStat = await stat(targetDir);

    if (sourceStat.isFile() && targetStat.isDirectory()) {
      const handleError = (err) => {
        console.log('Operation failed');
      };

      const readStream = createReadStream(sourceFullName, { encoding: 'utf8' });
      const writeStream = createWriteStream(targetFullName, { encoding: 'utf8', flags: 'wx' });
      readStream.on('error', handleError).pipe(writeStream).on('error', handleError);
    } else {
      console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
  console.log(app.msgCurrentDir());
};

const rn = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  const targetFullName = getFileAbsolutePath(target);
  try {
    const sourceStat = await stat(sourceFullName);
    if (sourceStat.isFile()) {
      await rename(sourceFullName, targetFullName);
    } else {
      console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed ');
  }
  console.log(app.msgCurrentDir());
};

const rm = async (source) => {
  const sourceFullName = getFileAbsolutePath(source);
  try {
    await remove(sourceFullName);
  } catch (err) {
    console.log('Operation failed');
  }
  console.log(app.msgCurrentDir());
};

const mv = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  try {
    await cp(source, target);
    await remove(sourceFullName);
  } catch (err) {
    console.log('Operation failed');
  }
  console.log(app.msgCurrentDir());
};

export const myFS = { up, cd, list, cat, add, rn, cp, mv, rm };
