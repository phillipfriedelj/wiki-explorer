import { ActionIcon, Button, Text } from "@mantine/core";
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
    <Button
      variant={active === letter ? "filled" : "light"}
      size="compact-xs"
      key={letter}
      color={active === letter ? "blue" : "gray"}
      onClick={() => clickHandler(letter)}
    >
      <Text size="xs">{letter}</Text>
    </Button>
  );
}
