/*@Autor: Ayham Abou Issmaiel*/

import React from "react";
import { useNavigate } from "react-router-dom";


const ControlPanel = ({
  shape,
  setShape,
  fillColor,
  setFillColor,
  speed,
  setSpeed,
  gridSize,
  setGridSize,
  motion,
  setMotion,
  preset,
  setPreset,
  applyPreset,
  applyRandomPattern,
  darkMode,
  setDarkMode,
  hoverEffect,
  setHoverEffect,
  intensity,
  setIntensity,
}) => {

  const navigate = useNavigate(); // ✅ Richtige Position

  return (
    <div className={`control-panel ${darkMode ? "dark" : ""}`}>
      <h2>🛠️ Spiel Menu</h2>

      <label>Preset wählen:</label>
      <select value={preset} onChange={(e) => applyPreset(e.target.value)}>
        <option value="custom">🎛️ Benutzerdefiniert</option>
        <option value="chaos">🔀 Chaos</option>
        <option value="wave">🌊 Welle</option>
        <option value="focus">🎯 Fokus</option>
      </select>

      <br />
      <br />

      <label>Form:</label>
      <select value={shape} onChange={(e) => setShape(e.target.value)}>
        <option value="square">Quadrat</option>
        <option value="circle">Kreis</option>
        <option value="triangle">Dreieck</option>
      </select>

      <br />
      <br />

      <label>Farbe:</label>
      <input
        type="color"
        value={fillColor}
        onChange={(e) => setFillColor(e.target.value)}
      />

      <br />
      <br />

      <label>
        Rastergröße: {gridSize}x{gridSize}
      </label>
      <input
        type="range"
        min="4"
        max="20"
        value={gridSize}
        onChange={(e) => setGridSize(Number(e.target.value))}
      />

      <br />
      <br />

      <label>Bewegung:</label>
      <select value={motion} onChange={(e) => setMotion(e.target.value)}>
        <option value="none">Keine</option>
        <option value="scale">Nur Skalierung</option>
        <option value="rotate">Nur Rotation</option>
        <option value="both">Rotation + Skalierung</option>
        <option value="vertical">Vertikal wackeln</option>
        <option value="pulse">Licht-Puls</option>
        <option value="pattern-flower">🌸 Blume</option>
        <option value="pattern-heart">❤️ Herz</option>
      </select>

      <br />
      <br />

      <label>Geschwindigkeit: {speed} ms</label>
      <input
        type="range"
        min="1"
        max="25"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />

      <hr style={{ margin: "20px 0" }} />
      <button className="random-btn" onClick={applyRandomPattern}>
        🎲 Zufälliges Pattern
      </button>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            fontWeight: "bold",
          }}
        >
          🌗 Dark Mode
          <div
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: "50px",
              height: "26px",
              borderRadius: "13px",
              backgroundColor: darkMode ? "#222" : "#ccc",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: darkMode ? "#fff" : "#000",
                position: "absolute",
                top: "2px",
                left: darkMode ? "26px" : "2px",
                transition: "left 0.3s ease, background-color 0.3s ease",
              }}
            />
          </div>
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold",
          }}
        >
          🖱️ Hover-Effekt
          <div
            onClick={() => setHoverEffect(!hoverEffect)}
            style={{
              width: "50px",
              height: "26px",
              borderRadius: "13px",
              backgroundColor: hoverEffect ? "#4caf50" : "#ccc",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                position: "absolute",
                top: "2px",
                left: hoverEffect ? "26px" : "2px",
                transition: "left 0.3s ease",
              }}
            />
          </div>
        </label>
      </div>

      {/* ✅ Neuer Button im gleichen Stil */}
      <button className="random-btn" onClick={() => navigate("/poster")}>
        🖼️ Digital Poster anzeigen
      </button>

      <div className="author-signature">
        Autor: <strong>Ayham Abou Issmaiel</strong>
      </div>

      <br />
      <br />
    </div>
  );
};

export default ControlPanel;
