import React from "react";

import "./style.css";

export default function Header({ black }) {
  return (
    <header className={black ? "BGblack" : null}>
      <div className='header--logo'>
        <a href='/'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png'
            alt='logo Netflix'
          />
        </a>
      </div>
      <div className='header--user'>
        <a href='/'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt='Usuario'
          />
        </a>
      </div>
    </header>
  );
}
