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
  },
};

export const NavBar = () => {
  return (
    <nav style={styles.navBar}>
      <div style={styles.container}>
        <Link to="/" style={{ ...styles.link}}>
          CAO KHAI MINH
        </Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/about" style={styles.link}>
            About
          </Link>
          <Link to="/contact" style={styles.link}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
