import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  async function getJoke() {
    // console.log("call goes here");
    axios.get(`${process.env.BASE_URL}/api/jokes`)
    .then(res => {
      console.log(res.data);
      setJokes(res.data);
    })
    .catch(err =>{
      console.error(err);
    })
  }

  return (
    <>
      <p>Home page</p>
      <p>Jokes Count: {jokes.length}</p>
      <button onClick={getJoke}>Get Joke</button>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>
            <h4>{joke.title}</h4>
            <p>{joke.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
