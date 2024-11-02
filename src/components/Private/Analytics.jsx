import { useAppContext } from '../../context/AppContext';
import listIcon from '../../assets/analyticsIcons/listIcon.png';
import CardLoader from '../../utils/loaders/CardLoader';

export default function Analytics() {
  const {
    backlogTodos,
    todos,
    inProgressToDos,
    doneTodos,
    analyticsData,
    isLoading,
  } = useAppContext();

  console.log(isLoading, 'isLoading');

  return isLoading ? (
    <CardLoader />
  ) : (
    analyticsData && analyticsData.dueDateCount && (
      <div className='analytics'>
        <div className='heading'>Analytics</div>
        <div className='analytics-contents'>
          <div className='left-container'>
            <AnalyticsItems
              itemTitle={'Backlog Tasks'}
              analyticsData={backlogTodos.length}
            />
            <AnalyticsItems
              itemTitle={'To-do Tasks'}
              analyticsData={todos.length}
            />
            <AnalyticsItems
              itemTitle={'In-Progress Tasks'}
              analyticsData={inProgressToDos.length}
            />
            <AnalyticsItems
              itemTitle={'Completed Tasks'}
              analyticsData={doneTodos.length}
            />
          </div>
          <div className='right-container'>
            <AnalyticsItems
              itemTitle={'Low Priority'}
              analyticsData={analyticsData.priorityCounts.low}
            />
            <AnalyticsItems
              itemTitle={'Moderate Priority'}
              analyticsData={analyticsData.priorityCounts.moderate}
            />
            <AnalyticsItems
              itemTitle={'High Priority'}
              analyticsData={analyticsData.priorityCounts.high}
            />
            <AnalyticsItems
              itemTitle={'Due Date Tasks'}
              analyticsData={analyticsData.dueDateCount}
            />
          </div>
        </div>
      </div>
    )
  );
}

function AnalyticsItems({ itemTitle, analyticsData }) {
  // let isLoading = false;
  return (
    <div>
      <div>
        <img className='list-icon' src={listIcon} alt='' />
        <span className='list-title'>{itemTitle}</span>
      </div>
      <div className='list-data'>{analyticsData}</div>
    </div>
  );
}
