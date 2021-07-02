import './App.scss';
import ColorCard from './components/ColorCard';
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Simon Says</h1>
        
        <div className="playgroundWrapper">
           <ColorCard color="green" />
           <ColorCard color="red" />
           <ColorCard color="blue" />
           <ColorCard color="yellow" />
        </div>
        <button className="startButton">Start</button>
      </div>
    </div>
  );
}

export default App;
