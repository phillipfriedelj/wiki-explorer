export default function Iframe({ selectedLink }) {
  return (
    <div className="w-1/2 flex-1">
      <iframe
        src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}
