import mateLogoGreen from '../assets/mate-logo-green.png';
import './EmptyState.scss';

function EmptyState() {
  return (
    <>
      <h2 className='header'>EmptyState</h2>
      <h3 className='text'>Sorry, we didn't find what you want</h3>
      <img src={mateLogoGreen} className='emptyState-app-logo' alt='logo' />
    </>
  );
}

export default EmptyState;
