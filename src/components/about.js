import React, { useState, useEffect, useRef } from 'react';
import { NavBar } from './Items/navBar';

const Data = [
  { name: "Judo", 
    description: "A martial art i took up since 2018, and have been competing in it since.",
    src: `${process.env.PUBLIC_URL}/about/judo.png`,
    titleColor: "#cab69e", 
  },
  { name: "Programming",
    description: "The Major that i am studying at Uni, and have worked on various projects.",
    src: `${process.env.PUBLIC_URL}/about/programming.png`,
    titleColor: "#98bad5",
  },
  { name: "Cheerleading",
    description: "A sport i took up in 2020, and have been competing in it since.",
    src: `${process.env.PUBLIC_URL}/about/cheerleader.png`,
    titleColor: "#b8d8be",
   },
];

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
    height: "60vh",   // ✅ shorter card to prevent clipping
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
    fontSize: "2.5rem",  // ✅ slightly smaller title so text fits better
    fontWeight: "bold",
  },
};

export function About() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const containerRef = useRef(null);
  const [lastRowIndexes, setLastRowIndexes] = useState([]);

  const handleFlip = (index) => {
    setFlippedIndex(index);
  };

  const handleUnflip = () => {
    setFlippedIndex(null);
  };

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
  }, [Data]);

  return (
    <div style={styles.root}>
      <NavBar />
      <div style={styles.mainPage}>
        <h1 style={styles.title}>About Me</h1>
        <div style={styles.container} ref={containerRef}>
          {Data.map((item, index) => (
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
                  backgroundColor: item.titleColor || "#e9ecef",
                  backgroundSize: "40% 40%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    style={{
                      width: "50%",
                      height: "45%",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                </div>
                <div style={styles.back}>
                  <h2 style={styles.itemTitle}>{item.name}</h2>
                  <p>{item.description || "No description available."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
