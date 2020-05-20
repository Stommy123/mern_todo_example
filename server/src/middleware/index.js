import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import { wrappedErrorMessage, parseStringifiedJSON } from '../utils';

dotenv.config();

const withAuth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').split('Bearer ')[1];
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    const parsedUserDataFromToken = parseStringifiedJSON(decodedToken, {});

    const { _id } = req.session.currentUser || {};

    const isCurrentUser = _id === parsedUserDataFromToken._id;

    if (!isCurrentUser) throw new Error('UNAUTHENTICATED');

    next();
  } catch (err) {
    res.send(wrappedErrorMessage('WITH_AUTH_ERROR', err));
  }
};

const withPermission = Resource => async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    const task = await Resource.findOne({ _id: taskId });

    if (String(task.user) !== currentUserId) throw new Error('INSUFFICIENT_PERMISSION');

    next();
  } catch (err) {
    res.send(wrappedErrorMessage('WITH_PERMISSION_ERROR', err));
  }
};

const withImage = (req, _, next) => {
  if (!req.file) {
    return next();
  }

  req.body.image = req.file.secure_url;

  next();
};

const middleware = { withAuth, withPermission, withImage };

export default middleware;
