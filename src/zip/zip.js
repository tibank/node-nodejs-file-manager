import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { getFileAbsolutePath } from '../util/getFileAbsolutePath.js';
import { app } from '../app.js';

const compress = async (source, target) => {
    const sourceFullName = getFileAbsolutePath(source);
    const targetFullName = getFileAbsolutePath(target);

    const handleError = (err) => {
        console.error('Operation failed\n' + app.msgCurrentDir());
    };

    const readStream = createReadStream(sourceFullName);
    const zipStream = createBrotliCompress();
    const writeStream = createWriteStream(targetFullName);
    readStream
        .on('error', handleError)
        .pipe(zipStream)
        .on('error', handleError)
        .pipe(writeStream)
        .on('error', handleError)
        .on('finish', () => {
            console.log(`Compress file ${sourceFullName} is done\n${app.msgCurrentDir()}`);
        });
};

const decompress = async (source, target) => {
    const sourceFullName = getFileAbsolutePath(source);
    const targetFullName = getFileAbsolutePath(target);

    const handleError = (err) => {
        console.error('Operation failed\n' + app.msgCurrentDir());
    };

    const unzipStream = createBrotliDecompress();
    const readStream = createReadStream(sourceFullName);
    const writeStream = createWriteStream(targetFullName);
    const main = readStream
        .on('error', handleError)
        .pipe(unzipStream)
        .on('error', handleError)
        .pipe(writeStream)
        .on('error', handleError)
        .on('finish', () => {
            console.log(`Decompress file ${sourceFullName} is done.\n${app.msgCurrentDir()}`);
        });
};

export const zip = { compress, decompress };
