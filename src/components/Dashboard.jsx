import { Routes, Route, Navigate } from 'react-router-dom';
import Menus from './Menus';
import Board from './Board';
import Analytics from './Analytics';
import Settings from './Settings';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Menus />
      <div className='right-contents'>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard/board' />} />
          <Route path='/board' element={<Board />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}
