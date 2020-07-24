import React from 'react';
import './App.css';
import Planner from './plan/Planner'
import Header from './shared/Header'
import Footer from './shared/Footer'

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Header />  
        <Planner />
        <Footer />  
      </div>
    </div>
  );
}

export default App;
