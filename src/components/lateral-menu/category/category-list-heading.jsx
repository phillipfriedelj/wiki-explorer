import LetterSelect from "../letter_select";
import ListHeading from "@/layout/list-heading";

export default function CategoryListHeading() {
  return (
    <ListHeading title={"Categories"}>
      <LetterSelect />
    </ListHeading>
  );
}
