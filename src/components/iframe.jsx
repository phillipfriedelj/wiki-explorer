export default function Iframe({ selectedLink }) {
  return (
    <iframe
      src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
      height={"100%"}
      width={"100%"}
    />
    // <div className="flex-1">
    // </div>
  );
}
