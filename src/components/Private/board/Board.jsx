import { useAppContext } from '../../../context/AppContext';
import ToDoCategory from './ToDoCategory';
import AddDate from '../../AddDate';
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
        <div style={{ color: '#707070', fontWeight: '500' }}>
          <AddDate forComponent='board' date={new Date()} />
        </div>
        <div>week filter</div>
      </div>
      <div className='to-do-section'>
        <ToDoCategory categoryHeading={'Backlog'} toDos={backlogTodos} />
        <ToDoCategory categoryHeading={'To do'} toDos={todos} />
        <ToDoCategory categoryHeading={'In progress'} toDos={inProgressToDos} />
        <ToDoCategory categoryHeading={'Done'} toDos={doneTodos} />
      </div>
    </div>
  );
}
