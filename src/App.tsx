import './App.css';
import Board from './ui/board/sudokuBoard';
import React from "react";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Board />
        </header>
      </div>
  )
}

export default App;
