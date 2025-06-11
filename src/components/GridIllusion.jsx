/*@Autor: Ayham Abou Issmaiel*/

// GridIllusion.jsx – erweitert mit Herz-Muster
import React, { useEffect, useState } from "react";
import "./GridIllusion.css";

const flowerPattern = [
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
];

const heartPattern = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const GridIllusion = ({ config }) => {
  const {
    shape,
    fillColor,
    speed,
    gridSize,
    motion,
    darkMode,
    hoverEffect,
    intensity,
  } = config;
  const [frame, setFrame] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  const getStyle = (x, y) => {
    const centerX = gridSize / 2 - 0.5;
    const centerY = gridSize / 2 - 0.5;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const flowerWidth = 5;
    const flowerHeight = 5;
    const flowerOffsetX = Math.floor((gridSize - flowerWidth) / 2);
    const flowerOffsetY = Math.floor((gridSize - flowerHeight) / 2);

    const heartWidth = 7;
    const heartHeight = 6;
    const offsetX = Math.floor((gridSize - heartWidth) / 2);
    const offsetY = Math.floor((gridSize - heartHeight) / 2);

    let transform = "";

    let flowerCell = 0;
    if (
      x >= flowerOffsetX &&
      x < flowerOffsetX + flowerWidth &&
      y >= flowerOffsetY &&
      y < flowerOffsetY + flowerHeight
    ) {
      flowerCell = flowerPattern[y - flowerOffsetY]?.[x - flowerOffsetX] || 0;
    }

    let heartCell = 0;
    if (
      x >= offsetX &&
      x < offsetX + heartWidth &&
      y >= offsetY &&
      y < offsetY + heartHeight
    ) {
      heartCell = heartPattern[y - offsetY]?.[x - offsetX] || 0;
    }

    if (motion === "scale" || motion === "both") {
      const s = 1 + 0.1 * intensity * Math.sin(frame * 0.1 - distance);
      transform += ` scale(${s})`;
    }

    if (motion === "rotate" || motion === "both") {
      const r = 5 * intensity * Math.sin(frame * 0.05 + distance);
      transform += ` rotate(${r}deg)`;
    }

    if (motion === "vertical") {
      const yOffset = 5 * intensity * Math.sin(frame * 0.1 + distance);
      transform += ` translateY(${yOffset}px)`;
    }

    if (motion === "pattern-flower" && flowerCell === 1) {
      const s = 1 + 0.3 * Math.sin(frame * 0.2 + x + y);
      transform += ` scale(${s})`;
    }

    if (motion === "pattern-heart" && heartCell === 1) {
      const s = 1 + 0.4 * Math.sin(frame * 0.15 + x + y);
      transform += ` scale(${s})`;
    }

    const baseStyle = {
      transform: transform.trim(),
      transition:
        "transform 0.2s ease, background-color 0.3s ease, filter 0.3s ease",
      width: "40px",
      height: "40px",
      backgroundColor:
        motion === "pattern-heart"
          ? heartCell === 1
            ? "red"
            : fillColor
          : motion === "pattern-flower"
          ? flowerCell === 1
            ? "orange"
            : fillColor
          : fillColor,
      margin: "4px",
      cursor: "pointer",
    };

    if (motion === "pulse") {
      const brightness = 0.8 + 0.2 * Math.sin(frame * 0.2 + distance);
      baseStyle.filter = `brightness(${brightness})`;
    }

    if (shape === "circle") {
      baseStyle.borderRadius = "50%";
    } else if (shape === "triangle") {
      if (shape === "triangle") {
        // Farbe basierend auf Herz/Blume bestimmen
        const triangleColor =
          motion === "pattern-heart" && heartCell === 1
            ? "red"
            : motion === "pattern-flower" && flowerCell === 1
            ? "orange"
            : fillColor;

        let triangleStyle = {
          width: 0,
          height: 0,
          margin: "4px",
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderBottom: `40px solid ${triangleColor}`,
          transform: transform.trim(),
          transition: "transform 0.2s ease",
          cursor: "pointer",
        };

        // Licht-Puls Effekt auch auf Dreieck anwenden
        if (motion === "pulse") {
          const brightness = 0.8 + 0.2 * Math.sin(frame * 0.2 + distance);
          triangleStyle.filter = `brightness(${brightness})`;
        }

        return triangleStyle;
      }
    }

    return baseStyle;
  };

  return (
    <div className="grid-outer" style={{ background: darkMode ? "#111" : "white" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 48px)`,
          gridAutoRows: `48px`,
          gap: "4px",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setMousePos({ x: -9999, y: -9999 })}
      >
        {Array.from({ length: gridSize * gridSize }, (_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);

          const centerX = x * 48 + 24;
          const centerY = y * 48 + 24;
          const dx = centerX - mousePos.x;
          const dy = centerY - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const isHovered = hoverEffect && dist < 80;
          const base = getStyle(x, y);
          const style = {
            ...base,
            transform: `${base.transform} ${
              isHovered ? "scale(1.3)" : ""
            }`.trim(),
            zIndex: isHovered ? 1 : 0,
          };

          return <div key={i} style={style} className="grid-tile" />;
        })}
      </div>
    </div>
  );
};

export default GridIllusion;
