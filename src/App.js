import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import Main from './components/MainComponents';
import history from './components/history';
function App() {
  return (
    <Router history={history} basename='/'>
        <div className="App">
            <Main />
        </div>
    </Router>
);
}

export default App;
