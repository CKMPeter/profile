import React, { useState, useEffect, useRef } from 'react';
import { NavBar } from './Items/navBar';

const Data = [
  { 
    name: "Sto&Ast", 
    description: "File storage application aim to help with picture & text analysis and location using AI.",
    tech: "React, Node.js, GeminiAI, ChatGPTAPI",
    src: `${process.env.PUBLIC_URL}/asset/database.png`,
    preview: `${process.env.PUBLIC_URL}/project/StoAstProject.jpg`,
    titleColor: "#cab69e", 
    bgColor: "#a5b4fc" // pastel indigo (cloud / database)
  },
  { 
    name: "Asset Management",
    tech: "React, Node.js, Express.JS",
    description: "Assets Management, application that help with management assets for retail to sales.",
    src: `${process.env.PUBLIC_URL}/asset/asset-management.png`,
    titleColor: "#98bad5",
    bgColor: "#fbcfe8" // pastel pink (finance / management docs)
  },
  { 
    name: "Pacman Clone",
    tech: "Python, tkinter",
    description: "Pacman clone with path finding algorithm.",
    src: `${process.env.PUBLIC_URL}/asset/game.png`,
    titleColor: "#b8d8be",
    bgColor: "#fde68a" // pastel yellow (Pacman theme)
  },
  {
    name: "Portfolio",
    tech: "React, Node.js, Express.JS",
    description: "This portfolio, a showcase of my skills and projects.",
    src: `${process.env.PUBLIC_URL}/asset/portfolio.png`,
    titleColor: "#f0e68c",
    bgColor: "#cbd5e1" // pastel gray-blue (neutral, modern)
  },
  {
    name: "JudoRmit",
    tech: "React, Node.js, Firebase",
    description: "Work in progress, a Judo application for RMIT Judo Club.",
    src: `${process.env.PUBLIC_URL}/about/judo.png`,
    titleColor: "#cab69e",
    bgColor: "#fecaca" // pastel red (martial arts energy, softer)
  },
]


const styles = {
  root: {
    maxHeight: "100vh",
    overflow: "hidden",
  },
  mainPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bolder",
    textAlign: "center",
    fontFamily: "'playfair display', serif",
    margin: "20px 0",
    color: "#343a40",
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "50px",
    overflow: "hidden",   // ✅ keep flip inside
    perspective: "1000px", // ✅ 3D depth
  },
  card: {
    flex: "0 0 25%",   // ✅ smaller width for more spacing
    maxWidth: "25%",
    height: "60vh",   // ✅ shorter card
    margin: "10px",
    boxSizing: "border-box",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s ease",
  },
  inner: (flipped) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  }),
  front: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#e9ecef",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: "20px",
    backfaceVisibility: "hidden",
    backgroundColor: "#343a40",
    color: "white",
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    borderRadius: "8px",
  },
  itemTitle: {
    fontFamily: "playfair, display, serif",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  },
  pageButton: (active) => ({
    padding: "8px 16px",
    borderRadius: "5px",
    border: "1px solid #343a40",
    backgroundColor: active ? "#343a40" : "white",
    color: active ? "white" : "#343a40",
    cursor: "pointer",
    fontWeight: active ? "bold" : "normal",
  }),
};

export function Portfolio() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const containerRef = useRef(null);
  const [lastRowIndexes, setLastRowIndexes] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // show 4 cards per page

  const totalPages = Math.ceil(Data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Data.slice(startIndex, startIndex + itemsPerPage);

  const handleFlip = (index) => setFlippedIndex(index);
  const handleUnflip = () => setFlippedIndex(null);

  // ✅ Detect last row items after render
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children);
    if (items.length === 0) return;

    const rows = {};
    items.forEach((item, index) => {
      const top = item.offsetTop;
      if (!rows[top]) rows[top] = [];
      rows[top].push(index);
    });

    const rowTops = Object.keys(rows).map(Number).sort((a, b) => a - b);
    const lastRowTop = rowTops[rowTops.length - 1];
    const lastIndexes = rows[lastRowTop];
    setLastRowIndexes(lastIndexes);
  }, []);

  return (
    <div style={styles.root}>
      <NavBar />
      <div style={styles.mainPage}>
        <h1 style={styles.title}>Portfolio</h1>
        <div style={styles.container} ref={containerRef}>
          {currentItems.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                marginBottom: lastRowIndexes.includes(index) ? "40px" : "10px",
              }}
              onMouseEnter={() => handleFlip(index)}
              onMouseLeave={handleUnflip}
            >
              <div style={styles.inner(flippedIndex === index)}>
                <div style={{
                  ...styles.front,
                  backgroundColor: item.bgColor || "#e9ecef",
                  backgroundSize: "40% 40%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    style={{
                      width: "45  %",
                      height: "45%",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                </div>
                <div style={styles.back}>
                  <h2 style={styles.itemTitle}>{item.name}</h2>
                  <p>{item.description || "No description available."}</p>
                  <p style={{ fontStyle: "italic", color: "#adb5bd" }}>{item.tech}</p>
                  <image src={item.preview}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* ✅ Pagination controls */}
          <div style={styles.pagination}>
            <button 
              style={styles.pageButton(false)} 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                style={styles.pageButton(currentPage === i + 1)}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button 
              style={styles.pageButton(false)} 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
      </div>
    </div>
  );
}
