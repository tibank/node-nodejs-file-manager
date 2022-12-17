import { commandsFS } from '../commands/commandsFS.js';
import { app } from '../app.js';

export const executeCommand = async (strCommand, params) => {
    const command = commandsFS[strCommand];

    const argsCount = command.argsCount ?? 0;
    const paramsLength = params.length ?? 0;
    if (argsCount !== paramsLength) {
        console.error(`Invalid input\n${app.msgCurrentDir()}`);
        return;
    }

    try {
        switch (argsCount) {
            case 0:
                await command.exec();
                break;
            case 1:
                await command.exec(params[0]);
                break;
            case 2:
                await command.exec(params[0], params[1]);
                break;
            default:
        }
    } catch (err) {
        console.error('Operation failed' + err);
    }
};
