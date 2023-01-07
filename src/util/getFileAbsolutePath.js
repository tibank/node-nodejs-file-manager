import path from 'path';
import { app } from '../app.js';

export const getFileAbsolutePath = (str) => {
    return path.isAbsolute(str) ? str : path.resolve(path.join(app.currentDir, str));
};
