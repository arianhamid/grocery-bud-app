import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ title, id, onDelete, inputRef, editHandler, index }) => {
  return (
    <div className="single-item">
      <input type="checkbox" />
      <p style={{ textTransform: "capitalize" }}>{title}</p>
      <button
        className="edit-btn"
        type="button"
        onClick={() => {
          inputRef.current.focus();
          editHandler(index);
        }}
      >
        <FaEdit />
      </button>
      <button className="delete-btn" type="button" onClick={() => onDelete(id)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default List;
