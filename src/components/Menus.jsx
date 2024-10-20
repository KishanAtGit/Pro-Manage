import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import appLogo from '../assets/menuIcons/appLogo.png';
import layout from '../assets/menuIcons/layout.png';
import database from '../assets/menuIcons/database.png';
import settings from '../assets/menuIcons/settings.png';
import Logout from '../assets/menuIcons/Logout.png';
import DeleteLogoutModal from './DeleteLogoutModal';

export default function Menus() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  useEffect(() => {
    const currentPath = location.pathname;

    // Setting selectedMenu based on the current route
    if (currentPath.includes('/dashboard/board')) {
      setSelectedMenu('board');
    } else if (currentPath.includes('/dashboard/analytics')) {
      setSelectedMenu('analytics');
    } else if (currentPath.includes('/dashboard/settings')) {
      setSelectedMenu('settings');
    }
  }, [location.pathname]);

  return (
    <div className='left-menus'>
      <div className='heading flex-center'>
        <img src={appLogo} alt='appLogo' />
        <span>Pro Manage</span>
      </div>
      <div className='menus flex-center'>
        <div
          style={
            selectedMenu === 'board'
              ? { backgroundColor: '#4391ED1A', color: 'black' }
              : {}
          }
          onClick={() => {
            navigate('/dashboard/board');
          }}
          className='cursor-pointer flex-center'
        >
          <img src={layout} alt='appLogo' />
          <span>Board</span>
        </div>
        <div
          style={
            selectedMenu === 'analytics'
              ? { backgroundColor: '#4391ED1A', color: 'black' }
              : {}
          }
          onClick={() => {
            navigate('/dashboard/analytics');
          }}
          className='cursor-pointer flex-center'
        >
          <img src={database} alt='appLogo' />
          <span>Analytics</span>
        </div>
        <div
          style={
            selectedMenu === 'settings'
              ? { backgroundColor: '#4391ED1A', color: 'black' }
              : {}
          }
          onClick={() => {
            navigate('/dashboard/settings');
          }}
          className='cursor-pointer flex-center'
        >
          <img src={settings} alt='appLogo' />
          <span>Settings</span>
        </div>
      </div>
      <div
        onClick={() => setModalIsOpen(true)}
        className='logout flex-center cursor-pointer'
      >
        <img src={Logout} alt='appLogo' />
        <span>Logout</span>
      </div>
      {modalIsOpen && (
        <DeleteLogoutModal
          modalIsOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          modalContent={'Are you sure you want to Logout?'}
          modalType={'Logout'}
          modalFunction={logout}
        />
      )}
    </div>
  );
}
