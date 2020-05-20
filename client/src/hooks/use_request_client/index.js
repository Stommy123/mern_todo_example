import axios from 'axios';
import { StorageKey } from 'global_constants';

const useRequestClient = _ => {
  const authToken = sessionStorage.getItem(StorageKey.AUTH_TOKEN);

  const headers = authToken ? { authorization: authToken } : {};

  const mergeOptions = (opts = {}) => ({ ...opts, headers: { ...headers, ...opts.headers } });

  const getRequest = (url, options) => axios.get(url, mergeOptions(options));

  const postRequest = (url, body, options) => axios.post(url, body, mergeOptions(options));

  const patchRequest = (url, body, options) => axios.patch(url, body, mergeOptions(options));

  const deleteRequest = (url, options) => axios.delete(url, mergeOptions(options));

  return {
    get: getRequest,
    post: postRequest,
    patch: patchRequest,
    delete: deleteRequest,
  };
};

export default useRequestClient;
