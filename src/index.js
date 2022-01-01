import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/admin' element={<div>admin</div>} />
            <Route path='/add-server' element={<div>add-server</div>} />
            <Route path='/ping' element={<div>ping</div>} />
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
