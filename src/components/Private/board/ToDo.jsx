import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
  deleteTodo,
  updateChecklist,
  updateTodoStatus,
} from '../../../services/api.todos';
import todoEditIcon from '../../../assets/boardIcons/todoEditIcon.png';
import DeleteLogoutModal from '../../DeleteLogoutModal';
import AddDate from '../../AddDate';

import lowPriorityIcon from '../../../assets/boardIcons/lowPriorityIcon.png';
import moderatePriorityIcon from '../../../assets/boardIcons/moderatePriorityIcon.png';
import highPriorityIcon from '../../../assets/boardIcons/highPriorityIcon.png';
import assignedToBackground from '../../../assets/boardIcons/assignedToBackground.png';
import collapseList from '../../../assets/boardIcons/collapseList.png';
import expandList from '../../../assets/boardIcons/expandList.png';
import CreateTodoModal from './CreateTodoModal';

export default function ToDo({ todo, collapseAllTodos }) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isOptionModeOpen, setIsOptionModeOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTodoEditModalOpen, setIsTodoEditModalOpen] = useState(false);
  const [checkList, setCheckList] = useState(todo.checklist);
  const checked = checkList.filter(item => item.checked === true).length;
  const { setIsTodoUpdated } = useAppContext();

  useEffect(() => {
    setCheckList(todo.checklist);
  }, [todo]);

  useEffect(() => {
    setIsListOpen(false);
  }, [collapseAllTodos]);

  const editOptionsRef = useRef(null);

  const handleOutsideClick = event => {
    if (
      editOptionsRef.current &&
      !editOptionsRef.current.contains(event.target)
    ) {
      setIsOptionModeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleTodoStatus = async (todoId, status) => {
    const res = await updateTodoStatus(todoId, status);
    if (res.status === 200) {
      setIsTodoUpdated(prev => !prev);
    }
  };

  const getInitials = email => {
    if (typeof email !== 'string' || !email.includes('@')) return '';
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className='todo-card'>
      {/* todo headings */}
      <div className='todo-heading'>
        <div className='todo-heading-left-contents'>
          <img
            className='priority-icon'
            src={
              todo.priority === 'low'
                ? lowPriorityIcon
                : todo.priority === 'moderate'
                ? moderatePriorityIcon
                : highPriorityIcon
            }
            alt='priorityIcon'
          />
          <span style={{ fontSize: '0.9em', color: '#707070' }}>
            {todo.priority.toUpperCase() + ' PRIORITY'}
          </span>
          {todo.assignedTo && (
            <div className='assigned-to'>
              <img src={assignedToBackground} alt='' />
              <span>{getInitials(todo.assignedTo.email)}</span>
            </div>
          )}
        </div>
        <div className='todo-heading-right-contents'>
          <img
            style={{ height: '0.5vh', width: '1vw', cursor: 'pointer' }}
            src={todoEditIcon}
            alt='editIcon'
            onClick={() => setIsOptionModeOpen(prev => !prev)}
          />
          {isOptionModeOpen && (
            <div className='edit-options' ref={editOptionsRef}>
              <div onClick={() => setIsTodoEditModalOpen(true)}>Edit</div>
              <div>Share</div>
              <div onClick={() => setIsDeleteModalOpen(true)}>Delete</div>
            </div>
          )}
        </div>
      </div>
      {/* todo Title */}
      <div className='todo-title' title={todo.title}>
        {todo.title}
      </div>
      {/* checklist */}
      <div className='todo-checklist'>
        <div className='checklist-heading-section'>
          <div className='checklist-heading'>{`CheckList (${checked}/${checkList.length})`}</div>
          <img
            onClick={() => setIsListOpen(!isListOpen)}
            src={isListOpen ? collapseList : expandList}
            alt=''
          />
        </div>
        {isListOpen && (
          <div className='checklist'>
            {checkList.map(item => (
              <div key={item._id} className='checklist-item'>
                <input
                  type='checkbox'
                  checked={item.checked}
                  onChange={() => {}}
                />
                <span
                  className='checkmark'
                  onClick={async () => {
                    setCheckList(prev =>
                      prev.map(i =>
                        i._id === item._id ? { ...i, checked: !i.checked } : i
                      )
                    );
                    updateChecklist(todo._id, item._id);
                  }}
                ></span>
                <div className='checklist-item-description'>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='todo-footer'>
        {todo.dueDate && (
          <div
            style={
              todo.status === 'done'
                ? { backgroundColor: '#63C05B', color: 'white' }
                : todo.priority === 'high'
                ? { backgroundColor: '#CF3636', color: 'white' }
                : {}
            }
            className='todo-dueDate todo-chips'
          >
            <AddDate date={todo.dueDate} />
          </div>
        )}
        <div className='todo-footer-right-buttons'>
          {todo.status !== 'backlog' && (
            <div
              onClick={() => handleTodoStatus(todo._id, 'backlog')}
              className='todo-backlog todo-chips cursor-pointer'
            >
              BACKLOG
            </div>
          )}
          {todo.status !== 'todo' && (
            <div
              onClick={() => handleTodoStatus(todo._id, 'todo')}
              className='todo-todo todo-chips cursor-pointer'
            >
              TO-DO
            </div>
          )}
          {todo.status !== 'in-Progress' && (
            <div
              onClick={() => handleTodoStatus(todo._id, 'in-Progress')}
              className='todo-inProgress todo-chips cursor-pointer'
            >
              PROGRESS
            </div>
          )}
          {todo.status !== 'done' && (
            <div
              onClick={() => handleTodoStatus(todo._id, 'done')}
              className='todo-done todo-chips cursor-pointer'
            >
              DONE
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteLogoutModal
          modalIsOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          modalContent={'Are you sure you want to Delete?'}
          modalType={'Delete'}
          modalFunction={async () => {
            await deleteTodo(todo._id);
            setIsTodoUpdated(prev => !prev);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
      {isTodoEditModalOpen && (
        <CreateTodoModal
          modalIsOpen={isTodoEditModalOpen}
          closeModal={() => setIsTodoEditModalOpen(false)}
          todo={todo}
          checkList={checkList}
        />
      )}
    </div>
  );
}
