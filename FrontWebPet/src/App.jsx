import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Nav from '../src/components/Nav'



import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Outlet/>
    </div>
  );
}

export default App;
