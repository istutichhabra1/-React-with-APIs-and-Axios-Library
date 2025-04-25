import React, { useState } from 'react';

function UsernameForm() {
  const [username, setUsername] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (username.trim() === "") {
      setError("Username is required");
    } else {
      setError(""); 
      alert(`Submitted username: ${username}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} {}
      <button type="submit">Submit</button>
    </form>
  );
}

export default UsernameForm;
