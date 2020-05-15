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

      if (!currentUser) throw new Error('INVALID_ID');

      req.session.currentUser = currentUser;

      return res.send({ user: currentUser });
    }

    if (!email || !password) throw new Error('EMAIL_AND_PASSWORD_REQUIRED');

    const authenticatedUser = await User.authenticate(email, password);

    if (!authenticatedUser) throw new Error('INCORRECT_EMAIL_OR_PASSWORD');

    req.session.currentUser = authenticatedUser;

    res.send({ user: authenticatedUser });
  } catch (err) {
    res.send(wrappedErrorMessage('SIGN_IN_FAILED', err));
  }
});

//logout
Router.post('/sign-out', (req, res) => {
  req.session.destroy();

  res.send({ user: null });
});

export default Router;
