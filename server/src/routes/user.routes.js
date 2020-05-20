import { Router as ExpressRouter } from 'express';
import { UserController } from '../controllers';
import { User } from '../models';
import Middleware from '../middleware';
import Uploader from '../storage';

const Router = ExpressRouter();

// list of users
Router.get('/', UserController.listUsers);

// single user by id
Router.get('/find/:id', UserController.findUserById);

// current user
Router.get('/current', Middleware.withAuth, UserController.getCurrentUser);

// create user
Router.post('/', Uploader.single('image'), Middleware.withImage, UserController.createUser);

// update user
Router.patch('/', Middleware.withAuth, Middleware.withPermission(User), UserController.updateUser);

// internal delete
Router.delete('/:id', UserController.deleteUser);

export default Router;
