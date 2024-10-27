import { useEffect, useState } from 'react';
import todoEditIcon from '../../../assets/boardIcons/todoEditIcon.png';
import lowPriorityIcon from '../../../assets/boardIcons/lowPriorityIcon.png';
import moderatePriorityIcon from '../../../assets/boardIcons/moderatePriorityIcon.png';
import highPriorityIcon from '../../../assets/boardIcons/highPriorityIcon.png';
import assignedToBackground from '../../../assets/boardIcons/assignedToBackground.png';
import collapseList from '../../../assets/boardIcons/collapseList.png';
import expandList from '../../../assets/boardIcons/expandList.png';
import AddDate from '../../AddDate';

export default function ToDo({ todo, collapseAllTodos }) {
  const checked = todo.checklist.filter(item => item.checked === true).length;
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    setIsListOpen(false);
  }, [collapseAllTodos]);

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
          {todo.assignedTo !== '' && (
            <div className='assigned-to'>
              <img src={assignedToBackground} alt='' />
              <span>{'DM'}</span>
            </div>
          )}
        </div>
        <div className='todo-heading-right-contents'>
          <img
            style={{ height: '0.5vh', width: '1vw' }}
            src={todoEditIcon}
            alt='editIcon'
          />
        </div>
      </div>
      {/* todo Title */}
      <div className='todo-title' title={todo.title}>
        {todo.title}
      </div>
      {/* checklist */}
      <div className='todo-checklist'>
        <div className='checklist-heading-section'>
          <div className='checklist-heading'>{`CheckList (${checked}/${todo.checklist.length})`}</div>
          <img
            onClick={() => setIsListOpen(!isListOpen)}
            src={isListOpen ? collapseList : expandList}
            alt=''
          />
        </div>
        {isListOpen && (
          <div className='checklist'>
            {todo.checklist.map(item => (
              <div key={item.id} className='checklist-item'>
                <input type='checkbox' checked={item.checked} />
                <span className='checkmark'></span>
                <div className='checklist-item-description'>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='todo-footer'>
        {todo.dueDate !== '' && (
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
            <div className='todo-backlog todo-chips cursor-pointer'>
              BACKLOG
            </div>
          )}
          {todo.status !== 'todo' && (
            <div className='todo-todo todo-chips cursor-pointer'>TO-DO</div>
          )}
          {todo.status !== 'in-Progress' && (
            <div className='todo-inProgress todo-chips cursor-pointer'>
              PROGRESS
            </div>
          )}
          {todo.status !== 'done' && (
            <div className='todo-done todo-chips cursor-pointer'>DONE</div>
          )}
        </div>
      </div>
    </div>
  );
}
