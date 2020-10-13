import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
      async function fetchData() {
        try {
          console.log("testing");
        const {data} = await axios("http://localhost:4000/api/users", {
          method: "GET"});
          console.log(data.users);
          setUser(data.users);
          
    } catch (error) {
      console.log(error);
    }};
    fetchData();
  }, [])
  return user.map(e => <div><h1>{e.name}</h1>
  <p>{e.age}</p></div>);
};

export default App;