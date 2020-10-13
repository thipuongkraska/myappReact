import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
  const [enable, setEnable] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [noteEmail, setNoteEmail] = useState("");
  const [notePass, setNotePass] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let arEmail = email.split('');
  function handleChangeEmail(event) {
    console.log("working");
    const value = event.target.value;
    console.log(value);
    setEmail(value);

  };
  function handleChangePassword(event) {
    const value = event.target.value;
    setPass(value);
  };
  function handleBlur() { 
    if (arEmail.includes("@")===false) {
      setNoteEmail("*wrong email address, please type again");
    } 
    console.log(email);
  };
  function handleBlurPass() {
    console.log(pass.length);
    if (pass.length < 6) {
      setNotePass("*password is too short");
    }
  }
  function handleFocus() {
    setNoteEmail("");
  };
  function handleFocusPass() {
    setNotePass("");
  }
  function handleSubmit(event) {
    setUser({
      email: email,
      password: pass,
    });
    event.preventDefault();
    const sendData = async () => {
        try {
                await axios("http://localhost:4000/api/users", {
                method: "POST",
                data: user,
            });
            console.log(user);

        }
        catch(error) {
            console.log(error);
        }
    };
    sendData();

  }
  useEffect(() => {if (arEmail.includes("@")===true && pass.length>=6) {
    setEnable(false);
    }
    else {
    setEnable(true);
  }});
  
  return <div>
  <form onSubmit={handleSubmit}>
    <input type="email" onFocus={handleFocus} onChange={handleChangeEmail} onBlur={handleBlur} value={email} />
    <p>{noteEmail}</p>
    <br/>
    <input type="password" onFocus={handleFocusPass} onBlur={handleBlurPass} onChange={handleChangePassword} />
    <p>{notePass}</p>
    <input type="submit" disabled={enable} value="Submit"/>
  </form>
  </div>
};

export default App;