import session from 'express-session';
import mongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBStoreSession = mongoDBStore(session);

const store = new mongoDBStoreSession({
  uri: process.env.DB_URI,
  collection: 'sessions',
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
});

export default sessionMiddleware;
