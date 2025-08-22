import React from "react";
import { Link } from "react-router-dom";

const styles = {
  navBar: {
    height: "6vh",
    backgroundColor: "#f8f9fa",
    padding: "10px 20px",
    fontSize: "1.5rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#343a40",
    textDecoration: "none",
    fontWeight: "bold",
    fontFamily: "'Playfair Display', serif",
    transition: "transform 0.2s ease-in-out",
  },
};

export const NavBar = () => {
  return (
    <nav style={styles.navBar}>
      <div style={styles.container} >
        <Link to="/" style={{ ...styles.link}} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          CAO KHAI MINH
        </Link>
        <div style={styles.links}>
          <Link to="/" style={{ ...styles.link}} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            Home
          </Link>
          <Link to="/about" style={{ ...styles.link}} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            About
          </Link>
          <Link to="/portfolio" style={{ ...styles.link}} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            Portfolio
          </Link>
          <Link to="/contact" style={{ ...styles.link}} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
