import { useState } from "react";
import "./App.css";
import Modal from "./modal/Modal";
import { PubSub } from "./PubSubPattern";
async function apiRequestLikes() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("There was a problem with the fetch operation:", err);
  }
}
const pubSub = new PubSub();
apiRequestLikes().then((value) => value.length);
console.log();
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Modal apiProps={apiRequestLikes} pubSubProps={pubSub} />
    </div>
  );
}

export default App;
