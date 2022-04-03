import React from 'react';
import { SignIn } from './pages/signIn/SignIn';
import { SignUp } from './pages/signUp/SignUp';
import { FormHome } from './pages/formHome/FormHome';
import { FormCreate } from './pages/formCreate/FormCreate';
import { ViewForm } from './pages/viewForm/ViewForm';
import { cookie, validateUser } from './apiCall';
import { AUTHENTICATE } from './actions/ActionType';
import { useEffect } from 'react';
import { Context } from './Context';
import { useState } from 'react';
import { useReducer } from 'react';
import { Reducer } from './reducer/Reducer';
import { BrowserRouter, Route, Routes, Redirect, useNavigate, useSearchParams } from 'react-router-dom';
import './App.css';

function App() {
  const [initialState, setInitialState] = useState({
    signInUpEnabled: false,
    signInUpAction: 'LOGIN',
    searchEnabled: false,
    isAuthenticated: false
  });

  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    validateAuth();
  }, [])

  const validateAuth = () => {
    validateUser().then(res => {
      if (res.data && res.data.status) {
        cookie.set('Authorization', res.data.authToken);
        cookie.set('name', res.data.name);
        dispatch({
          type: AUTHENTICATE,
          payload: {
            isAuthenticated: true
          }
        })
      }
      else {
        cookie.remove('Authorization');
        // window.location.replace(`/signin?auth=false`)
      }
    })
  }

  return (
    <Context.Provider value={{state, dispatch}} >
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} ></Route>
        <Route path='/signup' element={<SignUp />} ></Route>
        <Route path='/forms/create/template/:templateName' element={<FormCreate/>}></Route>
        <Route path='/forms/create' element={<FormCreate/>}></Route>
        <Route path='/forms/edit/:formId' element={<FormCreate/>}></Route>
        <Route path='/forms' element={<FormHome />} ></Route>
        <Route path='/forms/fill/:formId/:action' element={<ViewForm />} ></Route>
      </Routes>
    </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
