
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from "./redux/auth/auth.actions";
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import PostForm from './pages/PostForm/PostForm';
// import Home from './pages/Home/Home';
import Alert from './components/alert/alert';
import setAuthToken from "./redux/auth/auth.utils";

// import QuestionForm from './pages/questionForm/QuestionForm';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    
      <div>
      <Header />
      <Alert />
        <Routes>
          {/* <Route exact path='/' element={<Home />} /> */}

          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />

          <Route exact path='/questions' element={<QuestionsPage />} />
          <Route exact path='/add/question' element={<PostForm />} />



          {/* <Route exact path='/questions' element={<QuestionForm />} /> */}
          {/* <Route exact path='/questions/:id' element={<Question />} />
          <Route exact path='/add/question' element={<QuestionForm />} /> */}
          

        </Routes>

      </div>

    </Provider>

  );
}

export default App;
