import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.div`
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

const SkillsHeader = styled.h2`
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

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const SkillTag = styled.div`
  background: rgba(16, 185, 129, 0.2);
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    background: rgba(16, 185, 129, 0.3);
    transform: translateY(-2px) scale(1.05);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const SkillIcon = styled.i`
  color: ${props => props.theme.colors.accent};
`;

const Skills = ({ title, skills }) => {
  return (
    <SkillsContainer>
      <SkillsHeader>
        <i className="fas fa-tools" style={{ color: '#8B5CF6' }} />
        <span>{title}</span>
      </SkillsHeader>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillTag key={index}>
            <SkillIcon className={skill.icon} />
            <span>{skill.name}</span>
          </SkillTag>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default Skills;