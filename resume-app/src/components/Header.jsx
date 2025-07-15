import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  animation: ${fadeIn} 0.8s ease-out;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PhotoContainer = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('/img.png');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.lg};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  animation: ${pulse} 2s infinite;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const ContactItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const ContactIcon = styled.i`
  color: ${props => props.theme.colors.primary};
  width: 20px;
  text-align: center;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.links.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.links.hover};
    text-shadow: 0 0 8px ${props => props.theme.colors.links.hover};
  }
  
  &:visited {
    color: ${props => props.theme.colors.links.visited};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <PhotoContainer />
      <InfoContainer>
        <Name>Косши Мурат</Name>
        <Title>Full Stack Developer</Title>
        <ContactInfo>
          <ContactItem>
            <ContactIcon className="fas fa-phone-alt" />
            <span>Телефон: <ContactLink href="tel:+77774334949">+7 (777) 433-49-49</ContactLink></span>
          </ContactItem>
          <ContactItem>
            <ContactIcon className="fas fa-envelope" />
            <span>Email: <ContactLink href="mailto:murat.kosshi@gmail.com">murat.kosshi@gmail.com</ContactLink></span>
          </ContactItem>
          <ContactItem>
            <ContactIcon className="fab fa-telegram-plane" />
            <span>Telegram: <ContactLink href="https://t.me/MKASDFG" target="_blank">@MKASDFG</ContactLink></span>
          </ContactItem>
          <ContactItem>
            <ContactIcon className="fab fa-github" />
            <span>GitHub: <ContactLink href="https://github.com/muratkosshi" target="_blank">github.com/muratkosshi</ContactLink></span>
          </ContactItem>
          <ContactItem>
            <ContactIcon className="fas fa-map-marker-alt" />
            <span>Местоположение: Актобе, Казахстан</span>
          </ContactItem>
        </ContactInfo>
      </InfoContainer>
    </HeaderContainer>
  );
};

export default Header;