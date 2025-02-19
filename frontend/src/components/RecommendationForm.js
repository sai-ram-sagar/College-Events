import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RecommendationContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const EventCard = styled.div`
  display: inline-block;
  width: 300px;
  margin: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const EventImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const EventTitle = styled.h3`
  font-size: 1.2em;
  margin-top: 10px;
`;

const EventDetails = styled.p`
  font-size: 1em;
  color: #555;
`;

const MoreButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Recommendation = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) return;
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      try {
        const res = await axios.get(`${backendUrl}/api/recommendations?userId=${userId}`);
        setRecommendedEvents(res.data.recommendedEvents); // Set recommended events from the API response
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
<RecommendationContainer>
  <h1>Recommended Events for you</h1>
  {recommendedEvents && recommendedEvents.length > 0 ? (
    <div>
      {recommendedEvents.map((event) => (
        <EventCard key={event.id}>
          <EventImage src={event.bg_image} alt={event.event_name} />
          <EventTitle>{event.event_name}</EventTitle>
          <EventDetails>{event.date} • {event.location} • {event.id}</EventDetails>
          <EventDetails>Entry: {event.entry_price === 0 ? 'Free' : `₹${event.entry_price}`}</EventDetails>
          <Link to={`/event/${event.id}`}>
            <MoreButton>
              More <FontAwesomeIcon icon={faArrowRight} />
            </MoreButton>
          </Link>
        </EventCard>
      ))}
    </div>
  ) : (
    <p>No recommendations available at the moment because your search history is empty.</p>
  )}
</RecommendationContainer>

  );
};

export default Recommendation;
