import LetterButton from "./letter_button";
import { useState } from "react";
import { Group } from "@mantine/core";

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
    <Group justify="space-between" gap="5" wrap="nowrap">
      {generateButtons()}
    </Group>
  );
}
