import { Router as ExpressRouter } from 'express';
import { UserController } from '../controllers';
import Middleware from '../middleware';

const Router = ExpressRouter();

// list of users
Router.get('/', UserController.listUsers);

// single user by id
Router.get('/find/:id', UserController.findUserById);

// current user
Router.get('/current', Middleware.withAuth, UserController.getCurrentUser);

// create user
Router.post('/', UserController.createUser);

// update user
Router.patch('/', Middleware.withAuth, UserController.updateUser);

// internal delete
Router.delete('/:id', UserController.deleteUser);

export default Router;
