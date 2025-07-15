import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  z-index: 10;
`;

const LanguageButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.card};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.active ? 'white' : props.theme.colors.text.secondary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.card};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <SelectorContainer>
      <LanguageButton 
        active={currentLanguage === 'en'} 
        onClick={() => onLanguageChange('en')}
      >
        <i className="fas fa-language"></i> EN
      </LanguageButton>
      <LanguageButton 
        active={currentLanguage === 'ru'} 
        onClick={() => onLanguageChange('ru')}
      >
        <i className="fas fa-language"></i> RU
      </LanguageButton>
      <LanguageButton 
        active={currentLanguage === 'kz'} 
        onClick={() => onLanguageChange('kz')}
      >
        <i className="fas fa-language"></i> KZ
      </LanguageButton>
    </SelectorContainer>
  );
};

export default LanguageSelector;