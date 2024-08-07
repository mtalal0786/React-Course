

// how to inject variables in jsx
function App() {
const username = "Chai our React | MT"

  return (
    <>
   <h1>Chai aur React | With Talal</h1>
   <h1>username</h1>
   {/* comment: accessing variable in jsx using {}. and this is known as evaluated Expression we can not perform js on it. */}
    <h1>{username}</h1>
   </>
  );
}

export default App
//always use First word Capital of function name and it only return one component so should enclose in empty angle brackets.and also check to the imports files of jsx in html and main.  
