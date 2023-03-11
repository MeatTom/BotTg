import './App.css';
import {useEffect} from "react";
const telegram = window.Telegram.WebApp;
function App() {

    useEffect(() => {
        telegram.ready()
    },[])

    const onClose = () => {
        telegram.Close()
    }

  return (
    <div className="App">
        работает
        <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
