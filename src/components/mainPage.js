import React, { useEffect, useRef, useState } from "react";
import { NavBar } from "./Items/navBar";
import { VerticalSlider } from "./Items/verticalSlider";
import { Button } from "react-bootstrap";
import "./css/MainPage.css"; // ✅ new css file

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
    src: `${process.env.PUBLIC_URL}/projects/portfolio.png`,
    label: "Portfolio",
    link: "https://ckmpeter.github.io/profile",
    ghlink: "https://github.com/CKMPeter/profile",
    description: "A portfolio that i created to showcase my work.",
    tech: "React Js, Bootstrap",
  },
];

const sampleData = [
  { title: "Hobbies", description: "Something I do in my spare time.", src: "" },
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="root">
      <NavBar />
      <div className="welcomePage">
        {/* LEFT SECTION */}
        <div className="leftSection">
          <div
            className="upperleft"
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
          >
            <div className="upperLeftContent">
              <h1
                className="mainText"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/asset/background.jpg)`,
                  transform: showDescription ? "translateY(-100%)" : "translateY(0%)",
                  opacity: showDescription ? 0 : 1,
                }}
              >
                Hello.
              </h1>
              <div
                className="descriptionContainer"
                style={{
                  opacity: showDescription ? 1 : 0,
                  transform: showDescription ? "translateY(0%)" : "translateY(100%)",
                }}
              >
                <ul className="upperLeftHighlight">
                  <li className="upperLeftDescription">I am a student at UTE.</li>
                  <li className="upperLeftDescription">Major in web designing.</li>
                </ul>
                <div>
                  <p className="description">
                    I specialize in creating websites that are both visually appealing and easy to
                    use. My passion lies in crafting clean designs that communicate clearly and leave
                    a lasting impression.
                  </p>
                </div>
                <Button variant="outline-dark" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="lowerleft">
            <VerticalSlider items={sampleData} />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="rightSection">
          <div className="rightContainer">
            <img
              src={`${process.env.PUBLIC_URL}/asset/ava.jpg`}
              alt="Avatar"
              className="avatarImg"
            />
          </div>

          <div className="rightContainer">
            <div className="imgScroll" ref={imgScrollRef}>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="imgWrapper"
                  onMouseEnter={() => setHoveredStep(true)}
                  onMouseLeave={() => setHoveredStep(false)}
                >
                  <a href={img.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={img.src}
                      alt={img.label}
                      className={`imgItem ${hoveredStep ? "hidden" : ""}`}
                    />
                  </a>

                  <div className={`overlay ${hoveredStep ? "visible" : ""}`}>
                    <h3 className="overlayTitle">
                      {img.label} {img.tech ? `(${img.tech})` : ""}
                    </h3>
                    <p className="description">{img.description}</p>

                    <div className="overlayButtons">
                      <Button
                        as="a"
                        href={img.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline-dark"
                        size="lg"
                      >
                        Live Demo
                      </Button>

                      {img.ghlink && (
                        <Button
                          as="a"
                          href={img.ghlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline-dark"
                          size="lg"
                        >
                          GitHub
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="dots">
              {images.map((_, i) => (
                <span key={i} className={`dot ${i === currentIndex ? "active" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
