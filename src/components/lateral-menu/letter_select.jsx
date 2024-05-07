import { Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export default function LetterSelect({ selectedLetter, setSelectedLetter }) {
  function generateLetters() {
    const letters = [];
    for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(97 + i));
    }

    return letters;
  }

  return (
    <Select
      size="xs"
      placeholder="Pick value"
      data={generateLetters()}
      value={selectedLetter}
      onChange={setSelectedLetter}
      checkIconPosition="right"
      w={"55px"}
      comboboxProps={{
        transitionProps: { transition: "fade-down", duration: 100 },
      }}
      rightSection={<IconChevronDown stroke={"1.5"}></IconChevronDown>}
    />
  );
}
