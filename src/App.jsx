import React, { useState, useEffect, useRef } from "react";
import Lists from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
    } else if (name && isEditing) {
      const newEditedList = [...list];
      newEditedList[editIndex].title = name;
      setList(newEditedList);
      setName("");
      setIsEditing(false);
    } else {
      setList([...list, { id: new Date().getTime().toString(), title: name }]);
      setName("");
    }
  };
  const onDelete = (id) => {
    const newList = list.filter((item) => {
      return item.id != id;
    });
    setList(newList);
  };

  const editHandler = (editIndex) => {
    console.log(editIndex);
    setIsEditing(true);
    setEditIndex(editIndex);
    setName(list[editIndex].title);
    handleSubmit();
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        <h4>Grocery Bud</h4>
        <div className="form-control">
          <input
            autoFocus
            ref={inputRef}
            type="text "
            className="form-input"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn">
            {isEditing ? "edit" : "add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="items">
          {list.map((item, index) => {
            return (
              <Lists
                index={index}
                key={index}
                {...item}
                onDelete={onDelete}
                editHandler={editHandler}
                inputRef={inputRef}
              />
            );
          })}
          <button className="clear-btn">Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
