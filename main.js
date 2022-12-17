import { app } from './src/app.js';

app.startApp();

process.on('SIGINT', () => {
    app.byeBye();
});
