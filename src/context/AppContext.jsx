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

  const userName = localStorage.getItem('name');

  const [backlogTodos, setBacklogTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [inProgressToDos, setInProgressToDos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  const [isTodoUpdated, setIsTodoUpdated] = useState(false);

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
    console.log('isTodoUpdated');
  }, [isTodoUpdated]);

  return (
    <AppContext.Provider
      value={{
        customModalStyles,
        backlogTodos,
        todos,
        inProgressToDos,
        doneTodos,
        userName,
        setIsTodoUpdated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
