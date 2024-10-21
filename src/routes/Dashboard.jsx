import { Routes, Route, Navigate } from 'react-router-dom';
import Menus from '../components/Private/Menus';
import Board from '../components/Private/board/Board';
import Analytics from '../components/Private/Analytics';
import Settings from '../components/Private/Settings';

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
