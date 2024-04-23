import React from "react";

export default function Input({ placeholder, name, handleInput }) {
  return (
    <div>
      <input
        name={name}
        onChange={handleInput}
        style={{
          color: "red",
          fontSize: "20px",
          width: "200px",
          borderColor: "blue",
          borderRadius: "10px",
          padding: "0.5rem",
          margin: "0.8rem",
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
