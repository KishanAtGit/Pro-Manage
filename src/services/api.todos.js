import apiClient from '../axios.config';
import { notifyOnFail, notifyOnSuccess } from '../utils/toast';

export const getTodos = async () => {
  const UserId = localStorage.getItem('userId');
  try {
    const res = await apiClient({
      method: 'get',
      url: 'todo/getTodos',
      data: UserId,
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    // console.log(error);
    return error;
  }
};
