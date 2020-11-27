import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

var getTodos = async () => {

  var req = await axios.get("http://localhost:3131")
  return req.data
}


function App() {
  const [inputValue, setInputValue] = useState(null)
  const [data, setdata] = useState([])
  useEffect(async () => {
    var d = await getTodos()
    setdata(d)
  }, []);
  var addTodo = async (name) => {
    console.log(name)
    await axios.post("http://localhost:3131", { "name": name.nativeEvent.data, "completed": false })
    var d = await getTodos()
    setdata(d)
  }

  var deleteTodo = async (id) => {

    var req = await axios.delete("http://localhost:3131/" + id)
    var d = await getTodos()
    setdata(d)

  }
  var changeStatus = async (id, completed) => {

    var req = await axios.patch("http://localhost:3131/" + id, { "completed": !completed })
    var d = await getTodos()
    setdata(d)
  }
  console.log(data);
  return (
    <div className="App">
      <center style={{ marginTop: "150px" }}>
        <div className="todo-item">
          <label htmlFor="">New Todo</label>
          <br />
          <input type="text" onChange={(v) => setInputValue(v)} />
          <br />
          <br />
          <button onClick={() => addTodo(inputValue)}>Add Todo</button>
          <br />
          <br />
        </div>
        {
          data.map((el) => (

            <div className="todo-item" key={el.id}>
              <h3>{el.name}</h3>
              <h6>{el.completed === false ? "Not completed" : "completed"}</h6>
              <button onClick={() => deleteTodo(el.id)}>Delete Todo</button>
              <button onClick={() => changeStatus(el.id, el.completed)}>Change Status</button>
            </div>
          ))
        }
      </center>
    </div>
  );
}

export default App;
