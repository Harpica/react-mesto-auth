import { useState } from 'react';
import Logo from './Logo';
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className='header'>
      <div className='header__menu-container'>
        <Logo />
        <button
          type='button'
          className={`button header__hamburger ${
            isOpen ? 'header__hamburger_active' : ''
          }`}
          onClick={handleMenuOnClick}
        />
      </div>
      <div
        className={`header__profile-container ${
          isOpen ? 'header__profile-container_active' : ''
        }`}
      >
        <p className='header__email'>email</p>
        <button
          className='button header__button'
          type='button'
          aria-label='Выйти из профиля'
        >
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
