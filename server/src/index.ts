import { authRouter } from '@routes/auth';
import ansis from 'ansis';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import MySQLStoreCreator from 'express-mysql-session';
import session, * as expressSession from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { connectToDb } from './db';
import './dotenv-type';
import { OK_STR } from './utils/console-colors';

const MySQLStore = MySQLStoreCreator(expressSession);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 1 day
    },
    // cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/user', authenticationMiddleware(), (req, res) => {
  res.send('Hello user!');
});

app.get('/login', (req, res) => {
  res.send('You need to log in!');
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

function authenticationMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    console.log(`req.session.passport.user: ${JSON.stringify((req.session as any).passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  };
}
