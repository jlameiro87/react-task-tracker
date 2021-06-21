import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import Button from './Button';

const Header = ({ title, onShowAddTask, showAdd }) => {
  const location = useLocation();
  return (
    <header className='header'>
      <h1>{title}</h1>
      {
        location.pathname === '/' &&
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onShowAddTask} />
      }
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
