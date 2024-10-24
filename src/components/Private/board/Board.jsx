import { useAppContext } from '../../../context/AppContext';
import ToDoCategory from './ToDoCategory';
import CurrentDate from '../../CurrentDate';
import peopleOnBoard from '../../../assets/boardIcons/peopleOnBoard.png';

import './BoardStyles.css';

export default function Board() {
  const { backlogTodos, todos, inProgressToDos, doneTodos, userName } =
    useAppContext();

  return (
    <div className='board'>
      <div className='board-heading'>Welcome!, {userName}</div>
      <div className='sub-heading'>
        <span>Board</span>
        <img src={peopleOnBoard} alt='people on board' />
        <span className='cursor-pointer'>Add People</span>
      </div>
      <div className='right-contents'>
        <CurrentDate />
        <div>week filter</div>
      </div>
      <div className='to-do-section'>
        {/* to Only render the components when todo arrays are not empty */}
        {backlogTodos.length > 0 && (
          <ToDoCategory categoryHeading={'Backlog'} toDos={backlogTodos} />
        )}
        {todos.length > 0 && (
          <ToDoCategory categoryHeading={'To do'} toDos={todos} />
        )}
        {inProgressToDos.length > 0 && (
          <ToDoCategory
            categoryHeading={'In progress'}
            toDos={inProgressToDos}
          />
        )}
        {doneTodos.length > 0 && (
          <ToDoCategory categoryHeading={'Done'} toDos={doneTodos} />
        )}
      </div>
    </div>
  );
}
