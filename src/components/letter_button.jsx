"use client";
import { useState, useEffect } from "react";
export default function LetterButton({
  letter,
  handleClick,
  active,
  onChange,
}) {
  function clickHandler(letter) {
    onChange(letter);
    handleClick(letter);
  }

  return (
    <button
      key={letter}
      className={`rounded-sm text-xs py-1 px-2 hover:scale-105 cursor-pointer ${
        active === letter ? "bg-[#646cff]" : "bg-gray-500"
      }`}
      onClick={() => clickHandler(letter)}
    >
      {letter}
    </button>
  );
}
