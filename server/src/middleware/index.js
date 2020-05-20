import { wrappedErrorMessage } from '../utils';

const withAuth = (req, res, next) => {
  try {
    const { _id } = req.session.currentUser || {};

    if (!_id) throw new Error('UNAUTHENTICATED');

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
