import { Router as ExpressRouter } from 'express';
import { wrappedErrorMessage } from '../utils';
import { User } from '../models';

const Router = ExpressRouter();

Router.get('/', (_, res) => {
  res.send({ ping: 'pong' });
});

// login
Router.post('/sign-in', async (req, res) => {
  try {
    const { email, password, _id } = req.body;

    // if an id is sent, we can just find that user by id
    if (_id) {
      const currentUser = await User.findById(_id);

      if (!currentUser) return res.send(wrappedErrorMessage('Invalid user id'));

      req.session.currentUser = currentUser;

      return res.send({ user: currentUser });
    }

    if (!email || !password) return res.send(wrappedErrorMessage('Both email and password required'));

    const authenticatedUser = await User.authenticate(email, password);

    if (!authenticatedUser) return res.send(wrappedErrorMessage('Incorrect email or password'));

    req.session.currentUser = authenticatedUser;

    res.send({ user: authenticatedUser });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to sign in', err));
  }
});

//logout
Router.post('/sign-out', (req, res) => {
  req.session.destroy();

  res.send({ user: null });
});

export default Router;
