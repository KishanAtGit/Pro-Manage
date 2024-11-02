import { createContext, useContext, useEffect, useState } from 'react';
// import { todosDataFromConstants } from '../constants/todosData';
import { getTodos } from '../services/api.todos';
import { useLocation } from 'react-router-dom';

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
  const [analyticsData, setAnalyticsData] = useState([]);

  const [isTodoUpdated, setIsTodoUpdated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [todoFilter, setTodoFilter] = useState('thisWeek');

  const location = useLocation();

  useEffect(() => {
    const todosData = async () => {
      setIsLoading(true);
      let res;
      if (location.pathname === '/dashboard/analytics') {
        const params = { analytics: true };
        res = await getTodos(params);
      } else {
        res = await getTodos({ filter: todoFilter });
      }

      if (res.status === 200) {
        const { backlog, todos, inProgress, done, analytics } = res.data;
        setBacklogTodos(backlog);
        setTodos(todos);
        setInProgressToDos(inProgress);
        setDoneTodos(done);
        setAnalyticsData(analytics);
        setIsLoading(false);
      }
    };

    todosData();
  }, [isTodoUpdated, location.pathname, todoFilter]);

  return (
    <AppContext.Provider
      value={{
        customModalStyles,
        backlogTodos,
        todos,
        inProgressToDos,
        doneTodos,
        analyticsData,
        userName,
        setIsTodoUpdated,
        location,
        isLoading,
        setTodoFilter,
        todoFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
