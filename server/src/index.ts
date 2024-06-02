import ansis from 'ansis';
import { createApp } from './createApp';
import { ERROR_STR, INFO_STR, OK_STR } from './utils/console-colors';

const app = createApp();

const PORT = 3000;

console.log(`Starting server...`);

app.listen(PORT, () => {
    console.log(`${OK_STR}Running on port ${ansis.greenBright.underline(PORT.toString())}!`);
});
