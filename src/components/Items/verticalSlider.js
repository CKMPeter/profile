import React, { useEffect, useRef, useState } from "react";

const styles = {
  container: {
    height: "100%",
    minHeight: "10vh",
    width: "100%",
    overflowY: "auto",
    overflow: "hidden",
    scrollSnapType: "y mandatory",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  item: {
    scrollSnapAlign: "center",
    background: "transparent",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    color: "#333",
    minHeight: "100%",
    height: "100%",
  },
  itemTitle: {
    fontSize: "3em",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: "1.2em",
    marginBottom: "20px",
  },
};

// ✅ Additional CSS for hiding scrollbar in Chrome & Safari
const hideScrollbarStyle = `
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const VerticalSlider = ({ items }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // pause scrolling when hovered

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  // Scroll to current item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[currentIndex];
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentIndex]);

  return (
    <>
      <style>{hideScrollbarStyle}</style>
      <div
        ref={containerRef}
        style={styles.container}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {items.map((item, index) => (
          <div key={index} style={styles.item}>
            {index === 0 ? (
              <>
                <h1 style={styles.itemTitle}>
                  {item.title}
                </h1>
                <p style={{ fontSize: "1.5em", fontFamily: "'Playfair Display', serif", marginBottom: "20px" }}>
                  {item.description || "\u00A0"}
                </p>
              </>
            ) : index % 2 === 0 ? (
              <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                {item.src && (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      flex: 1,
                      width: "50px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <div style={{ flex: 2, textAlign: "left", paddingLeft: "20px" }}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemDescription}>{item.description || "\u00A0"}</p>
                </div>
              </div>
            ) : (
              <div style={{ width: "100%", display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
                {item.src && (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      flex: 1,
                      width: "50px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <div style={{ flex: 2, textAlign: "right", paddingRight: "20px" }}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemDescription}>{item.description || "\u00A0"}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
