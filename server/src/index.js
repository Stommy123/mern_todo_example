import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import Mongo from 'connect-mongo';
import dotenv from 'dotenv';
import { RootRoutes, TaskRoutes, UserRoutes } from './routes';

dotenv.config();

const MongoStore = Mongo(session);

const { DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

const app = express();

app.use(
  session({
    secret: 'abc123',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

app.use(express.json());

app.use('/', RootRoutes);
app.use('/tasks', TaskRoutes);
app.use('/users', UserRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, _ => console.log(`Listening on port ${PORT}`));
