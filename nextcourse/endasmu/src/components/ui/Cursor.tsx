"use client";
import { useState, useEffect } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div>
      {/* Cursor Container */}
      <div
        className=" z-50 fixed w-10 h-10 border-2 border-white rounded-full pointer-events-none transition-transform duration-75"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: `translate(-10%, -10%)`,
        }}
      />
      {/* Dot in the Middle */}
      <div
        className="z-50 fixed w-2 h-2 bg-white rounded-full pointer-events-none"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};

export default Cursor;
