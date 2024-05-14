import LetterSelect from "../letter_select";
import ListHeading from "@/layout/list-heading";

export default function CategoryListHeading({
  selectedLetter,
  setSelectedLetter,
  setCollapsed,
}) {
  return (
    <ListHeading title={"Categories"} onClose={setCollapsed}>
      {/* <ActionIcon
        variant="filled"
        aria-label="pages filter"
        onClick={() => setDisplayedMenu("search")}
      >
        <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon> */}
      <LetterSelect
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
      />
    </ListHeading>
  );
}
