import './App.css';
import React from 'react';
import {useEffect} from "react";
import Header from "./components/header/header";
const telegram = window.Telegram.WebApp;
function App() {

    useEffect(() => {
        telegram.ready()
    },[])

  return (
    <div className="App">
        сайт работает!!!
        <Header/>
    </div>
  );
}

export default App;
