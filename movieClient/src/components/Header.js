import { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import MovieLogo from '../app/assets/img/logo.png';
import UserLoginForm from '../features/user/UserLoginForm';
import UserSignupForm from '../features/user/UserSignupForm';
import UserAvatar from '../features/user/UserAvatar';
import {
  isAuthenticated,
  userLogout,
  validateLogin,
} from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateLogin());
  }, [dispatch]);

  const userOptions = auth ? (
    <>
      <span className='navbar-text ml-auto'>
        <Button
          outline
          onClick={() => dispatch(userLogout())}
          style={{
            color: 'blue',
            border: '1px solid blue',
            margin: '5px',
          }}
        >
          <i className='fa fa-sign-out fa-lg' /> Logout
        </Button>
      </span>
      <UserAvatar />
    </>
  ) : (
    <>
      <UserLoginForm />
      <UserSignupForm />
    </>
  );

  return (
    <Navbar color='primary' sticky='top' expand='md'>
      <NavbarBrand className='ms-5' href='/'>
        <img src={MovieLogo} alt='movies logo' />
      </NavbarBrand>

      <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
      <Collapse isOpen={menuOpen} navbar>
        <Nav className='ms-auto' navbar>
          <NavItem>
            <NavLink className='nav-link' to='/'>
              <i className='fa fa-film fa-lg' /> Popular Movies
            </NavLink>
          </NavItem>
          {auth && (
            <NavItem>
              <NavLink className='nav-link' to='/watchMovies'>
                <i className='fa fa-heart fa-lg' /> WatchMovies
              </NavLink>
            </NavItem>
          )}
        </Nav>
        {userOptions}
      </Collapse>
    </Navbar>
  );
};

export default Header;
