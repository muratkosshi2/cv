import { useState, useEffect } from 'react';
import { resumeData as originalData } from '../data/resumeData';

const useResumeData = (language) => {
  const [data, setData] = useState(originalData);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных из localStorage:', error);
      }
    }
  }, []);

  const updateData = (newData) => {
    setData(newData);
    setIsDirty(true);
  };

  const saveData = () => {
    localStorage.setItem('resumeData', JSON.stringify(data));
    setIsDirty(false);
    alert('Данные сохранены');
  };

  const resetData = () => {
    setData(originalData);
    localStorage.removeItem('resumeData');
    setIsDirty(false);
    alert('Данные сброшены к исходным');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (newData) => {
    setData(newData);
    setIsDirty(true);
    alert('Данные импортированы');
  };

  const updateSection = (language, section, value) => {
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        [section]: value
      }
    };
    updateData(newData);
  };

  const updateSectionField = (language, section, field, value) => {
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        [section]: {
          ...data[language][section],
          [field]: value
        }
      }
    };
    updateData(newData);
  };

  const addWorkExperience = (language, job) => {
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        experience: {
          ...data[language].experience,
          jobs: [...data[language].experience.jobs, job]
        }
      }
    };
    updateData(newData);
  };

  const updateWorkExperience = (language, index, job) => {
    const newJobs = [...data[language].experience.jobs];
    newJobs[index] = job;
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        experience: {
          ...data[language].experience,
          jobs: newJobs
        }
      }
    };
    updateData(newData);
  };

  const removeWorkExperience = (language, index) => {
    const newJobs = data[language].experience.jobs.filter((_, i) => i !== index);
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        experience: {
          ...data[language].experience,
          jobs: newJobs
        }
      }
    };
    updateData(newData);
  };

  const addSkill = (language, skill) => {
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        skills: {
          ...data[language].skills,
          items: [...data[language].skills.items, skill]
        }
      }
    };
    updateData(newData);
  };

  const updateSkill = (language, index, skill) => {
    const newSkills = [...data[language].skills.items];
    newSkills[index] = skill;
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        skills: {
          ...data[language].skills,
          items: newSkills
        }
      }
    };
    updateData(newData);
  };

  const removeSkill = (language, index) => {
    const newSkills = data[language].skills.items.filter((_, i) => i !== index);
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        skills: {
          ...data[language].skills,
          items: newSkills
        }
      }
    };
    updateData(newData);
  };

  const addProject = (language, section, project) => {
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        [section]: {
          ...data[language][section],
          projects: [...data[language][section].projects, project]
        }
      }
    };
    updateData(newData);
  };

  const updateProject = (language, section, index, project) => {
    const newProjects = [...data[language][section].projects];
    newProjects[index] = project;
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        [section]: {
          ...data[language][section],
          projects: newProjects
        }
      }
    };
    updateData(newData);
  };

  const removeProject = (language, section, index) => {
    const newProjects = data[language][section].projects.filter((_, i) => i !== index);
    const newData = {
      ...data,
      [language]: {
        ...data[language],
        [section]: {
          ...data[language][section],
          projects: newProjects
        }
      }
    };
    updateData(newData);
  };

  return {
    data: data[language],
    fullData: data,
    isDirty,
    saveData,
    resetData,
    exportData,
    importData,
    updateSection,
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
  };
};

export default useResumeData;