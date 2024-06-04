import ansis from 'ansis';
import 'dotenv/config';
import { createApp } from './createApp';
import { connectToDb } from './db';
import { OK_STR } from './utils/console-colors';

const app = createApp();

const PORT = process.env.PORT ?? 8080;

console.log(`Starting server...`);
app.listen(PORT, () => {
  console.log(`${OK_STR}Running on port ${ansis.greenBright.underline(String(PORT))}!`);

  try {
    connectToDb();
    console.log(`${OK_STR}Connected to database!`);
  } catch (err) {
    throw err;
  }
});
