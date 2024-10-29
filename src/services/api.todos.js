import apiClient from '../axios.config';
import { notifyOnFail, notifyOnSuccess } from '../utils/toast';

export const getTodos = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const res = await apiClient.get(`/todo/${userId}`);
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    return error;
  }
};

export const updateTodoStatus = async (todoId, status) => {
  try {
    const res = await apiClient.patch(`/todo/updateTodoStatus`, {
      todoId,
      status,
    });
    return res;
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    return error;
  }
};

export const updateChecklist = async (todoId, checklistId) => {
  try {
    const res = await apiClient.patch(`/todo/updateChecklist`, {
      todoId,
      checklistId,
    });
    return res;
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    return error;
  }
};

export const updateTodo = async todoData => {
  try {
    const res = await apiClient.patch('/todo/updateTodo', todoData);
    if (res.status === 200) {
      notifyOnSuccess(res.data.message);
    }
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    return error;
  }
};

export const createTodo = async todoData => {
  const userId = localStorage.getItem('userId');

  try {
    const res = await apiClient.post('/todo/createTodo', {
      ...todoData,
      createdBy: userId,
    });
    if (res.status === 201) {
      notifyOnSuccess(res.data.message);
    }
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    return error;
  }
};

export const deleteTodo = async todoId => {
  try {
    const res = await apiClient.delete('/todo/deleteTodo', {
      data: { todoId },
    });
    if (res.status === 200) {
      notifyOnSuccess(res.data.message);
    }
  } catch (error) {
    //default fallback for error
    notifyOnFail('Error reaching the server');
    return error;
  }
};
