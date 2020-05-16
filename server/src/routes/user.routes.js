import { Router as ExpressRouter } from 'express';
import { User } from '../models';
import { wrappedErrorMessage, nullifyEmptyValues } from '../utils';

const Router = ExpressRouter();

// list of users
Router.get('/', async (req, res) => {
  try {
    const users = await User.find(req.body);

    res.send({ users, success: true });
  } catch (err) {
    res.send(wrappedErrorMessage('LIST_USERS_FAILED', err));
  }
});

// single user by id
Router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.send({ user, success: true });
  } catch (err) {
    res.send(wrappedErrorMessage('FIND_USER_FAILED', err));
  }
});

// current user
Router.get('/current', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHORIZED_USER');

    const currentUser = await User.findById(id);

    res.send({ user: currentUser });
  } catch (err) {
    res.send(wrappedErrorMessage('FIND_USER_FAILED', err));
  }
});

// create user
Router.post('/', async (req, res) => {
  try {
    const userData = new User(req.body);
    const newUser = await userData.save();

    res.send({ user: newUser });
  } catch (err) {
    res.send(wrappedErrorMessage('CREATE_USER_FAILED', err));
  }
});

// update user
Router.patch('/', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHORIZED_USER');

    const updatedProperties = nullifyEmptyValues(req.body);

    const updatedUser = await User.findOneAndUpdate({ _id }, updatedProperties, { new: true, useFindAndModify: false });

    res.send({ user: updatedUser, success: true });
  } catch (err) {
    res.send(wrappedErrorMessage('UPDATE_USER_FAILED', err));
  }
});

// internal delete
Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.deleteOne({ _id: id });

    res.send({ user: deletedUser, deleted: true });
  } catch (err) {
    res.send(wrappedErrorMessage('DELETE_USER_FAILED', err));
  }
});

export default Router;
