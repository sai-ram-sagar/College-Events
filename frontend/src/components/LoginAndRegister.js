import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ClipArt from "../assets/images/event-clipart.png";

const LoginAndRegister = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const url = isLogin ? `${backendUrl}/login` : `${backendUrl}/signup`;
      const payload = isLogin ? { email, password } : { username, email, password };
      
      const { data } = await axios.post(url, payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setTimeout(() => setError(""), 10000);
    }
  };

  return (
    <Container>
      <Overlay />
      <Title>College Events</Title>
      <DetailsContainer>
        <ClipArtWrapper>
          <img src={ClipArt} alt="clipart" />
        </ClipArtWrapper>
        <Content>
          <h1>{isLogin ? "Login" : "Signup"}</h1>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorText>{error}</ErrorText>}
            {!isLogin && <Input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />}
            <Input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">{isLogin ? "Login" : "Signup"}</Button>
          </Form>
          <ToggleText>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <ToggleLink onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up" : "Log in"}</ToggleLink>
          </ToggleText>
        </Content>
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  color: #ffffff;
  text-align: center;
  background-image: url(${require("../assets/images/login_bg.jpg")});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5vh;

  @media screen and (max-width: 768px) {
    height: 100vh;
    padding: 5vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 50px;
  z-index: 2;
  margin-top: -10px;
  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 768px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ClipArtWrapper = styled.div`
  z-index: 2;

  @media screen and (max-width: 768px) {
    img{
      width: 200px;
      margin-bottom: 20px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  border: 1px solid white;
  padding: 60px 20px;
  border-radius: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ErrorText = styled.p`
  color: red;
`;

const ToggleText = styled.p`
  margin-top: 10px;
`;

const ToggleLink = styled.span`
  color: #007bff;
  cursor: pointer;
`;

export default LoginAndRegister;
