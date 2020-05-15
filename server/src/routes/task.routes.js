import { Router as ExpressRouter } from 'express';
import { Task } from '../models';
import { wrappedErrorMessage, regexString, isNil, nullifyEmptyValues } from '../utils';

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

    res.send({ tasks });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to retrieve list of tasks', err));
  }
});

// find task by id
Router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.body;

    const task = await Task.findById(id);

    res.send({ task });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to retrieve task by id', err));
  }
});

// get current user task
Router.get('/mine', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) return res.send(wrappedErrorMessage('Not logged in'));

    const myTasks = await Task.find({ user: _id }).populate('user');

    res.send({ tasks: myTasks });
  } catch (err) {
    res.send(wrappedErrorMessage("Failed to retrieve current user's tasks", err));
  }
});

// create task
Router.post('/', async (req, res) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) return res.send(wrappedErrorMessage('Not logged in'));
    console.log('im here', req.body);
    const newTaskData = nullifyEmptyValues(req.body);

    console.log('new task data', newTaskData);

    const taskSchema = new Task({ ...newTaskData, user: _id });

    const newTask = await taskSchema.save();
    console.log('new task', newTask);
    res.send({ task: newTask });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to create new task', err));
  }
});

// update task
Router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    if (!id) return res.send(wrappedErrorMessage('ID required to updated task'));

    const updatedProperties = nullifyEmptyValues(req.body);

    const taskToUpdate = await Task.findOne({ _id: id });

    if (String(taskToUpdate.user) !== currentUserId)
      res.send(wrappedErrorMessage('Failed to update - This task does not belong to the current user'));

    const updatedTask = await Task.findOneAndUpdate({ _id: id }, updatedProperties, {
      new: true,
    });

    res.send({ task: updatedTask, updated: true });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to update task', err));
  }
});

// delete task
Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    if (!id) return res.send(wrappedErrorMessage('ID required to delete task'));

    const taskToDelete = await Task.findOne({ _id: id });

    if (String(taskToDelete.user) !== currentUserId)
      res.send(wrappedErrorMessage('Failed to delete - This task does not belong to the current user'));

    const deletedTask = await Task.deleteOne({ _id: id });

    res.send({ task: deletedTask, deleted: true });
  } catch (err) {
    res.send(wrappedErrorMessage('Failed to delete task', err));
  }
});

export default Router;
