export default function PageLayout({ subtitle, children }) {
  return (
    <div className="flex flex-col flex-grow h-full max-h-screen">
      <div>
        <h1>Wiki Explorer</h1>
        <h2 className="text-md">{subtitle}</h2>
      </div>
      {children}
    </div>
  );
}
