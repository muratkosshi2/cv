import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import Section from './components/Section';
import WorkExperience from './components/WorkExperience';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import AdminPanel from './components/AdminPanel';
import EditableSection from './components/EditableSection';
import EditableWorkExperience from './components/EditableWorkExperience';
import EditableSkills from './components/EditableSkills';
import EditablePortfolio from './components/EditablePortfolio';
import useResumeData from './hooks/useResumeData';
import { theme } from './theme';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, #1E293B 50%, ${props => props.theme.colors.background} 100%);
  padding: ${props => props.theme.spacing.lg};
`;

const MainCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: ${props => props.theme.spacing.xxl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionsContainer = styled.div`
  margin-top: ${props => props.theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Footer = styled.footer`
  margin-top: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.text.muted};
  font-size: 0.875rem;
`;

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('ru');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const {
    data,
    saveData,
    resetData,
    exportData,
    importData,
    updateSectionField,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject
  } = useResumeData(currentLanguage);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'ru';
    setCurrentLanguage(lang);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
  };

  const handleToggleEditMode = (editMode) => {
    setIsEditMode(editMode);
  };

  const handleSummaryEdit = (content) => {
    updateSectionField(currentLanguage, 'summary', 'content', content);
  };

  const handleEducationEdit = (content) => {
    updateSectionField(currentLanguage, 'education', 'content', content);
  };

  const handleAdditionalInfoEdit = (content) => {
    updateSectionField(currentLanguage, 'additionalInfo', 'content', content);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AdminPanel
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          onSaveChanges={saveData}
          onResetData={resetData}
          onExportData={exportData}
          onImportData={importData}
        />
        
        <MainCard data-resume-container>
          <ContentWrapper>
            <Header />
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={handleLanguageChange} 
            />
            
            <SectionsContainer>
              <EditableSection
                isEditMode={isEditMode}
                onEdit={handleSummaryEdit}
                title="Резюме"
                type="html"
              >
                <Section title={data.summary.title} icon="fas fa-user">
                  <div dangerouslySetInnerHTML={{ __html: data.summary.content }} />
                </Section>
              </EditableSection>

              <EditableWorkExperience
                isEditMode={isEditMode}
                jobs={data.experience.jobs}
                onAddJob={addWorkExperience}
                onUpdateJob={updateWorkExperience}
                onDeleteJob={removeWorkExperience}
                language={currentLanguage}
              >
                <WorkExperience 
                  title={data.experience.title} 
                  jobs={data.experience.jobs}
                  language={currentLanguage}
                />
              </EditableWorkExperience>

              <EditableSection
                isEditMode={isEditMode}
                onEdit={handleEducationEdit}
                title="Образование"
                type="html"
              >
                <Section title={data.education.title} icon="fas fa-graduation-cap">
                  <div dangerouslySetInnerHTML={{ __html: data.education.content }} />
                </Section>
              </EditableSection>

              <EditableSkills
                isEditMode={isEditMode}
                skills={data.skills.items}
                onAddSkill={addSkill}
                onUpdateSkill={updateSkill}
                onDeleteSkill={removeSkill}
                language={currentLanguage}
              >
                <Skills title={data.skills.title} skills={data.skills.items} />
              </EditableSkills>

              <EditablePortfolio
                isEditMode={isEditMode}
                projects={data.portfolio.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={removeProject}
                language={currentLanguage}
                section="portfolio"
              >
                <Portfolio 
                  title={data.portfolio.title} 
                  projects={data.portfolio.projects}
                />
              </EditablePortfolio>

              <EditablePortfolio
                isEditMode={isEditMode}
                projects={data.personalProjects.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={removeProject}
                language={currentLanguage}
                section="personalProjects"
              >
                <Portfolio 
                  title={data.personalProjects.title} 
                  projects={data.personalProjects.projects}
                />
              </EditablePortfolio>

              <EditableSection
                isEditMode={isEditMode}
                onEdit={handleAdditionalInfoEdit}
                title="Дополнительная информация"
                type="html"
              >
                <Section title={data.additionalInfo.title} icon="fas fa-info-circle">
                  <div dangerouslySetInnerHTML={{ __html: data.additionalInfo.content }} />
                </Section>
              </EditableSection>
            </SectionsContainer>
          </ContentWrapper>
        </MainCard>

        <Footer>
          <p>© 2024 Косши Мурат</p>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
