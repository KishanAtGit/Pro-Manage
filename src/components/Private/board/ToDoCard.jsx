import React from 'react';

export default function ToDoCard({ cardHeading, toDos }) {
  console.log(toDos, 'todos');

  return <div className='to-do-card'>{cardHeading}</div>;
}
