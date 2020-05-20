import { Task } from '../models';
import { wrappedErrorMessage, regexString, nullifyEmptyValues, wrapSuccessResponse } from '../utils';

export const listTasks = async (req, res) => {
  try {
    const { name, description, userRef } = req.body;

    const variables = {
      ...(name && { name: regexString(name) }),
      ...(description && { description: regexString(description) }),
      ...(userRef && { user: userRef }),
    };

    const tasks = await Task.find(variables).populate('user');

    res.send(wrapSuccessResponse({ tasks }));
  } catch (err) {
    res.send(wrappedErrorMessage('LIST_TASKS_FAILED', err));
  }
};

export const findTaskById = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Task.findById(id);

    res.send(wrapSuccessResponse({ task }));
  } catch (err) {
    res.send(wrappedErrorMessage('FIND_TASK_FAILED', err));
  }
};

export const getCurrentUserTask = async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    const myTasks = await Task.find({ user: _id }).populate('user');

    res.send(wrapSuccessResponse({ tasks: myTasks }));
  } catch (err) {
    res.send(wrappedErrorMessage('LIST_TASKS_FAILED', err));
  }
};

export const createTask = async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    const newTaskData = nullifyEmptyValues(req.body);
    const taskSchema = new Task({ ...newTaskData, user: _id });

    const newTask = await taskSchema.save();
    res.send(wrapSuccessResponse({ task: newTask }));
  } catch (err) {
    res.send(wrappedErrorMessage('CREATE_TASK_FAILED', err));
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProperties = nullifyEmptyValues(req.body);

    const updatedTask = await Task.findOneAndUpdate({ _id: id }, updatedProperties, {
      new: true,
      useFindAndModify: false,
    });

    res.send(wrapSuccessResponse({ task: updatedTask }));
  } catch (err) {
    res.send(wrappedErrorMessage('UPDATE_TASK_FAILED', err));
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.deleteOne({ _id: id });

    res.send(wrapSuccessResponse({ task: deletedTask }));
  } catch (err) {
    res.send(wrappedErrorMessage('DELETE_TASK_FAILED', err));
  }
};
