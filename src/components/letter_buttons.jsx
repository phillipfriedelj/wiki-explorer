export default function LetterButtons({ handleClick }) {
  function generateLetterButtons() {
    const letters = [];
    for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(97 + i));
    }

    return letters.map((letter) => (
      <button
        key={letter}
        className="rounded-sm bg-gray-500 text-xs py-1 px-2 hover:scale-105 cursor-pointer"
        onClick={() => handleClick(letter)}
      >
        {letter}
      </button>
    ));
  }

  return (
    <div className="flex space-x-2 overflow-x-auto py-2">
      {generateLetterButtons()}
    </div>
  );
}
