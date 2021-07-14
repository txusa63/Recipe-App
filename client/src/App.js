import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthContextProvider} from './context/AuthContext'
import Router from './Router';
import axios from 'axios';

axios.defaults.withCredentials = false;


function App() {
  return (
    <AuthContextProvider>
      <Router />
  </AuthContextProvider>
  );
}

export default App;
