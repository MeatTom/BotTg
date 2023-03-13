import './App.css';
import React from 'react';
import {useEffect} from "react";
import Header from "./components/Header/header";
import {useTelegram} from "./hooks/telegram";
import Products from "./components/Products/Products";


function App() {
    const {onToggleButton, telegram} = useTelegram()

    useEffect(() => {
        telegram.ready()
    },[telegram])

  return (
    <div className="App">
        <Header/>
        <Products/>
        <button onClick={onToggleButton}>Показать главную кнопку</button>
    </div>
  );
}

export default App;
