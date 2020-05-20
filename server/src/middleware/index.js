import { wrappedErrorMessage } from '../utils';
import { Task } from '../models';

const withAuth = (req, res, next) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHENTICATED');

    next();
  } catch (err) {
    res.send(wrappedErrorMessage('WITH_AUTH_ERROR', err));
  }
};

const withPermission = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { _id: currentUserId } = req.session.currentUser || {};

    const task = await Task.findOne({ _id: taskId });

    if (String(task.user) !== currentUserId) throw new Error('INSUFFICIENT_PERMISSION');

    next();
  } catch (err) {
    res.send(wrappedErrorMessage('WITH_PERMISSION_ERROR', err));
  }
};

const middleware = { withAuth, withPermission };

export default middleware;
