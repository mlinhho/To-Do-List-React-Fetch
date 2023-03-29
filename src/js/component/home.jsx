import React, { useState } from "react";

//create your first component
const Home = () => {
  function _handleKeyDown(e) {
    if (e.key === "Enter") {
      setTodos(toDos.concat([inputValue]));
      setInputValue("");
    }
  }
  const [inputValue, setInputValue] = useState("");
  const [toDos, setTodos] = useState([]);
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="text-center">
      <h1 className="text-center">TODOS</h1>
      <div className="notePad">
        <ul className="w-100">
          <li>
            <input
              type="text"
              id="addToDo"
              placeholder="Add task"
              onKeyDown={_handleKeyDown}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </li>

          {toDos.map((item, index) => (
            <li
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
              className="w-100 d-flex"
            >
              <p className="w-auto">{item}</p>
              {isShown === true ? (
                <i className="fa-solid fa-xmark ms-auto"></i>
                ) : (
                ""
              )}
            </li>
          ))}
        </ul>

        <div> {toDos.length} item left</div>
      </div>
    </div>
  );
};

export default Home;
