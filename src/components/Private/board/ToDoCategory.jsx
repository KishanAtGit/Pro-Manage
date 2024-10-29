import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import ToDo from './ToDo';
import CardLoader from '../../../utils/loaders/CardLoader';
import addTodosIcon from '../../../assets/boardIcons/addTodosIcon.png';
import collapseTodos from '../../../assets/boardIcons/collapseTodos.png';

export default function ToDoCategory({
  categoryHeading,
  toDos,
  setCreateTodo,
}) {
  console.log(toDos, `todos-${categoryHeading}`);
  const [isScrollable, setIsScrollable] = useState(false);
  const [collapseAllTodos, setCollapseAllTodos] = useState(false);
  const containerRef = useRef(null);
  const { location, isLoading } = useAppContext();

  const checkIfScrollable = () => {
    if (containerRef.current) {
      setIsScrollable(
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      );
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      checkIfScrollable();
    });

    // Start observing the container for changes
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });

      checkIfScrollable();
    }

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [toDos, collapseAllTodos, location]);

  const onCollapse = () => {
    setCollapseAllTodos(!collapseAllTodos);
  };

  return (
    <div className='to-do-category-box'>
      <div className='head-section'>
        <div className='category-heading'>{categoryHeading}</div>
        <div className='todo-icons flex-center'>
          {categoryHeading === 'To do' && (
            <img
              onClick={() => setCreateTodo(true)}
              className='add-todos cursor-pointer'
              src={addTodosIcon}
              alt='add-todos'
            />
          )}
          <img
            className='collapse-todos cursor-pointer'
            src={collapseTodos}
            alt='collapse-todos'
            onClick={onCollapse}
          />
        </div>
      </div>
      {isLoading ? (
        <>
          <CardLoader />
          <CardLoader />
        </>
      ) : (
        <div
          ref={containerRef}
          className={`todos-section ${!isScrollable ? 'no-scrollbar' : ''}`}
        >
          {toDos.map(todo => (
            <ToDo
              key={todo._id}
              todo={todo}
              collapseAllTodos={collapseAllTodos}
            />
          ))}
        </div>
      )}
    </div>
  );
}
