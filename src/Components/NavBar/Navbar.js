import React from 'react';
import styles from "./Navbar.module.css"

function Navbar({ handleLoginClick}) {
    const handleClick = () => {
        handleLoginClick()
    }
  return (
    <div className= {styles.navbar}>
      <div>
        <span onClick={handleClick} className="loginicon">Login</span>
      </div>
    </div>
  )
}

export default Navbar;
