import { stdin } from 'process';
import { commandsOS } from '../commands/commandsOS.js';
import { commandsFS } from '../commands/commandsFS.js';
import { executeCommand } from './executeCommand.js';
import { app } from '../app.js';

export const parserCommand = () => {
    stdin.resume();
    stdin.on('data', async (chunk) => {
        const [strCommand, ...params] = chunk.toString().trim().split(' ').filter(Boolean);

        if (commandsFS.hasOwnProperty(strCommand)) {
            await executeCommand(strCommand, params);
        } else if (strCommand === 'os' && commandsOS.hasOwnProperty(params[0])) {
            commandsOS[params[0]]();
            console.log(app.msgCurrentDir());
        } else {
            console.error(`Invalid input\n${app.msgCurrentDir()}`);
        }
    });
};
