import React, { useEffect, useState } from "react";


// create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  
  const [todos, setTodos] = useState([]);

  const [mounted, setMounted] = useState(false);

  function getToDosFromAPI(){
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mlinhho', {
      method: "GET",
      headers:{
        "Content-Type":"application/json"
      },
    })
    .then(response => {
        console.log(response.ok); // will be true if the response is successfull
        console.log(response.status); // the status code = 200 or code = 400 etc.
        if (response.ok!=true) throw new Error ("response is not ok", response.status);
        return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(toDosFromAPI => {
        //here is were your code should start after the fetch finishes
        setTodos(toDosFromAPI);
        console.log(toDosFromAPI); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    })
    .finally(() => {
      setMounted(true)
    })
    ;
  }
  
  function updateToDosOnAPI() {
    if (todos.length == 0) return deleteUserToDosOnAPI();
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mlinhho', {
      method: "PUT",
      body: JSON.stringify([
        ...todos
      ]),
      headers:{
        "Content-Type":"application/json"
      },
    })
    .then(response => {
      console.log(response.ok); // will be true if the response is successfull
      console.log(response.status); // the status code = 200 or code = 400 etc.
      if (response.ok!=true) throw new Error ("response is not ok", response.status);
       // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .catch(error => {
      //error handling
      console.log(error);
      getToDosFromAPI();
    })
  }
  
  function deleteUserToDosOnAPI() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mlinhho', {
      method: "DELETE",
      headers:{
        "Content-Type":"application/json"
      },
    })
    .then(response => {
      console.log(response.ok); // will be true if the response is successfull
      console.log(response.status); // the status code = 200 or code = 400 etc.
      if (response.ok!=true) throw new Error ("response is not ok", response.status);
      return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(toDosFromAPI => {
      //here is were your code should start after the fetch finishes
     
      console.log(toDosFromAPI); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
  }
  
  useEffect(() => {
    getToDosFromAPI()
  },[]);

  useEffect(() => {
    if (!mounted) return
    updateToDosOnAPI()
    console.log(todos)
  },[todos,mounted]);


  return (
    <div className="container">
      <h1>To Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat({
                  "label":inputValue,
                  "done":false,
                }));
                setInputValue("");
              }
            }}
            placeholder="Add items here..."
          ></input>
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}{" "}
            <i
              className="fas fa-trash-alt"
              onClick={() =>
                setTodos(
                  todos.filter((t, currentIndex) => index != currentIndex)
                )
              }
            ></i>
          </li>
          
        ))}
      </ul>
      <div>{todos.length} Tasks</div>
    </div>
  );
};

export default Home;
