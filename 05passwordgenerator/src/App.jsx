import { useState, useEffect, useRef, useCallback } from "react";
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordInputRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-+[]{}~`";

    for (let i = 0; i < length; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(password);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copypasstoclipboard = useCallback(() => {
    passwordInputRef.current.select()
    // passwordInputRef.current.setSelectionRange(0,20) fixed selection
    
    window.navigator.clipboard.writeText(password);
  },[password] )
  useEffect(() => {
    passwordGenerator();
    }, [passwordGenerator]);//use this call back or bellow all variable methods.
    // }, [length,numAllowed,charAllowed,setPassword]);
    const handleLengthChange = (e) => {
      setLength(e.target.value);
      };
      


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600">
        <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordInputRef}
          />
          <button 
          onClick={copypasstoclipboard}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={40}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
             />
             <label>Length{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() =>{
                setNumAllowed((prev)=> !prev)
              }}
              />
              <label className="ml-1" htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() =>{
                setCharAllowed((prev)=> !prev)
              }}
              />
              <label className="ml-1" htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
