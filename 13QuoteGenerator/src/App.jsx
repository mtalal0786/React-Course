import React from 'react'
import QuoteGenerator from './components/QuoteGenerator'
import './App.css';
function App() {
  return (
    < div className='outer'>
      <div className='App'>
        <h1 className='app-title'>Quote Generator</h1>
        <QuoteGenerator />
      </div>
    </div>
  )
}

export default App
