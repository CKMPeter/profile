import React, { useEffect, useState } from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: "40px 20px",
    backgroundColor: "transparent",
    borderRadius: "10px",
    gap: "0px",
    width: "100%",
  },
  stepWrapper: (visible) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0px)" : "translateX(-50px)",
    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
  }),
  arrow: (color) => ({
    width: "100%",
    height: "20px",
    backgroundColor: color,
    clipPath: "polygon(10% 10%, 95% 10%, 100% 50%, 95% 100%, 10% 100%, 15% 50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
    zIndex: 1,
  }),
  connector: (isEven) => ({
    position: "absolute",
    width: "2px",
    height: "20px",
    backgroundColor: "gray",
    bottom: isEven ? "100%" : "auto",
    top: isEven ? "auto" : "100%",
  }),
  circle: (color, isEven, hovered) => ({
    position: "absolute",
    width: hovered ? "100px" : "50px",
    height: hovered ? "60px" : "50px",
    backgroundColor: color,
    borderRadius: hovered ? "0%" : "50%", // transform on hover
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    bottom: isEven ? "calc(100% + 20px)" : "auto",
    top: isEven ? "auto" : "calc(100% + 20px)",
    transition: "border-radius 0.3s ease-in-out",
  }),
};

export const HorizontalTimeline = ({ steps }) => {
  const [visibleSteps, setVisibleSteps] = useState(
    Array(steps.length).fill(false)
  );

  const [hoveredStep, setHoveredStep] = useState(null);

  // On mount, trigger staggered fade-in from left to right
  useEffect(() => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * 200);
    });
  }, [steps]);

  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        const visible = visibleSteps[index];
        const hovered = hoveredStep === index;
        return (
          <div
            key={index}
            style={styles.stepWrapper(visible)}
          >
            {/* Arrow */}
            <div style={styles.arrow(step.color)}>{}</div>

            {/* Connector */}
            <div style={styles.connector(isEven)}></div>

            {/* Circle with icon */}
            <div
              style={styles.circle(step.color, isEven, hovered)}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
