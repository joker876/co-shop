import { authRouter } from '@routes/auth';
import ansis from 'ansis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import MySQLStoreCreator from 'express-mysql-session';
import session, * as expressSession from 'express-session';
import passport from 'passport';
import { connectToDb } from './db';
import './dotenv-type';
import { OK_STR } from './utils/console-colors';

const MySQLStore = MySQLStoreCreator(expressSession);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  clearExpired: true,
  checkExpirationInterval: 15 * 60 * 1000,
});

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.APP_URL }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,

    cookie: {
      maxAge: Number(process.env.SESSION_LENGTH) || 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

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

passport.serializeUser((userId, done) => done(null, userId));
passport.deserializeUser((userId, done) => done(null, userId as any));
