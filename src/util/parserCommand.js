import { stdin } from 'process';
import { commandsOS } from '../commands/commandsOS.js';
import { msgCurrentDir } from './msgApp.js';
import { app } from '../app.js';

export const parserCommand = () => {
    stdin.resume();
    stdin.on('data', async (chunk) => {
        const [strCommand, ...params] = chunk.toString().trim().split(' ').filter(Boolean);

        if (strCommand === 'os' && commandsOS.hasOwnProperty(params[0])) {
            commandsOS[params[0]]();
            console.log(app.msgCurrentDir());
        } else {
            console.log(`Invalid input\n${msgCurrentDir()}`);
        }
    });
};
