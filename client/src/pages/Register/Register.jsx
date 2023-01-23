import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { register } from '../../redux/auth/auth.actions'
import { setAlert } from '../../redux/alert/alert.actions'
import './Register.css'

const Register = ({register, isAuthenticated }) => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: ''
    });

    const { username, password, firstname, lastname, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        register({ username, password, firstname, lastname, email });
    };

    if (isAuthenticated) {
        return navigate('/');
    }

    return (
           <div>
            <div className='signup' id="signup">
                <div className="signup-container">

                    <div className="row">
                        <div className="col-md-6 signup-form">

                            <div className="signup-title">
                                <h3>Login to your account</h3>
                                <p>Already have an account? <Link to="/login">SignIn</Link></p>
                            </div>

                            <form onSubmit={e => onSubmit(e)}>
                                <input 
                                    type='email'
                                    name='email'
                                    value={email}
                                    placeholder='Email'
                                    onChange={e => onChange(e)}
                                    id='email'
                                /><br />
                                <div className="names">
                                    <input className="form-name"
                                        type='text'
                                        name='firstname'
                                        value={firstname}
                                        onChange={e => onChange(e)}
                                        placeholder='First Name'
                                        id='firstname'
                                    /><br />
                                    <input className="form-name"
                                        type='text'
                                        name='lastname'
                                        value={lastname}
                                        placeholder='Last Name'
                                        onChange={e => onChange(e)}
                                        id='lastname'
                                    /><br />
                                </div>

                                <input
                                    type='text'
                                    name='username'
                                    value={username}
                                    placeholder='Username'
                                    onChange={e => onChange(e)}
                                    id='username'
                                /><br />

                                <input
                                    type='password'
                                    name='password'
                                    value={password}
                                    placeholder='Password'
                                    onChange={e => onChange(e)}
                                    id='password'
                                /><br />
                                <button className="signup-button">Sign Up</button>
                            </form>

                            <div className="terms">
                                <p>I agree to the <Link to="">privacy policy</Link> and <Link to="/test">terms of service.</Link></p>

                                <Link to="">Already have an account?</Link>
                            </div>
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
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);