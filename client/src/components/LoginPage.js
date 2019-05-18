import PropTypes from 'prop-types';
import React from 'react';

const LoginPage = (props) => {
    const {action,userOnChange, passOnChange, submit} = props
    return (
        <div className="inner-container">
          <div className="header">
            {action}
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                onChange={userOnChange}/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={passOnChange}/>
            </div>
  
            <button
              type="button"
              className="login-btn"
              onClick={submit}>{action}</button>
  
          </div>
        </div>
    )
};

LoginPage.propTypes = {
    action : PropTypes.string.isRequired,
    userOnChange : PropTypes.func.isRequired,
    passOnChange : PropTypes.func.isRequired,
    submit : PropTypes.func.isRequired
};

export default LoginPage