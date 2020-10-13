import React, { useState } from "react";
import axios from "axios";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userEmail: ""
  });
  function handleChange(event) {
    const {value, name} = event.target;
    setUser(pre => {
      if (name === "fName") {
        return {
          firstName: value,
          lastName: pre.lastName,
          userEmail: pre.userEmail
        }} else if (name==="lName") {
          return {
            firstName: pre.firstName,
            lastName: value,
            userEmail: pre.userEmail
          }
        } else if (name==="email") {
          return {
            firstName: pre.firstName,
            lastName: pre.lastName,
            userEmail: value
          }
        }
      
    });
  }
  function handleSubmit(event) {
    setContact({
      fName: user.firstName,
      lName: user.lastName,
      email: user.userEmail
    });
    event.preventDefault();
    const sendData = async () => {
        try {
                await axios("http://localhost:4000/api/users", {
                method: "POST",
                data: contact
            });
            console.log(contact);

        }
        catch(error) {
            console.log(error);
        }
    };
    sendData();

  }
  return (
    <div className="container">
      <h1>
        Hello 
      </h1>
      
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="fName" placeholder="First Name" />
        <input onChange={handleChange} name="lName" placeholder="Last Name" />
        <input onChange={handleChange} name="email" placeholder="Email" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
