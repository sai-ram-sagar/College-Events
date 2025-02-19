import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const RecommendationsPage = ({ userId }) => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const getRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ml/recommendations/${userId}`);
        setRecommendedEvents(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    getRecommendations();
  }, [userId]);

  return (
    <>
        <h1 style={{textAlign: "center"}}>Recommended Events</h1>
        <EventsContainer>
        {recommendedEvents.length > 0 ? (
            recommendedEvents.map((event) => (
                <EventCard key={event.id}>
                <EventImage src={event.bg_image} alt={event.event_name} />
                <EventTitle>{event.event_name}</EventTitle>
                <EventDetails>{event.date} • {event.location}</EventDetails>
                <EventDetails>Entry: {event.entry_price === 0 ? "Free" : `₹${event.entry_price}`}</EventDetails>
                <ButtonsContainer>
                {/* <LikeButton favorite={favorites.includes(event.id)} onClick={() => toggleFavorite(event.id)}>
                    <FontAwesomeIcon icon={faHeart} />
                </LikeButton> */}
                <Link to={`/event/${event.id}`}>
                    <MoreButton >
                    More <FontAwesomeIcon icon={faArrowRight} />
                    </MoreButton>
                </Link>
                </ButtonsContainer>
            </EventCard>
            ))
        ) : (
            <p>No recommendations available.</p>
        )}
        </EventsContainer>
    </>
  );
};

const EventsContainer = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const EventCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const EventTitle = styled.h3`
  font-size: 1.4rem;
  margin: 10px 0;
  color: #333;
`;

const EventDetails = styled.p`
  color: #555;
`;

const ButtonsContainer = styled.p`
  display: flex;
  justify-content: space-between;
`;

// const LikeButton = styled.button`
//   color: ${({ favorite }) => (favorite ? "red" : "grey")};
//   background-color: transparent;
//   border: none;
//   margin-top: 10px;
//   cursor: pointer;
//   border-radius: 6px;
//   transition: background 0.3s ease-in-out;
//   font-size: 20px;
//   &:hover {
//     color: ${({ favorite }) => (favorite ? "rgba(255, 0, 0, 0.83)" : "rgb(100, 100, 100)")} ;
//   }
// `; 

const MoreButton = styled.button`
  color:#5F388C;
  background-color: transparent;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 20px;
`; 

export default RecommendationsPage;
