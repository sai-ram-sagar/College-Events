import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUniversity, faSignOutAlt, faLightbulb, faBars, faTimes, faHeart, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </MenuIcon>
      <SidebarContainer menuOpen={menuOpen}>
        <LogoContainer onClick={() => navigate("/home")}>
          {/* <img src={appLogo} alt="logo" /> */}
          <h2>College Events Recommendations</h2>
        </LogoContainer>
        <NavLinks>
          <NavItem to="/home" location={location} onClick={handleNavItemClick}>
            <FontAwesomeIcon icon={faHome} /> Home
          </NavItem>
          <NavItem to="/events" location={location} onClick={handleNavItemClick}>
            <FontAwesomeIcon icon={faUniversity} /> All Events
          </NavItem>
          <NavItem to="/recommend" location={location} onClick={handleNavItemClick}>
            <FontAwesomeIcon icon={faLightbulb} /> Recommendations
          </NavItem>
          <NavItem to="/favorites" location={location} onClick={handleNavItemClick}>
            <FontAwesomeIcon icon={ faHeart} />  Favorites
          </NavItem>
          {/* <NavItem to="/ml" location={location} onClick={handleNavItemClick}>
            <FontAwesomeIcon icon={ faGun } /> ML
          </NavItem> */}
          <NavItem to="/registered" location={location} onClick={handleNavItemClick}>
            <FontAwesomeIcon icon={faCheckCircle} /> Registered Events
          </NavItem>
        </NavLinks>
        <LogoutButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </LogoutButton>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 18vw;
  height: 100vh;
  background-color:rgb(33, 33, 33) ;
  color: white;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  
  @media (max-width: 768px) {
    width: 65%;
    max-width: 280px;
    transform: ${({ menuOpen }) => (menuOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const LogoContainer = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.41);
  cursor: pointer;
  margin-bottom: 30px;
  img {
    width: 280px;
  }
  h2{
    text-align: center;
  }
`;

const MenuIcon = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  z-index: 1001;
  background: #191970;
  padding: 10px;
  border-radius: 5px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 5px;
  transition: background 0.3s ease;
  background-color: ${({ to, location }) => (location.pathname === to ? "rgba(255, 255, 255, 0.2)" : "transparent")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const LogoutButton = styled.button`
  background-color:rgb(231, 6, 29);
  color: white;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  margin-top: 20px;
  transition: background 0.3s ease;
  position: absolute;
  width: 80%;
  bottom: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

export default Sidebar;
