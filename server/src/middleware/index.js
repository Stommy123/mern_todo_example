import { wrappedErrorMessage } from '../utils';
import { Task } from '../models';

const withAuth = (req, res, next) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHORIZED_USER');

    next();
  } catch (err) {
    res.send(wrappedErrorMessage('UNAUTHENTICATED', err));
  }
};

const withPermission = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    const task = await Task.findOne({ _id: taskId });

    if (String(task.user) !== currentUserId) throw new Error('NO_PERMISSION');

    next();
  } catch (err) {
    res.send(wrappedErrorMessage('INSUFFICIENT_PERMISSION', err));
  }
};

const middleware = { withAuth, withPermission };

export default middleware;
