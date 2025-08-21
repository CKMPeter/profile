import React, { useEffect, useRef, useState } from "react";
import { NavBar } from "./Items/navBar";
import { HorizontalTimeline } from "./Items/timelineItem";
import { VerticalSlider } from "./Items/verticalSlider";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Timeline data
const timelineData = [
  { label: "Nguyen Thi Minh Khai", icon: "⏳", color: "#9b59b6" },
  { label: "Planning", icon: "📝", color: "#f1c40f" },
  { label: "Development", icon: "💻", color: "#1abc9c" },
  { label: "Launch", icon: "📈", color: "#3498db" },
];

const images = [
  {
    src: `${process.env.PUBLIC_URL}/projects/StoAstProject.jpg`,
    label: "Sto&Ast",
    link: "https://sto-ast-render-frontend.onrender.com",
    ghlink: "https://github.com/CKMPeter/Sto_Ast",
    description: "A project that helps you to manage your file with an AI Assistance.",
    tech: "React Js, Express Js, Firebase",
  },
  {
    src: `${process.env.PUBLIC_URL}/projects/SideProject.jpg`,
    label: "OurArchive",
    link: "https://ourarchive.onrender.com",
    ghlink: "https://github.com/CKMPeter/SpecialThings_Web",
    description: "A that i created for my one and only.",
    tech: "HTML, CSS",
  },
  {
    src: `${process.env.PUBLIC_URL}/projects/Portfolio.jpg`,
    label: "Portfolio",
    link: "https://my-profile.onrender.com",
    ghlink: "",
    description: "A portfolio that i created to showcase my work.",
    tech: "React Js, Bootstrap",
  },
];

const sampleData = [
  { title: "Hobbies", description: "Somgthing i do in my spear time.", src: "" },
  {
    title: "Judo",
    description: "A Sport that i have done for 6 years, and still compete till this day.",
    src: `${process.env.PUBLIC_URL}/hobbies/Judo.jpg`,
  },
  {
    title: "Cheerleading",
    description: "A Sport i took interested in recently.",
    src: `${process.env.PUBLIC_URL}/hobbies/Cheerleading.jpg`,
  },
];

// Style objects
const styles = {
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  welcomePage: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
  },
  leftSection: {
    flex: 2,
    backgroundColor: "transparent",
    borderRadius: "8px",
    padding: "60px 0px 60px 60px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflow: "hidden",
    color: "white",
  },
  upperleft: {
    flex: 2,
    backgroundColor: "#f5f0ea",
    borderRadius: "8px",
    padding: "10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  lowerleft: {
    flex: 1,
    backgroundColor: "#c7ceea",
    borderRadius: "8px",
    padding: "10px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: "8px",
    padding: "60px",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  rightContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#b5ead7",
    borderRadius: "8px",
    textAlign: "center",
  },
  imgScroll: {
    width: "100%",
    height: "75%",
    objectFit: "contain",
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollBehavior: "smooth",
    gap: "10px",
    padding: "0 10px",
    justifyContent: "flex-start",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    scrollSnapAlign: "center",
    flexShrink: 0,
    borderRadius: "8px",
  },
  description: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "1.2em",
    justifyContent: "left",
  },
  upperLeftContent: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    transition: "transform 0.8s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: "20vw",
    fontWeight: "bold",
    background: "url('/asset/background.jpg')", // 🔁 same image for text clip
    fontFamily: "'Dancing Script', cursive",
    backgroundSize: "cover",
    backgroundPosition: "center",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    margin: "0",
  },
  descriptionContainer: {
    minHeight: "100%",
    padding: "20px",
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  upperLeftHightlight: {
    textAlign: "left",
    padding: 0,
    margin: 0,
    listStyleType: "none",
  },
  upperLeftdescription: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontFamily: "'Playfair Display', serif",
    color: "#333",
    fontSize: "2em",
    justifyContent: "left",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  lowerleftTitle: {
    fontFamily: "'Playfair Display', serif",
    color: "#333",
    fontWeight: "bold",
  },
};

