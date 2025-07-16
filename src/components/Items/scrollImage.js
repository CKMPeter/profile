import React, { useEffect, useRef, useState } from "react";

export const ScrollImageViewerWithDots = () => {
  const images = [
    { src: "/logo192.png", label: "Step 1" },
    { src: "/logo192.png", label: "Step 2" },
    { src: "/logo192.png", label: "Step 3" },
    { src: "/logo192.png", label: "Step 4" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 } // 60% of image must be visible to trigger
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleDotClick = index => {
    refs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Side navigation dots */}
      <div
        style={{
          position: "fixed",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: index === activeIndex ? "#3498db" : "#ccc",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Active label on top right */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: "8px 14px",
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        {images[activeIndex]?.label}
      </div>

      {/* Scrollable image sections */}
      {images.map((img, index) => (
        <div
          key={index}
          data-index={index}
          ref={el => (refs.current[index] = el)}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <img
            src={img.src}
            alt={img.label}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ScrollImageViewerWithDots;
