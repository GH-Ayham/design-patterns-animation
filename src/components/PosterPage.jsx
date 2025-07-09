import React from "react";
import './PosterPage.css';
import GridIllusion from "./GridIllusion";
import { useNavigate } from "react-router-dom";

const PosterPage = ({
  shape,
  fillColor,
  speed,
  gridSize,
  motion,
  intensity,
  darkMode
}) => {
  const navigate = useNavigate();

  return (
    <div className={`poster-page ${darkMode ? 'dark' : 'light'}`}>
      {/* POSTER-RAHMEN */}
      <div
        style={{
          width: "800px",
          height: "1100px",
          backgroundColor: darkMode ? "#222" : "#fff",
          border: darkMode ? "8px solid #444" : "10px solid #222",
          boxShadow: darkMode
            ? "0 0 40px rgba(255,255,255,0.07)"
            : "0 20px 50px rgba(0,0,0,0.3)",
          padding: "60px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          transition: "all 0.3s ease"
        }}
      >
        {/* HEADLINE */}
        <h1
          style={{
            fontSize: "1.6rem",
            fontFamily: "serif",
            fontWeight: "600",
            letterSpacing: "0.4px",
            margin: 0,
            color: darkMode ? "#f0f0f0" : "#111"
          }}
        >
          Make Patterns. Make Magic. Make Art.
        </h1>

        {/* PASSEPARTOUT – Bildbereich */}
        <div
          style={{
            flexGrow: 1,
            margin: "30px 0",
            backgroundColor: darkMode ? "#111" : "#f8f8f8",
            padding: "30px",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
            border: "1px solid #999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <GridIllusion
            config={{
              shape,
              fillColor,
              speed,
              gridSize: 13,
              motion,
              intensity,
              darkMode,
              hoverEffect: false
            }}
          />
        </div>

        {/* SCRIPT-SIGNATUR */}
        <div style={{ width: "100%", textAlign: "right" }}>
          <p
            style={{
              fontSize: "1.1rem",
              color: darkMode ? "#bbb" : "#555",
              fontFamily: "'Pacifico', cursive",
              margin: 0
            }}
          >
            — Ayham, 2025
          </p>
        </div>
      </div>

      {/* ZURÜCK-BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          padding: "10px 15px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        🔙 Zurück zur Bearbeitung
      </button>
    </div>
  );
};

export default PosterPage;
