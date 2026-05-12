import Symbol from "./Symbol";

function MorseWord({ morseWord, wordIndex }) {
  return (
    <span className="morse-word">
      {morseWord.split("").map((char, i) => (
        <Symbol key={i} char={char} index={wordIndex * 10 + i} />
      ))}
    </span>
  );
}

export default MorseWord;
