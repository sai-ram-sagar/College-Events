import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import eventData from "../data/events.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt, faTag, faChalkboardTeacher, faUserGraduate, faClock, faUsers, faRupeeSign, faInfoCircle, faPhone, faTrophy, faHandHoldingUsd, faLink, faGavel } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventData.find((e) => e.id === parseInt(id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: "", branch: "", email: "", mobile: "" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkRegistration = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/check-registration?user_id=${userId}&event_id=${id}`);
        const data = await response.json();
        if (response.ok && data.registered) setIsRegistered(true);
      } catch (error) {
        console.error("Error checking registration status:", error);
      }
    };
    checkRegistration();
  }, [userId, id]);

  if (!event) return <Message>Event not found</Message>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please log in to register for the event.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, event_id: event.id, ...formData }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! ✅");
        setIsModalOpen(false);
        setIsRegistered(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container bgImage={event.bg_image}>
      <Content>
        <h2>{event.event_name}</h2>
        <p>{event.description}</p>
        <DetailsContainer>
  <DetailBox>
    <Icon icon={faCalendarAlt} />
    {event.date} at {event.time}
  </DetailBox>
  <DetailBox>
    <Icon icon={faMapMarkerAlt} />
    {event.location}
  </DetailBox>
  <DetailBox>
    <Icon icon={faTag} />
    {event.category}
  </DetailBox>
  <DetailBox>
    <Icon icon={faClock} />
    {event.duration}
  </DetailBox>
  <DetailBox>
    <Icon icon={faUsers} />
    Max: {event.max_participants}
  </DetailBox>
  <DetailBox>
    <Icon icon={faRupeeSign} />
    {event.entry_price === 0 ? "Free" : `₹${event.entry_price}`}
  </DetailBox>
  <DetailBox>
    <Icon icon={faInfoCircle} />
    {event.eligibility}
  </DetailBox>
  <DetailBox>
    <Icon icon={faChalkboardTeacher} />
    Staff: {event.staff_coordinator}
  </DetailBox>
  <DetailBox>
    <Icon icon={faUserGraduate} />
    Student: {event.student_coordinator}
  </DetailBox>

  {/* Sponsors Section */}
  <Section>
    <SectionTitle><FontAwesomeIcon icon={faHandHoldingUsd} /> Sponsors</SectionTitle>
    {event.sponsors.join(", ")}
  </Section>

  {/* Prizes Section */}
  <Section>
    <SectionTitle><FontAwesomeIcon icon={faTrophy} /> Prizes</SectionTitle>
    <PrizeList>
      <li>🥇 1st: {event.prizes.first_place}</li>
      <li>🥈 2nd: {event.prizes.second_place}</li>
      <li>🥉 3rd: {event.prizes.third_place}</li>
    </PrizeList>
  </Section>

  {/* Rules Section */}
  <Section>
    <SectionTitle><FontAwesomeIcon icon={faGavel} /> Rules</SectionTitle>
    <RulesList>
      {event.rules.map((rule, index) => (
        <li style={{listStyleType:"none"}} key={index}>{rule}</li>
      ))}
    </RulesList>
  </Section>

  
</DetailsContainer>
        {/* <Prizes>
          <h3>Prizes</h3>
          <p>🥇 {event.prizes.first_place}</p>
          <p>🥈 {event.prizes.second_place}</p>
          <p>🥉 {event.prizes.third_place}</p>
        </Prizes> */}
        <Button disabled={isRegistered} onClick={() => setIsModalOpen(true)}>
          {isRegistered ? "Already Registered" : "Register for Event"}
        </Button>
        <Button onClick={() => navigate(-1)}>Back</Button>

{/* Social Links */}
      <FollowUsSection>
        <h5><FontAwesomeIcon icon={faLink} /> Follow Us</h5>
        <SocialLinks>
          <a href={event.social_links.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href={event.social_links.facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </SocialLinks>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft:"15px", cursor:"pointer" }}>
          <FontAwesomeIcon icon={faPhone} style={{ color:"#007bff" }} />
          {event.contact_info}
        </div>
      </FollowUsSection>
      </Content>
      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h3>Register for {event.event_name}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
              <div >
                <button style={{backgroundColor:"#007bff", color:"white", border:"none", padding:"4px 10px", borderRadius:"4px", cursor:"pointer"}} type="submit">Submit</button>
                <button style={{marginLeft:"10px", backgroundColor:"red", color:"white", border:"none", padding:"4px 10px", borderRadius:"4px", cursor:"pointer"}} type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>              
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default EventDetails;

// Styled Components
const Container = styled.div`
  background: url(${(props) => props.bgImage}) center/cover no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  width: 70vw;
  text-align: center;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  font-size: 14px;
`;

const DetailBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  color: #333;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #007bff;
  font-size: 18px;
`;

const Section = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;



const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: #007bff;
`;

const PrizeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 500;

  li {
    margin-bottom: 5px;
  }
`;

const RulesList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin: 0;
`;

const FollowUsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h5{
    margin-right: 10px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  a {
    color: #007bff;
    font-size: 20px;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: #0056b3;
    }
  }
`;

// const Prizes = styled.div`
//   margin-top: 15px;
//   background: #f8d7da;
//   padding: 10px;
//   border-radius: 5px;
// `;

const Button = styled.button`
  margin: 10px;
  margin-top: 20px;
  padding: 10px;
  background: ${(props) => (props.disabled ? "gray" : "blue")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  
  form{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    input{
      background: #f5f5f5;
      padding: 12px;
      border-radius: 8px;
      color: #333;
      width: 250px;
    }
  }
`;

const Message = styled.h2`
  text-align: center;
  margin-top: 50px;
`;
