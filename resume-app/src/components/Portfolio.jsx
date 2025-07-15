import React from 'react';
import styled from 'styled-components';

const PortfolioContainer = styled.div`
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

const PortfolioHeader = styled.h2`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProjectCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  border: 1px solid rgba(100, 116, 139, 0.5);
`;

const ProjectTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.5;
`;

const ProjectLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.colors.links.primary};
  text-decoration: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  transition: all 0.3s ease;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
  
  &:hover {
    color: ${props => props.theme.colors.links.hover};
    background: rgba(52, 211, 153, 0.1);
    border-color: ${props => props.theme.colors.links.hover};
    transform: translateY(-1px);
  }
  
  &:visited {
    color: ${props => props.theme.colors.links.visited};
  }
`;

const Portfolio = ({ title, projects }) => {
  return (
    <PortfolioContainer>
      <PortfolioHeader>
        <i className="fas fa-briefcase" style={{ color: '#8B5CF6' }} />
        <span>{title}</span>
      </PortfolioHeader>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            {project.image && (
              <ProjectImage 
                src={project.image} 
                alt={project.title} 
              />
            )}
            <ProjectTitle>
              <i className="fas fa-project-diagram" />
              {project.title}
            </ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectLinks>
              {project.link && (
                <ProjectLink 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt" />
                  {project.linkText || 'View Project'}
                </ProjectLink>
              )}
              {project.links && (
                project.links.map((link, idx) => (
                  <ProjectLink 
                    key={idx}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </ProjectLink>
                ))
              )}
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PortfolioContainer>
  );
};

export default Portfolio;