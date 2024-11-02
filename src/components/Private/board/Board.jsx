import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import ToDoCategory from './ToDoCategory';
import AddDate from '../../AddDate';
import peopleOnBoard from '../../../assets/boardIcons/peopleOnBoard.png';
import CreateTodoModal from './CreateTodoModal';

import './BoardStyles.css';
import weekFilterIcon from '../../../assets/boardIcons/weekFilterIcon.png';

export default function Board() {
  const {
    backlogTodos,
    todos,
    inProgressToDos,
    doneTodos,
    userName,
    todoFilter,
    setTodoFilter,
  } = useAppContext();

  const [createTodo, setCreateTodo] = useState(false);
  const [isTodoFilterOpen, setIsTodoFilterOpen] = useState(false);

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsTodoFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='board'>
      <div className='board-heading'>Welcome!, {userName}</div>
      <div className='sub-heading'>
        <span>Board</span>
        <img src={peopleOnBoard} alt='people on board' />
        <span className='cursor-pointer'>Add People</span>
      </div>
      <div className='right-contents'>
        <div style={{ color: '#707070', fontWeight: '500' }}>
          <AddDate forComponent='board' date={new Date()} />
        </div>
        <div>
          <span>
            {todoFilter === 'today'
              ? 'Today'
              : todoFilter === 'thisWeek'
              ? 'This Week'
              : 'This Month'}
          </span>
          <img
            style={{ marginLeft: '0.5vw', cursor: 'pointer', height: '0.9vh' }}
            src={weekFilterIcon}
            alt=''
            onClick={() => setIsTodoFilterOpen(true)}
          />
          {isTodoFilterOpen && (
            <div useref={filterRef} className='week-filter'>
              <span
                className='cursor-pointer'
                onClick={() => {
                  setTodoFilter('today');
                  setIsTodoFilterOpen(false);
                }}
              >
                Today
              </span>
              <span
                className='cursor-pointer'
                onClick={() => {
                  setTodoFilter('thisWeek');
                  setIsTodoFilterOpen(false);
                }}
              >
                This Week
              </span>
              <span
                className='cursor-pointer'
                onClick={() => {
                  setTodoFilter('thisMonth');
                  setIsTodoFilterOpen(false);
                }}
              >
                This Month
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='to-do-section'>
        <ToDoCategory categoryHeading={'Backlog'} toDos={backlogTodos} />
        <ToDoCategory
          categoryHeading={'To do'}
          toDos={todos}
          setCreateTodo={setCreateTodo}
        />
        <ToDoCategory categoryHeading={'In progress'} toDos={inProgressToDos} />
        <ToDoCategory categoryHeading={'Done'} toDos={doneTodos} />
      </div>
      {createTodo && (
        <CreateTodoModal
          modalIsOpen={createTodo}
          closeModal={() => setCreateTodo(false)}
        />
      )}
    </div>
  );
}
