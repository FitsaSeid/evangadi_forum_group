import React, { useContext } from 'react'
import './Header.css';
// import evangadi from './evangadi-logo.png'


function Header() {

    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div>
                        <a class="navbar-brand" href="#"><img src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png' alt="" /></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>


                    <div class="collapse navbar-collapse header-menu" id="navbarColor03">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Home
                                    <span class="visually-hidden">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">How it works</a>
                            </li>

                            <li class="nav-item">
                                <button  className='header-signup'>SIGN IN</button>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>


        </header>
    )
}

export default Header