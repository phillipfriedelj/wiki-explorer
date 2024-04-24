import LetterButton from "./letter_button";
import { useState } from "react";

export default function LetterButtons({ handleClick }) {
  const [buttonState, setButtonState] = useState("a");
  var letters = generateLetters();

  function activeButton(value) {
    setButtonState(value);
  }

  function generateLetters() {
    const letters = [];
    for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(97 + i));
    }

    return letters;
  }

  function generateButtons() {
    return letters.map((letter) => (
      <LetterButton
        key={letter}
        letter={letter}
        handleClick={handleClick}
        active={buttonState}
        onChange={activeButton}
      />
    ));
  }

  return (
    <div className="flex space-x-2 py-2 shrink-0">{generateButtons()}</div>
  );
}
