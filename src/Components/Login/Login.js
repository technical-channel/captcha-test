import React from 'react';
import styles from "./Login.module.css"

const Login = ({ isShowLogin}) => {
  return (
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="Login-form">
        <div className='form-box solid'>
          <form>
            <h1 className='login-text'>Login</h1>
            <label>User Id</label><br></br>
            <input type="text" name="username" className="login-box"></input>

            <label>User Id</label><br></br>
            <input type="password" name="password" className="login-box"></input>
            <div>
              <input type="submit" value ="LOGIN" className='login-btn'></input>
            </div>
            
          </form>
        </div>
      </div>
      
      
    </div>
  )
}

export default Login;
