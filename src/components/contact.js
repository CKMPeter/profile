  import React from 'react'
  import { NavBar } from './Items/navBar'
  import { Form, Card, Button } from 'react-bootstrap';
  import { useState, useRef, useEffect } from 'react';
  import { FaFacebook, FaInstagram, FaLinkedin, FaDownload, FaGithub, FaMailBulk } from "react-icons/fa";

  const styles = {
    root:{
      maxHeight: "100vh",
      overflow: "hidden",
    },
    title: {
      fontSize: "4rem",
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "'Playfair Display', serif",
      margin: "20px 0",
    },
    title1: {
      fontSize: "2rem",
      fontWeight: "bold",
      fontFamily: "'Playfair Display', serif",
      marginBottom: "5px",
      marginTop: "5px",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: "80vh",
    },
    viaEmail: {
      width: "80%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      borderColor: "#dee2e6",
      borderWidth: "1px",
    },
    viaSocial: {
      width: "20%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
    },
    contactForm: {
      width: "80%",
      height: "80%",
      display: "flex",
      padding: "20px",
      borderColor: "none",
    },
    text: {
      fontSize: "1.2rem",
      marginBottom: "2px",
    },
    box: {
      width: "100%",
      padding: "5px",
      marginBottom: "10px",
    },
  };



  export function Contact() {
    const EmailContainerRef = useRef();
    const SocialContainerRef = useRef();
    const [selectedCard, setSelectedCard] = useState("email");
   
    // 👉 for cycling social icons
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [showContent, setShowContent] = useState("email"); // track when to show inside

    console.log("Selected Card:", showContent);

    useEffect(() => {
      if (selectedCard === "email") {
        const interval = setInterval(() => {
          setCurrentIconIndex(prev => (prev + 1) % 4); // 4 icons
        }, 2000); // every 2s
        return () => clearInterval(interval);
      }
    }, [selectedCard]);

    useEffect(() => {
      let timer;
      if (selectedCard) {
        // wait until expand (0.5s)
        timer = setTimeout(() => setShowContent(selectedCard), 200);
      }
      return () => clearTimeout(timer);
    }, [selectedCard]);

    const EmailRedirect = () => {
      window.location.href = "mailto:caokhaiminh7903@gmail.com?subject=Hello&body=Hi%20there,";
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=caokhaiminh7903@gmail.com&su=Hello&body=Hi%20there,", "_blank");
    }

    return (
      <div style={styles.root}>
        <NavBar />
        <div>
          <h1 style={styles.title}>How to reach me?
          </h1>
          <div style={styles.container} >

            <div style={{...styles.viaEmail,
              width: selectedCard === "email" ? "90%" : "50%",
              transition: "width 0.5s ease-in-out",
            }} onMouseEnter={() => setSelectedCard("email")} ref={EmailContainerRef}>
              {
                <Card style={{...styles.contactForm,
                  width: selectedCard === "email" ? "80%" : "40%",
                  transition: "width 0.5s ease-in-out",
                  borde: "1px solid white",
                }}>
                    <Card.Body style={{
                      display: selectedCard === "email" ? "flex" : "none",
                      flexDirection: "column",                  
                      opacity: showContent === "email" ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      width: "100%",
                      padding: "5px",
                      }}>
                      
                      <Card.Title style={styles.title1}>Email Me</Card.Title>
                      <Card.Text>
                        You can reach me at my email address: 
                      <p onClick={EmailRedirect} style={{ color: "blue", cursor: "pointer" }}>caokhaiminh7903@gmail.com</p>
                      <hr style={{ margin: "20px 0" }} />
                      <p style={styles.title1}>Or fill out the form below:</p>
                      <Form style={styles.Form} onSubmit={(e) => e.preventDefault()}>
                          <Form.Group controlId="formBasicEmail" >
                            <p style={styles.text}>Email:</p>
                            <Form.Control style={styles.box} type="email" placeholder="Enter your email" />
                          </Form.Group>
                          <Form.Group controlId="formBasicMessage">
                            <p style={styles.text}>Message:</p>
                            <Form.Control style={styles.box} as="textarea" rows={3} placeholder="Your message" />
                          </Form.Group>
                          <Form.Group controlId="formBasicSubmit">
                            <Button variant="dark" type="submit" style={{ marginTop: "5px", width: "100%" }} onClick={EmailRedirect}>
                                Send Message
                            </Button>
                          </Form.Group>
                      </Form>
                      </Card.Text>
                    </Card.Body>

                    {/* Collapsed Email Card: just email icon */}
                    <Card.Body style={{
                      display: selectedCard === "email" ? "none" : "flex",
                      opacity: showContent === "email" ? 0 : 1,
                      transition: "opacity 0.5s ease-in-out",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      height: "100%",
                    }}>
                      <FaMailBulk style={{
                        fontSize: "5rem"
                      }} />
                    </Card.Body>
                </Card>
              }
            </div>

            <div style={{...styles.viaSocial,
              width: selectedCard === "social" ? "90%" : "50%",
              transition: "width 0.5s ease-in-out",
            }} onMouseEnter={() => setSelectedCard("social")} ref={SocialContainerRef}>
              {
                <Card style={{...styles.contactForm,
                  width: selectedCard === "social" ? "80%" : "40%",
                  transition: "width 0.5s ease-in-out",
                }}>
                    <Card.Body style={{
                      display: selectedCard === "social" ? "flex" : "none",
                      opacity: showContent === "social" ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      flexDirection: "column",
                      width: "100%",
                    }}>
                      <Card.Title style={{ ...styles.title1, textAlign: "center" }}>
                        Social Media
                      </Card.Title>
                      <Card.Text style={{ textAlign: "center", marginTop: "1rem" }}>
                        You can also reach me through my social media accounts:
                      </Card.Text>

                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "2rem",
                        marginTop: "1.5rem"
                      }}>
                        {/* Facebook */}
                        <a
                          href="https://www.facebook.com/peter.cao.161"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#1877F2", fontSize: "3.5rem", transition: "transform 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <FaFacebook />
                        </a>

                        {/* Instagram */}
                        <a
                          href="https://www.instagram.com/caokhaiminh7903"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "3.5rem",
                            background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            transition: "transform 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <FaInstagram />
                        </a>

                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/in/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#0077B5", fontSize: "3.5rem", transition: "transform 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <FaLinkedin /> {/* ✅ Corrected */}
                        </a>

                        {/* GitHub (optional) */}
                        <a
                          href="https://github.com/CKMPeter"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#333", fontSize: "3.5rem", transition: "transform 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <FaGithub />
                        </a>
                      </div>

                      <hr style={{ margin: "20px 0" }} />

                      <Card.Text style={{ ...styles.title1, textAlign: "center" }}>
                        And here is my Resume:
                      </Card.Text>

                      <div style={{ 
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1.5rem" 
                      }}>
                        <a
                          href="/files/MyResume.pdf"  // ✅ put your resume file in /public/files/
                          download="Minh-CV.pdf"
                          style={{ color: "#0077B5", fontSize: "3.5rem", transition: "transform 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <FaDownload />
                        </a>
                      </div>

                    </Card.Body>

                    {/* Collapsed Social Card: all icons with cycle focus */}
                    <Card.Body style={{
                      display: selectedCard === "social" ? "none" : "flex",
                      opacity: showContent === "social" ? 0 : 1,
                      transition: "opacity 0.5s ease-in",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      height: "100%",
                    }}>
                      {[ 
                        <FaFacebook color="#1877F2" />, 
                        <FaInstagram style={{ 
                          background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)", 
                          WebkitBackgroundClip: "text", 
                          WebkitTextFillColor: "transparent" 
                        }}/>, 
                        <FaLinkedin color="#0077B5" />, 
                        <FaGithub color="#333" />
                      ].map((Icon, index) => (
                        <div key={index} style={{
                          fontSize: currentIconIndex === index ? "5rem" : "3rem",
                          transition: "all 0.5s ease",
                          transform: currentIconIndex === index ? "scale(1.3)" : "scale(1)",
                          opacity: currentIconIndex === index ? 1 : 0.6,
                        }}>
                          {Icon}
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
              }
            </div>

          </div>
        </div>
      </div>
    )
  }
