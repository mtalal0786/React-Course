import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  
  

  return (
    <>
      <h1 className='bg-zinc-700 rounded-md px-4 py-2 mt-2 text-2xl inline-block text-white'
      >React Redux Todo</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App
