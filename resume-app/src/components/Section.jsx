import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  border: 1px solid rgba(51, 65, 85, 0.5);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.4);
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  border-bottom: 2px solid rgba(139, 92, 246, 0.5);
  padding-bottom: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const SectionIcon = styled.i`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.2rem;
`;

const SectionContent = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  ul {
    margin-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  a {
    color: ${props => props.theme.colors.links.primary};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.links.hover};
      text-shadow: 0 0 8px ${props => props.theme.colors.links.hover};
    }
  }
  
  strong {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const Section = ({ title, icon, children }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionIcon className={icon} />
        <span>{title}</span>
      </SectionHeader>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
};

export default Section;