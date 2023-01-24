
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Alert from './components/alert/alert';
import setAuthToken from "./redux/auth/auth.utils";
import { loadUser } from "./redux/auth/auth.actions";
import store from './redux/store';
import { Provider } from 'react-redux';

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
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          {/* <Route exact path='/questions' element={<Question />} /> */}
          {/* <Route exact path='/questions/:id' element={<Question />} />
          <Route exact path='/add/question' element={<QuestionForm />} /> */}
          

        </Routes>

      </div>

    </Provider>

  );
}

export default App;
