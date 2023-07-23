import React, { useState, useEffect, useRef } from "react";
import Lists from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Plese Provide Value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "Item Edited", "success");
    } else {
      setList([...list, { id: new Date().getTime().toString(), title: name }]);
      setName("");
      setAlert({ show: true, msg: "Item Added To The List", type: "success" });
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const removeItem = (id) => {
    const newList = list.filter((item) => {
      return item.id !== id;
    });
    setList(newList);
    showAlert(true, "Item Removed", "danger");
  };

  const editHandler = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setIsEditing(true);
    setEditId(id);
  };

  const clearItems = () => {
    showAlert(true, "You Deleted Items", "danger");
    setList([]);
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
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
                removeItem={removeItem}
                editHandler={editHandler}
                inputRef={inputRef}
              />
            );
          })}
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
