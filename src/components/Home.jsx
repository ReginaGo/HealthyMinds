import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa axios
import Navbar from "./Navbar";
import styles from "../Css/styles.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openAnswer, setOpenAnswer] = useState(null);

  let apiPath = "";

  if (process.env.NODE_ENV === "production") {
    apiPath = "https://backend-kv8d.onrender.com"; // URL del backend en producción
  } else {
    apiPath = "http://localhost:5001"; // URL del backend en desarrollo
  }

  useEffect(() => {
    // Usamos axios para realizar la solicitud GET
    axios
      .get(apiPath, { withCredentials: true }) // Añade `withCredentials` si necesitas cookies
      .then((response) => {
        setUsername(response.data.username || "Guest");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Session verification error:", error);
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        } else {
          setError("Failed to load user data.");
        }
        setIsLoading(false);
      });
  }, [apiPath]);

  const toggleAnswer = (index) => {
    setOpenAnswer(openAnswer === index ? null : index);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: "center" }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      </div>
    );
  }


  return (
    <div>
      <Navbar />

      {/* Welcome Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "7%",
        }}
      >
        <h2>Healthy Minds</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
        }}
      >
        <h1>Welcome, {username}!</h1>
      </div>

      {/* Image Container */}
      <div style={{ top: "10%" }} className="image-container">
        <img
          style={{ borderRadius: "50px", height: "5%" }}
          src="https://i.pinimg.com/564x/95/09/ba/9509ba73e0ebc3d46958ab4d748d8963.jpg"
          className="img-fluid"
          alt="Healthy Minds"
        />
        <div className="fade-overlay"></div>
        <div className="button-overlay">
          <a href="/mood">
            <button>Track your mood</button>
          </a>
          <a href="#track">
            <button>Discover</button>
          </a>
        </div>
      </div>

      {/* Mental Health Section */}
      <h1 className="text-center my-5">Mental health matters</h1>

      {/* Testimonials Section */}
      <div id="track" className="container text-center">
        <div className="row align-items-start">
          {[
            {
              img: "../img/p1.png",
              name: "Maria, 28, Generalized Anxiety Disorder",
              text: "Learning about my anxiety was life-changing. Before, I just thought I was overly sensitive or weak, but understanding it as a real condition helped me be kinder to myself.",
            },
            {
              img: "../img/p3.png",
              name: "James, 21, Major Depressive Disorder",
              text: "For years, I kept telling myself to just 'snap out of it,' but that only made things worse. Once I acknowledged my depression as something real and treatable, I stopped blaming myself and started focusing on recovery.",
            },
            {
              img: "../img/p2.png",
              name: "Sarah, 22, Bipolar Disorder",
              text: "It was so freeing to understand my mood swings as part of bipolar disorder, not just as random episodes of highs and lows.",
            },
            {
              img: "../img/p5.png",
              name: "James, 21, Major Depressive Disorder",
              text: "For years, I kept telling myself to just 'snap out of it,' but that only made things worse. Once I acknowledged my depression as something real and treatable, I stopped blaming myself and started focusing on recovery. The support I received from friends and family made a world of difference, and I feel hope again.",
            },
            {
              img: "../img/p4.png",
              name: "Sarah, 22, Bipolar Disorder",
              text: "",
            },
            {
              img: "../img/p6.png",
              name: "Sarah, 22, Bipolar Disorder",
              text: "It was so freeing to understand my mood swings as part of bipolar disorder, not just as random episodes of highs and lows.",
            },
          ].map((testimonial, index) => (
            <div className="col" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={testimonial.img}
                  className="card-img-top"
                  alt={testimonial.name}
                />
                <div className="card-body">
                  <p>
                    <em>{testimonial.name}</em>
                  </p>
                  <p className="card-text">{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     <div className="faqsIcon">
    <a href="#FAQS">
        <img src="/img/FAQ.png" alt="FAQs" />
    </a>
</div>
<br />
<br />
<div style={{ justifyContent: "center", backgroundColor: "rgb(200, 227, 239)", height: "120px" }}>
 
  <div style={{ top: "30px" }}>
    <h2 style={{ textAlign: "center" }}>
      <br />
      We fight for you, for your mental health, for your peace.
    </h2>
  </div>
</div>
<br />
<br />
<h1 style={{ marginLeft: "5%" }}>What's mental health?</h1>
<div style={{ marginLeft: "5%" }}>
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos unde ex aut voluptas expedita minima optio,
    consequatur reprehenderit. Quidem itaque totam fuga impedit excepturi maxime. Aliquid dolorum veritatis magni
    dolores.
  </p>
</div>
<br />
<h1 style={{ marginLeft: "5%" }}>Why is it important?</h1>
<div style={{ marginLeft: "5%" }}>
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos unde ex aut voluptas expedita minima optio,
    consequatur reprehenderit. Quidem itaque totam fuga impedit excepturi maxime. Aliquid dolorum veritatis magni
    dolores.
  </p>
</div>
<br />
<br />
<br />
<div className="fila">
  <div style={{ fontSize: "xx-large" }} className="celdaNumero">
    <img style={{ width: "15%" }} src="./img/cabeza.png" alt="Head icon" />
    <div>
      <p>Are people who pay attention to their mental health happier?</p>
    </div>
  </div>
  <div style={{ fontSize: "xx-large" }} className="celdaTexto">
    <img style={{ width: "15%" }} src="./img/cerebro.png" alt="Brain icon" />
    <div>
      <p>
        According to investigator Dr Pattinson, 65% of people treating their conditions stated to have a better life
        quality.
      </p>
    </div>
  </div>
</div>
<br />
<h1 className="text-center">Introductive Videos</h1>
<br />
<div style={{ marginLeft: "5%" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/GWGbOjlJDkU?si=4pR4X0XlRDI_7YEY"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/3QIfkeA6HBY?si=0McQx6nhL81xvzRZ"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
  <div style={{ display: "flex", alignItems: "center" }}>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/NQcYZplTXnQ?si=5TMBadTRJ9x2VxvB"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/nCrjevx3-Js?si=vuOjrcBoGlPUxH3Z"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
</div>
<br />
<br />
<h1 className="text-center">Frequently Asked Questions</h1>
<div id="FAQS" className="faq-item">
  <button className="faq-question" onClick={() => toggleAnswer(0)}>
    What is anxiety?
  </button>
  <div className="faq-answer" id="answer-0" style={{ display: openAnswer === 0 ? "block" : "none" }}>
    <p>
      Anxiety is such a normal emotion, it is when the terrifying thought of the worst possible case scenario
      happening overcomes you.
    </p>
  </div>
</div>
<div className="faq-item">
  <button className="faq-question" onClick={() => toggleAnswer(1)}>
    How to reduce stress?
  </button>
  <div className="faq-answer" id="answer-1" style={{ display: openAnswer === 1 ? "block" : "none" }}>
    <p>There are several techniques such as physical exercise and meditation.</p>
  </div>
</div>
<div className="faq-item">
  <button className="faq-question" onClick={() => toggleAnswer(2)}>
    When should I seek help?
  </button>
  <div className="faq-answer" id="answer-2" style={{ display: openAnswer === 2 ? "block" : "none" }}>
    <p>It is important to seek help when it feels like anxiety and stress are taking over your thoughts.</p>
  </div>
</div>

      {/* FAQs Section */}
      
    
      <footer>
        <div className="footer-content">
          <div className="contact-info">
            <h3>Seek help</h3>
            <p>
              <strong>Life line</strong>
            </p>
            <p>
              Phone: <a href="tel:+55 800 911 2000">800 911 2000</a>
            </p>
          </div>
          <div className="social-media">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;