import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import { wrappedErrorMessage, wrapSuccessResponse } from '../utils';
import { User } from '../models';

dotenv.config();

export const serverHealthCheck = (_, res) => res.send({ ping: 'pong' });

export const signIn = async (req, res) => {
  try {
    const { email, password, _id } = req.body;

    let currentUser;

    // if an id is sent, we can just find that user by id
    // otherwise we authenticate the user using their email and password
    if (_id) currentUser = await User.findById(_id);
    else if (email && password) currentUser = await User.authenticate(email, password);
    else throw new Error('EMAIL_AND_PASSWORD_REQUIRED');

    if (!currentUser) throw new Error('INCORRECT_EMAIL_OR_PASSWORD');

    req.session.currentUser = currentUser;

    const jwtToken = jwt.encode(JSON.stringify(currentUser), process.env.JWT_SECRET);

    res.send(wrapSuccessResponse({ user: currentUser, token: `Bearer ${jwtToken}` }));
  } catch (err) {
    res.send(wrappedErrorMessage('SIGN_IN_FAILED', err));
  }
};

export const signOut = (req, res) => {
  req.session.destroy();

  res.send(wrapSuccessResponse({ user: null }));
};
