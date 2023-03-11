import './App.css';
import React from 'react';
import {useEffect} from "react";
import Header from "./components/header/header";
import {useTelegram} from "./hooks/telegram";


function App() {
    const {onToggleButton, telegram} = useTelegram()

    useEffect(() => {
        telegram.ready()
    },[telegram])

  return (
    <div className="App">
        <Header/>
        сайт работает!!!
        <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
