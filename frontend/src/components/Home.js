import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";

const images = [
  require("../assets/images/event_bg_img_1.jpg"),
  require("../assets/images/event_bg_img_2.jpg"),
  require("../assets/images/event_bg_img_3.jpg"),
  require("../assets/images/event_bg_img_4.jpg"),
  require("../assets/images/event_bg_img_5.jpg"),
  require("../assets/images/event_bg_img_6.jpg"),
  require("../assets/images/event_bg_img_7.jpg"),
  require("../assets/images/event_bg_img_8.jpg"),
  require("../assets/images/event_bg_img_9.jpg"),
  require("../assets/images/event_bg_img_10.jpg"),
  require("../assets/images/event_bg_img_11.jpg"),
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselContainer>
      <CarouselImage src={images[currentImage]} alt="College Background" />
      <Overlay>
        <Title>Welcome to College Event Recommendations</Title>
        <Subtitle>Register for your favorite event!</Subtitle>
        <ExploreButton onClick={() => navigate("/events")}>Explore Events</ExploreButton>
      </Overlay>
    </CarouselContainer>
  );
}

export default Home;


const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.61);
  padding: 20px 40px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
`;

const ExploreButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background-color: #e68900;
  }
`;
