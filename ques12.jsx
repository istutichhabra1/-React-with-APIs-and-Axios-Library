import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const enteredText = inputRef.current.value; 
    alert(`Submitted text: ${enteredText}`); 

    inputRef.current.value = ""; 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="textInput">Enter Text: </label>
        <input
          type="text"
          id="textInput"
          ref={inputRef} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
