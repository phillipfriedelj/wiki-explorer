import { Modal, Button, Text } from "@mantine/core";
import { useState } from "react";
export default function IntroModal() {
  const [open, setOpen] = useState(
    localStorage.getItem("introModalShown") === "false" ||
      localStorage.getItem("introModalShown") === null
  );

  function onModalClosed() {
    localStorage.setItem("introModalShown", "true");
    setOpen(false);
  }

  return (
    <Modal
      title="Welcome to Wiki-Explorer"
      centered
      opened={open}
      onClose={onModalClosed}
      className="z-30"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flex flex-col space-y-4">
        <Text size="lg">What is this?</Text>
        <Text size="sm">
          The aim of this ongoing project is to allow you to explore and
          visualize wikipedia in a more structured way. In this website you can
          see all the categories of the english wikipedia as of may of 2024.
          Under each category you will find the corresponding pages, if it
          contains any, as some categories only contain other subcategories,
          templates, talks, etc., which are not in the scope of this proyect as
          of now.
        </Text>
        <Button onClick={onModalClosed} className="self-center">
          Let's get to it!
        </Button>
      </div>
    </Modal>
  );
}
