import { createContext, useContext, useEffect, useState } from 'react';
import { todosDataFromConstants } from '../constants/todosData';
import { getTodos } from '../services/api.todos';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: '#303D438C',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  //temp data from constants
  // let todosData = todosDataFromConstants;
  const userName = localStorage.getItem('name');

  const [backlogTodos, setBacklogTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [inProgressToDos, setInProgressToDos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  // const categorizeTodos = () => {
  //   const backlog = todosData.filter(todo => todo.status === 'backlog');
  //   const todos = todosData.filter(todo => todo.status === 'todo');
  //   const inProgress = todosData.filter(todo => todo.status === 'in-Progress');
  //   const done = todosData.filter(todo => todo.status === 'done');

  //   setBacklogTodos(backlog);
  //   setTodos(todos);
  //   setInProgressToDos(inProgress);
  //   setDoneTodos(done);
  // };

  useEffect(() => {
    const todosData = async () => {
      const res = await getTodos();
      if (res.status === 200) {
        const { backlog, todos, inProgress, done } = res.data;
        setBacklogTodos(backlog);
        setTodos(todos);
        setInProgressToDos(inProgress);
        setDoneTodos(done);
      }
    };

    todosData();
  }, []);

  // console.log(todosData, 'todosData-app context');

  return (
    <AppContext.Provider
      value={{
        customModalStyles,
        backlogTodos,
        todos,
        inProgressToDos,
        doneTodos,
        userName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
