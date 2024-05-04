import { ActionIcon } from "@mantine/core";
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
    <ActionIcon
      variant="filled"
      size="sm"
      key={letter}
      color={active === letter ? "violet" : "gray"}
      onClick={() => clickHandler(letter)}
    >
      <span className="text-sm">{letter}</span>
    </ActionIcon>
  );
}
