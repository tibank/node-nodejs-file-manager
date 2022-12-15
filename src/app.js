import { getUserName } from './util/getUserName.js';
import { hi, msgCurrentDir, byeBye } from './util/msgApp.js';
import { homedir } from 'os';
import { parserCommand } from './util/parserCommand.js';

export class App {
  static startApp() {
    global.currentDir = homedir();
    global.userName = getUserName();

    hi();
    console.log(msgCurrentDir());
    parserCommand();

    process.on('SIGINT', () => {
      byeBye();
    });
  }
}
