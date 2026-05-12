import { useState, useEffect } from "react";

import "./styles/MorseCodeTranslator.css";

import Symbol from "./components/Symbol";
import { toMorse } from "./utils/morsecode";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [morseOutput, setMorseOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inputText.trim() === "") {
      setMorseOutput("");
    } else {
      setMorseOutput(toMorse(inputText));
    }
  }, [inputText]);

  const handleCopy = () => {
    if (morseOutput) {
      navigator.clipboard.writeText(morseOutput);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleClear = () => {
    setInputText("");
    setMorseOutput("");
  };

  return (
    <div className="container">

      <div className="header">
        <h1 className="title">Morse Code Translator</h1>
        <p className="subtitle">
          · · · &nbsp; — — — &nbsp; · · ·
        </p>
      </div>

      <div className="card">

        <div className="input-section">
          <label className="label">English Text</label>

          <textarea
            className="text-input"
            placeholder="Type something here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
          />

          <div className="actions">
            <span className="char-count">
              {inputText.length} characters
            </span>

            <button
              className="btn-clear"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="output-section">

          <div className="output-header">

            <label
              className="label"
              style={{ marginBottom: 0 }}
            >
              Morse Code
            </label>

            <button
              className={`btn-copy ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>

          </div>

          <div className="output-box">

            {morseOutput === "" ? (
              <span className="placeholder-text">
                Your Morse code will appear here...
              </span>
            ) : (
              morseOutput.split(" / ").map((word, wi) => (
                <span
                  key={wi}
                  style={{
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >

                  {word.split(" ").map((letter, li) => (
                    <span
                      key={li}
                      style={{
                        display: "inline-flex",
                        marginRight: "6px"
                      }}
                    >
                      {letter.split("").map((char, ci) => (
                        <Symbol
                          key={ci}
                          char={char}
                          index={wi * 100 + li * 10 + ci}
                        />
                      ))}
                    </span>
                  ))}

                  {wi < morseOutput.split(" / ").length - 1 && (
                    <span className="word-separator">/</span>
                  )}

                </span>
              ))
            )}

          </div>
        </div>
      </div>

      <div className="legend">

        <span className="legend-item">
          <span className="legend-symbol">·</span>
          dot = short signal
        </span>

        <span className="legend-item">
          <span className="legend-symbol">—</span>
          dash = long signal
        </span>

        <span className="legend-item">
          <span className="legend-sep">/</span>
          slash = word space
        </span>

      </div>
    </div>
  );
}