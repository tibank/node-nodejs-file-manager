import process from 'node:process';
import { app } from './src/app.js';

app.startApp();

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', () => {
    app.byeBye();
});
