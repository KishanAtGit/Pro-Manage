import { useAppContext } from '../../../context/AppContext';
import ToDoCard from './ToDoCard';
import CurrentDate from '../../CurrentDate';
import peopleOnBoard from '../../../assets/boardIcons/peopleOnBoard.png';

import './BoardStyles.css';

export default function Board() {
  const { backlogTodos, todos, inProgressToDos, doneTodos, userName } =
    useAppContext();

  return (
    <div className='board'>
      <div className='heading'>Welcome!, {userName}</div>
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
        <ToDoCard cardHeading={'Backlog'} toDos={backlogTodos} />
        <ToDoCard cardHeading={'ToDo'} toDos={todos} />
        <ToDoCard cardHeading={'In Progress'} toDos={inProgressToDos} />
        <ToDoCard cardHeading={'Done'} toDos={doneTodos} />
      </div>
    </div>
  );
}
