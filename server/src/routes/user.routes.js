import { Router as ExpressRouter } from 'express';
import { User } from '../models';
import { wrappedErrorMessage, nullifyEmptyValues } from '../utils';

const Router = ExpressRouter();

// list of users
Router.get('/', async (req, res) => {
  try {
    const users = await User.find(req.body);

    res.send({ users });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to retrieve list of users', err));
  }
});

// single user by id
Router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.send({ user });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to retrieve user by id', err));
  }
});

// current user
Router.get('/current', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) return res.send(wrappedErrorMessage('Not logged in'));

    const currentUser = await User.findById(id);

    res.send({ user: currentUser });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to retrieve current user', err));
  }
});

// create user
Router.post('/', async (req, res) => {
  try {
    const userData = new User(req.body);
    const newUser = await userData.save();

    res.send({ user: newUser });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to create new user', err));
  }
});

// update user
Router.patch('/', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) return res.send(wrappedErrorMessage('Not logged in'));

    const updatedProperties = nullifyEmptyValues(req.body);

    const updatedUser = await User.findOneAndUpdate({ _id }, updatedProperties, { new: true, useFindAndModify: false });

    res.send({ user: updatedUser, updated: true });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to update user', err));
  }
});

// internal delete
Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.deleteOne({ _id: id });

    res.send({ user: deletedUser, deleted: true });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to delete user', err));
  }
});

export default Router;
