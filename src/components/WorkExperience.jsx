import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WorkExperienceContainer = styled.div`
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

const WorkExperienceHeader = styled.h2`
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

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const JobCard = styled.div`
  background: rgba(30, 41, 59, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid rgba(245, 158, 11, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #F59E0B;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.1);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #F59E0B;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const JobCompany = styled.h4`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const JobPeriod = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const JobDates = styled.div`
  color: ${props => props.theme.colors.text.muted};
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ResponsibilitiesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
  list-style: none;
  padding: 0;
`;

const ResponsibilityItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  
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

const BulletPoint = styled.span`
  color: ${props => props.theme.colors.accent};
  margin-top: 2px;
  flex-shrink: 0;
  font-size: 1.2rem;
`;

const WorkExperience = ({ title, jobs, language }) => {
  const [totalExperience, setTotalExperience] = useState('');

  const parseDate = (dateString) => {
    if (dateString.toLowerCase() === "present") {
      return new Date();
    }
    const [year, month] = dateString.split('-');
    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
  };

  const calculateExperience = (start, end) => {
    let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

    if (totalMonths < 0) totalMonths = 0;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return { years, months };
  };

  const formatExperience = (exp, lang) => {
    const y = exp.years;
    const m = exp.months;

    switch (lang) {
      case 'en': {
        if (y === 0 && m === 0) return "0 months";
        const yearsEn = y === 1 ? "1 year" : `${y} years`;
        const monthsEn = m === 1 ? "1 month" : `${m} months`;
        if (y === 0) return `${monthsEn}`;
        if (m === 0) return `${yearsEn}`;
        return `${yearsEn} ${monthsEn}`;
      }
      case 'ru': {
        if (y === 0 && m === 0) return "0 мес.";
        const yearsRu = `${y} лет`;
        const monthsRu = `${m} мес.`;
        if (y === 0) return monthsRu;
        if (m === 0) return yearsRu;
        return `${yearsRu} ${monthsRu}`;
      }
      case 'kz': {
        if (y === 0 && m === 0) return "0 ай";
        const yearsKz = `${y} жыл`;
        const monthsKz = `${m} ай`;
        if (y === 0) return monthsKz;
        if (m === 0) return yearsKz;
        return `${yearsKz} ${monthsKz}`;
      }
      default:
        return `${y} years ${m} months`;
    }
  };

  const formatDate = (dateString, lang) => {
    if (dateString.toLowerCase() === "present") {
      switch (lang) {
        case 'en': return "Present";
        case 'ru': return "Настоящее время";
        case 'kz': return "Қазіргі уақыт";
        default: return "Present";
      }
    }
    
    const [year, month] = dateString.split('-');
    const monthNames = {
      'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      'ru': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      'kz': ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел']
    };
    
    const monthName = monthNames[lang] ? monthNames[lang][parseInt(month, 10) - 1] : month;
    return `${monthName} ${year}`;
  };

  useEffect(() => {
    let totalMonths = 0;
    
    jobs.forEach(job => {
      const startDate = parseDate(job.startDate);
      const endDate = parseDate(job.endDate);
      const exp = calculateExperience(startDate, endDate);
      const months = (exp.years * 12) + exp.months;
      totalMonths += months;
    });

    const years = Math.floor(totalMonths / 12);
    const remMonths = totalMonths % 12;
    setTotalExperience(formatExperience({ years, months: remMonths }, language));
  }, [jobs, language]);

  return (
    <WorkExperienceContainer>
      <WorkExperienceHeader>
        <i className="fas fa-briefcase" style={{ color: '#8B5CF6' }} />
        <span>{title} — {totalExperience}</span>
      </WorkExperienceHeader>
      <JobsContainer>
        {jobs.map((job, index) => {
          const startDate = parseDate(job.startDate);
          const endDate = parseDate(job.endDate);
          const exp = calculateExperience(startDate, endDate);
          const period = formatExperience(exp, language);

          return (
            <JobCard key={index}>
              <JobTitle>{job.title}</JobTitle>
              <JobCompany>
                <i className="fas fa-building" />
                {job.company} · <JobPeriod>{period}</JobPeriod>
              </JobCompany>
              <JobDates>
                <i className="fas fa-calendar-alt" />
                {formatDate(job.startDate, language)} — {formatDate(job.endDate, language)}
              </JobDates>
              <ResponsibilitiesList>
                {job.responsibilities.map((responsibility, idx) => (
                  <ResponsibilityItem key={idx}>
                    <BulletPoint>•</BulletPoint>
                    <span dangerouslySetInnerHTML={{ __html: responsibility }} />
                  </ResponsibilityItem>
                ))}
              </ResponsibilitiesList>
            </JobCard>
          );
        })}
      </JobsContainer>
    </WorkExperienceContainer>
  );
};

export default WorkExperience;