import apiClient from '../axios.config';
import { notifyOnFail, notifyOnSuccess } from '../utils/toast';

export const registerUser = async signUpData => {
  try {
    const res = await apiClient({
      method: 'post',
      url: 'auth/register',
      data: signUpData,
    });
    if (res.status === 201) {
      notifyOnSuccess(res.data.message);
    }
    return res;
  } catch (error) {
    if (error.response && error.response.status === 400)
      return notifyOnFail(error.response.data.message);

    //default fallback for error
    notifyOnFail('Error reaching the server');
    // console.log(error);
    return error.response || error;
  }
};

export const loginUser = async logInData => {
  try {
    const res = await apiClient({
      method: 'post',
      url: 'auth/login',
      data: logInData,
    });
    if (res.status === 202) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('name', res.data.name);
      notifyOnSuccess(res.data.message);
    }
    return res;
  } catch (error) {
    if (error.response && error.response.status === 400)
      return notifyOnFail(error.response.data.message);

    //default fallback for error
    notifyOnFail('Error reaching the server');
    // console.log(error);
    return error.response || error;
  }
};
