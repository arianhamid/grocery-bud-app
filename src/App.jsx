import React, { useState, useEffect, useRef } from "react";
import Lists from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setList([...list, name]);
    setName("");
  };
  const onDelete = (delIndex) => {
    const newList = list.filter((item, index) => {
      console.log(index);
      console.log(delIndex);
      return index != delIndex;
    });
    setList(newList);
  };

  const editHandler = (editIndex) => {
    setIsEditing(true);
    setEditIndex(editIndex);
    setName(list[editIndex]);
  };
  const saveEdit = () => {
    const newEditedList = [...list];
    newEditedList[editIndex] = name;
    setList(newEditedList);
    setName("");
    setIsEditing(false);
  };

  return (
    <section className="section-center">
      <form onSubmit={onSubmit}>
        <h4>Grocery Bud</h4>
        {isEditing ? (
          <div className="form-control">
            <input
              autoFocus
              ref={inputRef}
              type="text "
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="button"
              className="btn"
              onClick={() => {
                saveEdit();
              }}
            >
              save
            </button>
          </div>
        ) : (
          <div className="form-control">
            <input
              autoFocus
              ref={inputRef}
              type="text "
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="btn"
              onClick={() => inputRef.current.focus()}
            >
              add item
            </button>
          </div>
        )}
      </form>
      <div className="items">
        {list.map((bud, index) => {
          return (
            <Lists
              key={index}
              bud={bud}
              onDelete={onDelete}
              index={index}
              editHandler={editHandler}
              inputRef={inputRef}
            />
          );
        })}
      </div>
    </section>
  );
}

export default App;
