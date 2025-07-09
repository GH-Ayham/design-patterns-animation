/*@Autor: Ayham Abou Issmaiel*/

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GridIllusion from "./components/GridIllusion";
import ControlPanel from "./components/ControlPanel";
import PosterPage from "./components/PosterPage";

function App() {
  const [shape, setShape] = useState("square");
  const [fillColor, setFillColor] = useState("#0f9c9c");
  const [speed, setSpeed] = useState(30);
  const [gridSize, setGridSize] = useState(8);
  const [motion, setMotion] = useState("both");
  const [preset, setPreset] = useState("custom");
  const [darkMode, setDarkMode] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(true);
  const [intensity] = useState(1);

  const applyPreset = (presetName) => {
    setPreset(presetName);

    switch (presetName) {
      case "chaos":
        setShape("triangle");
        setFillColor("#ff0055");
        setSpeed(10);
        setGridSize(16);
        setMotion("both");
        break;
      case "wave":
        setShape("circle");
        setFillColor("#0077ff");
        setSpeed(40);
        setGridSize(10);
        setMotion("scale");
        break;
      case "focus":
        setShape("square");
        setFillColor("#222222");
        setSpeed(80);
        setGridSize(8);
        setMotion("rotate");
        break;
      default:
        break;
    }
  };

  const applyRandomPattern = () => {
    const shapes = ["square", "circle", "triangle"];
    const motions = [
      "scale",
      "rotate",
      "both",
      "none",
      "vertical",
      "pulse",
      "pattern-flower",
      "pattern-heart",
    ];

    setPreset("custom"); // Benutzerdefiniert wird gesetzt
    setShape(shapes[Math.floor(Math.random() * shapes.length)]);
    setFillColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    setSpeed(Math.floor(Math.random() * 20) + 10);
    setGridSize(Math.floor(Math.random() * 12) + 4);
    setMotion(motions[Math.floor(Math.random() * motions.length)]);
  };

  const config = {
    shape,
    fillColor,
    speed,
    gridSize,
    motion,
    darkMode,
    hoverEffect,
    intensity,
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Hauptseite: Dein bestehendes Layout */}
        <Route
          path="/"
          element={
            <div className="square-container">
              <div className="panel-area">
                <ControlPanel
                  shape={shape}
                  setShape={setShape}
                  fillColor={fillColor}
                  setFillColor={setFillColor}
                  speed={speed}
                  setSpeed={setSpeed}
                  gridSize={gridSize}
                  setGridSize={setGridSize}
                  motion={motion}
                  setMotion={setMotion}
                  hoverEffect={hoverEffect}
                  setHoverEffect={setHoverEffect}
                  intensity={intensity}
                  preset={preset}
                  setPreset={setPreset}
                  applyPreset={applyPreset}
                  applyRandomPattern={applyRandomPattern}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  config={config}
                />
              </div>
              <div className="grid-area">
                <GridIllusion
                  shape={shape}
                  setShape={setShape}
                  fillColor={fillColor}
                  setFillColor={setFillColor}
                  speed={speed}
                  setSpeed={setSpeed}
                  gridSize={gridSize}
                  setGridSize={setGridSize}
                  motion={motion}
                  setMotion={setMotion}
                  hoverEffect={hoverEffect}
                  setHoverEffect={setHoverEffect}
                  intensity={intensity}
                  preset={preset}
                  setPreset={setPreset}
                  applyPreset={applyPreset}
                  applyRandomPattern={applyRandomPattern}
                  config={config}
                />
              </div>
            </div>
          }
        />

        {/* Neue Seite: Digital Poster */}
        <Route
          path="/poster"
          element={
            <PosterPage
              shape={shape}
              fillColor={fillColor}
              speed={speed}
              gridSize={gridSize}
              motion={motion}
              intensity={intensity}
              darkMode={darkMode}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
