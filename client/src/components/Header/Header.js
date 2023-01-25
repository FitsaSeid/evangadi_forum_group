import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import { logout } from '../../redux/auth/auth.actions'
// import evangadi from './evangadi-logo.png'


const Header = ({ auth: { isAuthenticated, loading }, logout}) => {

    const authLinks = (
        <div className='btns'>
            <Link onClick={logout} to='/login'>
                <button type='button' className=' bn53'>Log out</button>
            </Link>
        </div>
    );
    const authTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">Home</Link>
        </div>
    );

    const guestLinks = (
        <div className='btns'>
            <Link to='#' class="nav-item" href="#">How it works</Link>
            
            <Link to='/register'>
                <button type='button' className='header-signup'>Sign up</button>
            </Link>
        </div>
    );

    const guestTabs = (
        <div className="s-navigation">
           
        </div>
    );
    
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div>
                        <a class="navbar-brand" ><img src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png' alt="" /></a>
                        {!loading && (
                            <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
                        )}
                        <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>


                    <div class="collapse navbar-collapse header-menu" id="navbarColor03">
                        <ul class="navbar-nav me-auto">
                            {/* <li class="nav-item">
                                <a class="nav-link active" href="#">Home
                                    <span class="visually-hidden">(current)</span>
                                </a>
                            </li> */}
                            {/* <li class="nav-item">
                                <a class="nav-link" href="#">How it works</a>
                            </li> */}

                            {/* <li class="nav-item">
                                <button  className='header-signup'>SIGN IN</button>
                            </li> */}

                        </ul>
                        {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}

                    </div>
                </div>
            </nav>


        </header>
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);