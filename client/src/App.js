
import { Routes, Route } from 'react-router-dom';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';
import { loadUser } from "./redux/auth/auth.actions";
import setAuthToken from "./redux/auth/auth.utils";
import { useEffect } from 'react';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';

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
        <Routes>

          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />

        </Routes>

      </div>

    </Provider>

  );
}

export default App;
