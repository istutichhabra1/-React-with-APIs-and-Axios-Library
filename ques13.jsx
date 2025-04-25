import React, { useState } from 'react';

function DynamicEmailForm() {
  const [emails, setEmails] = useState([{ value: "", error: "" }]); 
  const [emailList, setEmailList] = useState([]); 

  const handleEmailChange = (index, e) => {
    const newEmails = [...emails];
    newEmails[index].value = e.target.value;

  
    if (e.target.value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e.target.value)) {
      newEmails[index].error = "Invalid email address";
    } else {
      newEmails[index].error = "";
    }

    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { value: "", error: "" }]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const validEmails = emails.filter(email => email.error === "" && email.value !== "").map(email => email.value);
    if (validEmails.length > 0) {
      setEmailList(validEmails);
    } else {
      alert("Please enter at least one valid email.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {emails.map((email, index) => (
          <div key={index}>
            <label htmlFor={`email-${index}`}>Email {index + 1}: </label>
            <input
              type="email"
              id={`email-${index}`}
              value={email.value}
              onChange={(e) => handleEmailChange(index, e)}
            />
            {email.error && <p style={{ color: 'red' }}>{email.error}</p>}
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>Add Email</button>
        <button type="submit">Submit</button>
      </form>

      <h3>Entered Emails:</h3>
      <ul>
        {emailList.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicEmailForm;
