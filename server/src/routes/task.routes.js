import { Router as ExpressRouter } from 'express';
import { Task } from '../models';
import { wrappedErrorMessage, regexString, nullifyEmptyValues, wrapSuccessResponse } from '../utils';

const Router = ExpressRouter();

// list of tasks
Router.get('/', async (req, res) => {
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
});

// find task by id
Router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.body;

    const task = await Task.findById(id);

    res.send(wrapSuccessResponse({ task }));
  } catch (err) {
    res.send(wrappedErrorMessage('FIND_TASK_FAILED', err));
  }
});

// get current user task
Router.get('/mine', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHORIZED_USER');

    const myTasks = await Task.find({ user: _id }).populate('user');

    res.send(wrapSuccessResponse({ tasks: myTasks }));
  } catch (err) {
    res.send(wrappedErrorMessage('LIST_TASKS_FAILED', err));
  }
});

// create task
Router.post('/', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHORIZED_USER');

    const newTaskData = nullifyEmptyValues(req.body);

    const taskSchema = new Task({ ...newTaskData, user: _id });

    const newTask = await taskSchema.save();

    res.send(wrapSuccessResponse({ task: newTask }));
  } catch (err) {
    res.send(wrappedErrorMessage('CREATE_TASK_FAILED', err));
  }
});

// update task
Router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    if (!id) throw new Error('INVALID_ID');

    const updatedProperties = nullifyEmptyValues(req.body);

    const taskToUpdate = await Task.findOne({ _id: id });

    if (String(taskToUpdate.user) !== currentUserId) throw new Error('NO_PERMISSION');

    const updatedTask = await Task.findOneAndUpdate({ _id: id }, updatedProperties, {
      new: true,
    });

    res.send(wrapSuccessResponse({ task: updatedTask }));
  } catch (err) {
    res.send(wrappedErrorMessage('UPDATE_TASK_FAILED', err));
  }
});

// delete task
Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    if (!id) throw new Error('INVALID_ID');

    const taskToDelete = await Task.findOne({ _id: id });

    if (String(taskToDelete.user) !== currentUserId) throw new Error('NO_PERMISSION');

    const deletedTask = await Task.deleteOne({ _id: id });

    res.send(wrapSuccessResponse({ task: deletedTask }));
  } catch (err) {
    res.send(wrappedErrorMessage('DELETE_TASK_FAILED', err));
  }
});

export default Router;
