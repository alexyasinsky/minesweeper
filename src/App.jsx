import { useState } from 'react'
import './App.css';
import MyHeader from './components/MyHeader/MyHeader';
import MineField from './components/MineField/MineField';


function App() {
  
  const size = 40;

  return (
    <div className="App">
      <MyHeader/>
      <MineField size={size}/>
    </div>
  )
}

export default App
