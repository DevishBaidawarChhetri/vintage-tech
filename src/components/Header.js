import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import CartLink from './Cart/CartLink';
import { UserContext } from '../context/user';
import LoginLink from './LoginLink';

const Header = () => {
  const { user } = React.useContext(UserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Company Logo" className="logo" />
      </Link>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Product</Link>
            </li>
            {
              user.token &&
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            }
          </div>
          <div>
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Header
