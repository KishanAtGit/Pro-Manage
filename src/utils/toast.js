import { toast } from 'react-toastify';

export const notifyOnSuccess = message => {
  toast.success(message);
};

export const notifyOnFail = message => {
  toast.error(message);
};
