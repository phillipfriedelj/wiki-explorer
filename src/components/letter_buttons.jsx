"use client";

import LetterButton from "./letter_button";
import { useState, useEffect } from "react";

export default function LetterButtons({ handleClick }) {
  const [buttonState, setButtonState] = useState(generateButtonState());
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    generateLetterButtons();
  }, []);

  useEffect(() => {
    console.log("BS UPDATED: ", buttonState);
  }, [buttonState]);

  function generateButtonState() {
    const buttonStateObj = {};
    for (let i = 0; i < 26; i++) {
      buttonStateObj[String.fromCharCode(97 + i)] = false;
    }
    return buttonStateObj;
  }

  function generateLetterButtons() {
    const letters = [];
    for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(97 + i));
    }

    setButtons(
      letters.map((letter) => (
        <LetterButton
          letter={letter}
          handleClick={handleClick}
          buttonState={buttonState}
          setButtonState={setButtonState}
        />
      ))
    );
  }

  return (
    <div className="flex space-x-2 overflow-x-auto py-2 shrink-0">
      {buttons}
    </div>
  );
}
