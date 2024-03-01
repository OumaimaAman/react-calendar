import React from 'react';
import './App.css';
import CalendarMonth from './components/CalendarMonth';


function App() {
  return (
    <div className="App">
      <CalendarMonth currentDate={new Date()}  />
    </div>
  );
}

export default App;
