import { useAppContext } from '../../context/AppContext';
import listIcon from '../../assets/analyticsIcons/listIcon.png';
import CardLoader from '../../utils/loaders/CardLoader';

export default function Analytics() {
  const { backlogTodos, todos, inProgressToDos, doneTodos, isLoading } =
    useAppContext();

  return (
    <div className='analytics'>
      <div className='heading'>Analytics</div>
      <div className='analytics-contents'>
        <div className='left-container'>
          <AnalyticsItems itemTitle={'Backlog Tasks'} analyticsData={20} />
          <AnalyticsItems itemTitle={'To-do Tasks'} analyticsData={20} />
          <AnalyticsItems itemTitle={'In-Progress Tasks'} analyticsData={20} />
          <AnalyticsItems itemTitle={'Completed Tasks'} analyticsData={20} />
        </div>
        <div className='right-container'>
          <AnalyticsItems itemTitle={'Low Priority'} analyticsData={30} />
          <AnalyticsItems itemTitle={'Moderate Priority'} analyticsData={30} />
          <AnalyticsItems itemTitle={'High Priority'} analyticsData={30} />
          <AnalyticsItems itemTitle={'Due Date Tasks'} analyticsData={30} />
        </div>
      </div>
    </div>
  );
}

function AnalyticsItems({ itemTitle, analyticsData }) {
  // const { isLoading } = useAppContext();
  let isLoading = false;
  return isLoading ? (
    <CardLoader />
  ) : (
    <div>
      <div>
        <img className='list-icon' src={listIcon} alt='' />
        <span className='list-title'>{itemTitle}</span>
      </div>
      <div className='list-data'>{analyticsData}</div>
    </div>
  );
}
