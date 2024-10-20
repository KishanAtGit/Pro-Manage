import welcomePageIconBackground from '../../assets/loginPageIcons/welcomePageIconBackground.png';
import welcomePageIcon from '../../assets/loginPageIcons/welcomePageIcon.png';

export default function WelcomeSection() {
  return (
    <div className='auth-page-welcome-section'>
      <div className='welcome-image'>
        <img
          className='background-image'
          src={welcomePageIconBackground}
          alt='welcome page icon background'
        />
        <img
          className='welcome-page-icon'
          src={welcomePageIcon}
          alt='welcome page icon'
        />
      </div>
      <div className='welcome-text'>
        <div>Welcome aboard my friend </div>
        <div>just a couple of clicks and we start</div>
      </div>
    </div>
  );
}
