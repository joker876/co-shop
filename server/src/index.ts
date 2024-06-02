import ansis from 'ansis';
import { createApp } from './createApp';
import { OK_STR } from './utils/console-colors';
import 'dotenv/config';

const app = createApp();

const PORT = process.env.PORT ?? 8080;

console.log(`Starting server...`);

app.listen(PORT, () => {
  console.log(`${OK_STR}Running on port ${ansis.greenBright.underline(String(PORT))}!`);
});
