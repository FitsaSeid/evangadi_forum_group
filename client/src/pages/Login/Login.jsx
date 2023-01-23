import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.css'


import { login } from '../../redux/auth/auth.actions';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    
  });

  const navigate = useNavigate()
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return navigate('/');
  }

  return (
    <div className='login' id='login'>
      <div className="login-container">

        <div className="row">
          <div className="col-md-6 login-form remover" id='signin'>

            <div className="login-title">
              <h3>Login to your account</h3>
              <p>Don’t have an account? 
              <Link to='/register'>Create a new account</Link></p>
            </div>

            <form onSubmit={e => onSubmit(e)}>
              <input
                    type='text'
                    name='email'
                    value={email}
                    placeholder='Email'
                    onChange={e => onChange(e)}
                    id='email'
                  />
              <input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={e => onChange(e)}
                    id='password'

                  />
              <br />
              <p className='forgot-password'><Link to="/register">Forgot password?</Link></p>

              <button className='login-button'>Login</button>
            </form>

          </div>
         
          <div className="col-md-6">
            <p className='evangadi-about'>About</p>
            <h2 className='evangadi-title'>Evangadi Networks</h2>
            <p className='evangadi-desc'>
              No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.

              Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
            </p>
            <button className='info-button'>HOW IT WORKS</button>
          </div>
        </div>
      </div>
    </div>
  )

};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);