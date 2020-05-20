import { Router as ExpressRouter } from 'express';
import { RootController } from '../controllers';
import Uploader from '../storage';

const Router = ExpressRouter();

Router.get('/', RootController.serverHealthCheck);

Router.post('/sign-in', RootController.signIn);

Router.post('/sign-out', RootController.signOut);

export default Router;
