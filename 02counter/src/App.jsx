import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter,setCounter] = useState(15)
  
  // let counter  = 15 in this way variable not work in react so use useState hook to define variable that has two variables one in which initial value store and second is functionn used to update its value in UI whan needed. like setCounter is now used.
  let addValue = ()=>{
    setCounter(counter + 1)
    setCounter(counter + 1)
    setCounter(counter + 1)
    setCounter(counter + 1)

    //this will only add 1 in counter as all the instructions are same so react take all this as badge and the hole badge merge as it has same instruction so it only give resut of increment of one . but if we really want to add or remove values mulpipe time calling the function so we have to do this by callback function.eg.of removing value. 

    if(counter>=20){
      setCounter(20)
    }
  }
  let removeValue = ()=>{
    setCounter(prevCounter=> prevCounter - 1 )
    setCounter(prevCounter=> prevCounter - 1 )
    setCounter(prevCounter=> prevCounter - 1 )
    setCounter(prevCounter=> prevCounter - 1 )
    //here prevCounter is call back function that takes updatedvalue of counter and then in new instruction value is updated and hence it result in multiple removing of value.as it it call 4 time it remove 4 values.
    if(counter<=0){
      setCounter(0)
    }
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter is {counter}</h2>
      
      <button onClick={addValue}>Add Number</button>
      <br />
      <button onClick={removeValue}>Remove Number</button>
    </>
  )
}

export default App

//one more concept is props . we can create new new components in new files with all jsx and css and html and then import it as an html tag to render in main.jsx .it helps s to reuse these components and we also apply custom changes of that component as needed. like when in html tag given to render we add the changes we want and additions it it .we also createobject in the function and then just call/reference them and this wi implemented on that component changes. 