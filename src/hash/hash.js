import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { getFileAbsolutePath } from '../util/getFileAbsolutePath.js';
const { createHash } = await import('crypto');
import { app } from '../app.js';

export const hash = async (file) => {
    const sourceFullName = getFileAbsolutePath(file);
    const hash = createHash('sha256');
    hash.setEncoding('hex');

    try {
        const readStream = createReadStream(sourceFullName, { encoding: 'utf8' });
        await new Promise((resolve) => {
            readStream
                .on('error', () => console.log(`Operation faild\n${app.msgCurrentDir()}`))
                .pipe(hash)
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
