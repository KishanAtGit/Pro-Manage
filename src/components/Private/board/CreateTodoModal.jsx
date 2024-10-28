import { useAppContext } from '../../../context/AppContext';
import { getAllUsers } from '../../../services/api.users';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodo } from '../../../services/api.todos';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import lowPriorityIcon from '../../../assets/boardIcons/lowPriorityIcon.png';
import moderatePriorityIcon from '../../../assets/boardIcons/moderatePriorityIcon.png';
import highPriorityIcon from '../../../assets/boardIcons/highPriorityIcon.png';
import checkListDeleteIcon from '../../../assets/boardIcons/checkListDeleteIcon.png';

export default function CreateTodoModal({ modalIsOpen, closeModal, todo }) {
  const { customModalStyles, setIsTodoUpdated } = useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [priority, setPriority] = useState(todo?.priority || '');
  const [checklistItems, setChecklistItems] = useState(todo?.checklist || []);
  const [dueDate, setDueDate] = useState(
    todo?.dueDate ? new Date(todo.dueDate) : null
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserIds = async () => {
      const res = await getAllUsers();
      if (res.status === 200) {
        setUserList(res.data.userList);
      }
    };

    getUserIds();
  }, []);

  useEffect(() => {
    if (todo && userList.length > 0) {
      reset({
        title: todo.title,
        priority: todo.priority,
        assignedTo: todo.assignedTo?.userId || '',
        checklist: todo.checklist,
        dueDate: todo.dueDate,
      });
      setPriority(todo.priority);
      setChecklistItems(todo.checklist);
      setDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
    }
  }, [todo, reset, userList]);

  const onSubmit = async data => {
    reset();
    setChecklistItems([]);
    setPriority('');
    setDueDate(null);
    const selectedUser = userList.find(user => user.userId === data.assignedTo);
    const formattedData = {
      ...data,
      assignedTo: selectedUser || null,
    };
    await createTodo(formattedData);
    setIsTodoUpdated(prev => !prev);
    closeModal();
    console.log(formattedData, 'data');
  };

  const handlePrioritySelection = selectedPriority => {
    setPriority(selectedPriority);
    setValue('priority', selectedPriority);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { description: '', checked: false }]);
  };

  const handleDeteChecklistItem = index => {
    const updatedChecklistItems = checklistItems.filter((_, i) => i !== index);

    setChecklistItems(updatedChecklistItems);

    setValue('checklist', updatedChecklistItems);
  };

  const handleDateChange = date => {
    if (date) {
      setDueDate(date);
      const formattedDate = date.toLocaleDateString('en-US');
      setValue('dueDate', formattedDate);
    }
    setCalendarOpen(false);
  };

  return (
    <Modal
      className={'create-todo-modal'}
      style={customModalStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-body'>
          <div className='form-heading'>
            <label>
              Title <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              placeholder='Enter Task Title'
              {...register('title', {
                required: 'Please enter the todo title',
              })}
            />
            {errors.title && (
              <p style={{ color: 'red' }}>{errors.title.message}</p>
            )}
          </div>

          <div className='priority'>
            <label>
              Select Priority <span style={{ color: 'red' }}>*</span>
            </label>
            <div className='priority-options'>
              <div
                style={
                  priority === 'high' ? { backgroundColor: '#EEECEC' } : {}
                }
                className={`high-priority-option button`}
                onClick={() => handlePrioritySelection('high')}
              >
                <img style={{ height: '1vh' }} src={highPriorityIcon} alt='' />
                <span>HIGH PRIORITY</span>
              </div>
              <div
                style={
                  priority === 'moderate' ? { backgroundColor: '#EEECEC' } : {}
                }
                className={`moderate-priority-option button`}
                onClick={() => handlePrioritySelection('moderate')}
              >
                <img
                  style={{ height: '1vh' }}
                  src={moderatePriorityIcon}
                  alt=''
                />
                <span>MODERATE PRIORITY</span>
              </div>
              <div
                style={priority === 'low' ? { backgroundColor: '#EEECEC' } : {}}
                className={`low-priority-option button`}
                onClick={() => handlePrioritySelection('low')}
              >
                <img style={{ height: '1vh' }} src={lowPriorityIcon} alt='' />
                <div>LOW PRIORITY</div>
              </div>
            </div>
            {/* Hidden input for registering priority */}
            <input
              type='hidden'
              value={priority}
              {...register('priority', {
                required: 'Please select the todo priority',
              })}
            />
            {errors.priority && (
              <p
                style={{
                  color: 'red',
                  flexBasis: '100%',
                  fontSize: '0.8em',
                  margin: '0',
                }}
              >
                {errors.priority.message}
              </p>
            )}
          </div>

          <div className='assigned-to'>
            <label>Assign to</label>
            <select className='assigned-to-select' {...register('assignedTo')}>
              <option value=''>Add a assignee</option>
              {userList.map(user => (
                <option key={user.userId} value={user.userId}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className='checklist'>
            <label>
              Checklist <span style={{ color: 'red' }}>*</span>
            </label>
            <div
              className='add-checklist-button'
              onClick={handleAddChecklistItem}
            >
              + Add New
            </div>
            {checklistItems.length === 0 && errors.checklist && (
              <p style={{ color: 'red' }}>{errors.checklist.message}</p>
            )}
            {checklistItems.map((item, index) => (
              <div key={index} className='checklist-item'>
                <input
                  type='checkbox'
                  {...register(`checklist[${index}].checked`)}
                  defaultChecked={false}
                />
                <input
                  type='text'
                  className='checklist-item-description'
                  placeholder='Type...'
                  {...register(`checklist[${index}].description`, {
                    required: 'Checklist item is required',
                  })}
                />
                <img
                  style={{ height: '2vh', width: '0.7vw', cursor: 'pointer' }}
                  src={checkListDeleteIcon}
                  alt=''
                  onClick={() => handleDeteChecklistItem(index)}
                />

                {errors.checklist && errors.checklist[index]?.description && (
                  <p style={{ color: 'red' }}>
                    {errors.checklist[index].description.message}
                  </p>
                )}
              </div>
            ))}
            {/* Hidden field to validate checklist length */}
            <input
              type='hidden'
              {...register('checklist', {
                validate: () =>
                  checklistItems.length > 0 ||
                  'At least one checklist item is required',
              })}
            />
          </div>
        </div>

        <div className='form-footers'>
          <div>
            <div
              className='due-date-button button'
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              {dueDate
                ? dueDate.toLocaleDateString('en-US')
                : 'Select due date'}
            </div>
            {calendarOpen && (
              <div style={{ position: 'absolute', inset: '18vh' }}>
                <DatePicker
                  selected={dueDate}
                  onChange={handleDateChange}
                  dateFormat='MM/dd/yyyy'
                  minDate={new Date()}
                  inline
                />
              </div>
            )}
            {errors.dueDate && (
              <p style={{ color: 'red' }}>{errors.dueDate.message}</p>
            )}
          </div>
          <div className='form-footers-right-buttons'>
            <div
              className='cancel-button button'
              onClick={() => {
                reset();
                closeModal();
              }}
            >
              Cancel
            </div>
            <button className='form-submit button' type='submit'>
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
