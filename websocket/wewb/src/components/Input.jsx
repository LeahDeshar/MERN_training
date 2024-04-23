import React from "react";

export default function Input({ placeholder, name, handleInput }) {
  return (
    <div>
      <input
        name={name}
        onChange={handleInput}
        className="border-2 border-blue-500 rounded-lg p-2 m-2"
        placeholder={placeholder}
      />
    </div>
  );
}
