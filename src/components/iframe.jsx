import useSelectedLinkStore from "@/hooks/selected-link-store";

export default function Iframe() {
  const { selectedLink } = useSelectedLinkStore();
  return (
    <iframe
      src={selectedLink}
      height={"100%"}
      width={"100%"}
      className="rounded-[4px] border transition-all"
    />
  );
}
