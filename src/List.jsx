import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ bud, index, onDelete }) => {
  console.log(onDelete)
  return (
    <div className="single-item">
      <input type="checkbox" />
      <p style={{ textTransform: "capitalize" }}>{bud}</p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => onDelete(index)}
      >
        delete
      </button>
    </div>
  );
};

export default List;
