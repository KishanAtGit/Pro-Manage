import { useEffect, useRef, useState } from 'react';
import ToDo from './ToDo';
import addTodosIcon from '../../../assets/boardIcons/addTodosIcon.png';
import collapseTodos from '../../../assets/boardIcons/collapseTodos.png';

export default function ToDoCategory({ categoryHeading, toDos }) {
  console.log(toDos, `todos-${categoryHeading}`);
  const [isScrollable, setIsScrollable] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setIsScrollable(
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      );
    }
  }, [toDos]);

  return (
    <div className='to-do-category-box'>
      <div className='head-section'>
        <div className='category-heading'>{categoryHeading}</div>
        <div className='todo-icons flex-center'>
          {categoryHeading === 'To do' && (
            <img
              className='add-todos cursor-pointer'
              src={addTodosIcon}
              alt='add-todos'
            />
          )}
          <img
            className='collapse-todos cursor-pointer'
            src={collapseTodos}
            alt='collapse-todos'
          />
        </div>
      </div>
      <div
        ref={containerRef}
        className={`todos-section ${!isScrollable ? 'no-scrollbar' : ''}`}
      >
        {toDos.map(todo => (
          <ToDo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
