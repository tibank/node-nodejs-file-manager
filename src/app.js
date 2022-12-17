import { homedir } from 'os';
import { parserCommand } from './util/parserCommand.js';
import { argv } from 'process';

class App {
    constructor() {
        this.getUserName();
        this.currentDir = homedir();
        this.parserCommand = parserCommand;
    }

    hi = () => {
        console.log(`Welcome to the File Manager, ${this.userName}!`);
    };

    byeBye = () => {
        console.log(`Thank you for using File Manager, ${this.userName}!`);
        process.exit(0);
    };

    msgCurrentDir = () => {
        return `You are currently in ${this.currentDir}`;
    };

    getUserName() {
        this.userName = 'Stranger';
        if (argv.length > 2) {
            if (argv[2].startsWith('--username=')) {
                this.userName = argv[2].slice(11);
            }
        }
    }

    startApp() {
        this.hi();
        console.log(this.msgCurrentDir());
        this.parserCommand();
    }
}

const app = new App();

export { app };
