import { exit } from 'node:process';
import { hash } from '../hash/hash.js';
import { zip } from '../zip/zip.js';

export const commandsFS = {
    '.exit': {
        argsCount: 0,
        exec: exit,
    },
    hash: {
        argsCount: 1,
        exec: hash,
    },
    compress: {
        argsCount: 2,
        exec: zip.compress,
      },
      decompress: {
        argsCount: 2,
        exec: zip.decompress,
      },    
};
