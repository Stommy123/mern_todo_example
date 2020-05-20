import { User } from '../models';
import { wrappedErrorMessage, nullifyEmptyValues, wrapSuccessResponse } from '../utils';

export const listUsers = async (_, res) => {
  try {
    const users = await User.find();

    res.send(wrapSuccessResponse({ users, success: true }));
  } catch (err) {
    res.send(wrappedErrorMessage('LIST_USERS_FAILED', err));
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.send(wrapSuccessResponse({ user, success: true }));
  } catch (err) {
    res.send(wrappedErrorMessage('FIND_USER_FAILED', err));
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    const currentUser = await User.findById(_id);

    res.send(wrapSuccessResponse({ user: currentUser }));
  } catch (err) {
    res.send(wrappedErrorMessage('FIND_USER_FAILED', err));
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);

    const newUser = await userData.save();

    res.send(wrapSuccessResponse({ user: newUser }));
  } catch (err) {
    res.send(wrappedErrorMessage('CREATE_USER_FAILED', err));
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};
    const updatedProperties = nullifyEmptyValues(req.body);

    const updatedUser = await User.findOneAndUpdate({ _id }, updatedProperties, { new: true, useFindAndModify: false });

    res.send(wrapSuccessResponse({ user: updatedUser }));
  } catch (err) {
    res.send(wrappedErrorMessage('UPDATE_USER_FAILED', err));
  }
};

// internal delete
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.deleteOne({ _id: id });

    res.send(wrapSuccessResponse({ user: deletedUser }));
  } catch (err) {
    res.send(wrappedErrorMessage('DELETE_USER_FAILED', err));
  }
};
