"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div className="bg-background font-sans">
      <div className="w-96 h-full border-2 border-white relative">
        <div className="radial-blur-background"></div>
        <div className="radial-blur-background-2"></div>
      </div>
    </div>
  );
}
