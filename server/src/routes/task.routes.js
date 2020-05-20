import { Router as ExpressRouter } from 'express';
import { TaskController } from '../controllers';
import Middleware from '../middleware';

const Router = ExpressRouter();

// get all tasks
Router.get('/', Middleware.withAuth, TaskController.listTasks);

// find task by id
Router.get('/find/:id', Middleware.withAuth, TaskController.findTaskById);

// get current user task
Router.get('/mine', Middleware.withAuth, TaskController.getCurrentUserTask);

// create task
Router.post('/', Middleware.withAuth, TaskController.createTask);

// update task
Router.patch('/:id', Middleware.withAuth, Middleware.withPermission, TaskController.updateTask);

// delete task
Router.delete('/:id', Middleware.withAuth, Middleware.withPermission, TaskController.deleteTask);

export default Router;