export const MainPage = () => {
  const imgScrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(false);

  useEffect(() => {
    const scrollContainer = imgScrollRef.current;
    if (!scrollContainer) return;

    const children = scrollContainer.children;
    let index = 0;

    const scrollStep = () => {
      if (children.length === 0) return;

      index = (index + 1) % children.length;

      const child = children[index];
      if (child) {
        child.scrollIntoView({ behavior: "smooth", inline: "center" });
        setCurrentIndex(index);
      }
    };

    if (hoveredStep) return;

    const scrollInterval = setInterval(scrollStep, 3000);
    return () => clearInterval(scrollInterval);
  }, [hoveredStep]);

  useEffect(() => {
    const scrollContainer = imgScrollRef.current;
    if (!scrollContainer) return;

    const children = scrollContainer.children;

    const observerOptions = {
      root: scrollContainer,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(children).indexOf(entry.target);
          setCurrentIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Array.from(children).forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={styles.root}>
      <NavBar />
      <div style={styles.welcomePage}>
        <div style={styles.leftSection}>
          <div
            style={styles.upperleft}
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
          >
            <div style={{ ...styles.upperLeftContent, position: "relative", overflow: "hidden" }}>
              <h1
                style={{
                  ...styles.mainText,
                  transform: showDescription ? "translateY(-100%)" : "translateY(0%)",
                  opacity: showDescription ? 0 : 1,
                  transition: "transform 0.8s ease, opacity 0.5s ease",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Hello.
              </h1>
              <div
                style={{
                  ...styles.descriptionContainer,
                  opacity: showDescription ? 1 : 0,
                  transform: showDescription ? "translateY(0%)" : "translateY(100%)",
                  transition: "opacity 0.5s ease, transform 0.8s ease",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#f5f0ea",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ul style={styles.upperLeftHightlight}>
                  <li style={styles.upperLeftdescription}>I am a student at UTE.</li>
                  <li style={styles.upperLeftdescription}>Major in web designing.</li>
                </ul>
                <div style={{ width: "95%" }}>
                  <p style={styles.description}>
                    I specialize in creating websites that are both visually appealing and easy to use.
                    My passion lies in crafting clean designs that communicate clearly and leave a lasting impression.
                    Every project I build is guided by a balance of creativity and functionality to ensure meaningful digital experiences.
                  </p>
                </div>
                <Button variant="outline-dark" size="lg" style={{ marginRight: "5px" }}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div style={styles.lowerleft}>
            <VerticalSlider items={sampleData} />
          </div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.rightContainer}>
            <img
              src={`${process.env.PUBLIC_URL}/asset/ava.jpg`}
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
          <div style={styles.rightContainer}>
            <div className="img-scroll" style={styles.imgScroll} ref={imgScrollRef}>
              {images.map((img, idx) => (
                <a
                  href={img.link}
                  style={{ ...styles.imgStyle, position: "relative", overflow: "hidden" }}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredStep(true)}
                  onMouseLeave={() => setHoveredStep(false)}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      transition: "opacity 0.5s ease",
                      opacity: hoveredStep ? 0 : 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      opacity: hoveredStep ? 1 : 0,
                      transition: "opacity 0.5s ease",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <h3 style={{ ...styles.lowerleftTitle, marginBottom: "10px" }}>
                      {img.label} {img.tech ? `(${img.tech})` : ""}
                    </h3>
                    <p style={styles.description}>
                      {img.description || "No description available."}
                    </p>
                    <Button variant="outline-dark" size="lg" style={{ marginRight: "5px", width: "50%" }}>
                      <Link
                        to={img.ghlink}
                        target="_blank"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Visit Project
                      </Link>
                    </Button>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
              {images.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: i === currentIndex ? "#000" : "#aaa",
                    transition: "background-color 0.3s ease",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
