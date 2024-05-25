import LetterSelect from "../letter_select";
import ListHeading from "@/layout/list-heading";

export default function CategoryListHeading({ setCollapsed }) {
  return (
    <ListHeading title={"Categories"} onClose={setCollapsed}>
      <LetterSelect />
    </ListHeading>
  );
}
