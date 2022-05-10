
import {spawn} from 'child_process';
import {createPathTemp} from '../service/controllers/utils.controller';

const [,, firstParams] = process.argv;

const sendDataToOS = (inputVideoSource: string) => {
  const inputVideoSrc = 'src/internalapp/' + `${inputVideoSource}`;
  const outputVideoSrc = createPathTemp('Video7', 'mp4');

  const principalCommand = 'ffmpeg';
  const args = [
    '-f',
    'concat',
    '-i',
    `${inputVideoSrc}`,
    '-c',
    'copy',
    '-bsf:a',
    'aac_adtstoasc',
    `${outputVideoSrc}`];
  const options = {
    shell: true,
  };

  const child = spawn(principalCommand, args, options);

  child.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.log(`LogLevel: ${data}`);
  });

  child.on('close', (code) => {
    console.log('🚀 ~ file: index.ts ~ line 25 ~ child.on ~ code', code);
  });

  console.log(outputVideoSrc);
};

sendDataToOS(firstParams);
