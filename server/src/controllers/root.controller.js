import { wrappedErrorMessage, wrapSuccessResponse } from '../utils';
import { User } from '../models';

export const serverHealthCheck = (_, res) => res.send({ ping: 'pong' });

export const signIn = async (req, res) => {
  try {
    const { email, password, _id } = req.body;

    // if an id is sent, we can just find that user by id
    if (_id) {
      const currentUser = await User.findById(_id);

      if (!currentUser) throw new Error('INVALID_ID');

      req.session.currentUser = currentUser;

      return res.send(wrapSuccessResponse({ user: currentUser }));
    }

    if (!email || !password) throw new Error('EMAIL_AND_PASSWORD_REQUIRED');

    const authenticatedUser = await User.authenticate(email, password);

    if (!authenticatedUser) throw new Error('INCORRECT_EMAIL_OR_PASSWORD');

    req.session.currentUser = authenticatedUser;

    res.send(wrapSuccessResponse({ user: authenticatedUser }));
  } catch (err) {
    res.send(wrappedErrorMessage('SIGN_IN_FAILED', err));
  }
};

export const signOut = (req, res) => {
  req.session.destroy();

  res.send(wrapSuccessResponse({ user: null }));
};
