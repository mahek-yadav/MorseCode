function Symbol({ char, index }) {
  const isDot = char === ".";
  const isDash = char === "-";
  const isSlash = char === "/";

  return (
    <span
      className={`symbol ${
        isDot ? "dot" : isDash ? "dash" : isSlash ? "slash" : "other"
      }`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {char}
    </span>
  );
}

export default Symbol;