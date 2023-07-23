import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [value, setValue] = useState("");
  const [buds, setBuds] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    setBuds([...buds,value])
  };
  return (
    <section className="section-center">
      <form onSubmit={onSubmit}>
        <h4>Grocery Bud</h4>
        <div className="form-control">
          <input type="text " className="form-input" value={value} onChange={(e)=>setValue(e.target.value)}/>
          <button type="submit" className="btn">
            add item
          </button>
        </div>
      </form>
      <div className="items">
        {buds.map((bud, index) => {
          return <List key={index} bud={bud} />;
        })}
      </div>
    </section>
  );
}

export default App;
