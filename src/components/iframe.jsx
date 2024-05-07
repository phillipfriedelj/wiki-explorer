export default function Iframe({ selectedLink }) {
  return (
    <iframe
      src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
      height={"100%"}
      width={"100%"}
      className="rounded-[4px] border transition-all"
    />
  );
}
