import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Projects from './components/Projects';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />}/>
          <Route path="/projects" element={<Projects />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
