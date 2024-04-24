"use client";
import { useState, useEffect } from "react";
export default function LetterButton({
  letter,
  handleClick,
  buttonState,
  setButtonState,
}) {
  const [bgColor, setBgColor] = useState("bg-gray-500");

  useEffect(() => {
    console.log("BS UPD:: ", buttonState);
    if (buttonState[letter]) {
      setBgColor("text-[#646cff]");
    } else {
      setBgColor("bg-gray-500");
    }
  }, [buttonState, letter]);

  function handleButtonState(clickedLetter) {
    const updatedButtonState = {
      ...buttonState,
      [clickedLetter]: !buttonState[clickedLetter],
    };
    setButtonState(updatedButtonState);
  }

  return (
    <button
      key={letter}
      className={`rounded-sm text-xs py-1 px-2 hover:scale-105 cursor-pointer ${bgColor}`}
      onClick={() => {
        handleButtonState(letter);
        handleClick(letter);
      }}
    >
      {letter}
    </button>
  );
}
