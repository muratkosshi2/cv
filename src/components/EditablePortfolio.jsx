import React, { useState } from 'react';
import styled from 'styled-components';

const EditContainer = styled.div`
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  position: relative;
  
  &:hover {
    border-color: #2563eb;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: #2563eb;
  }
`;

const AddButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0;
  
  &:hover {
    background: #059669;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  
  &:hover {
    background: #2563eb;
  }
`;

const CancelButton = styled(Button)`
  background: #6b7280;
  
  &:hover {
    background: #4b5563;
  }
`;

const DeleteButton = styled(Button)`
  background: #ef4444;
  
  &:hover {
    background: #dc2626;
  }
`;

const ProjectCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  position: relative;
  
  &:hover {
    border-color: #3b82f6;
  }
`;

const ProjectEditButton = styled.button`
  position: absolute;
  top: 8px;
  right: 40px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  z-index: 999!important;
  
  &:hover {
    background: #2563eb;
  }
`;

const ProjectDeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  z-index: 999!important;
  
  &:hover {
    background: #dc2626;
  }
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  
  button {
    margin-left: 10px;
    padding: 4px 8px;
    font-size: 12px;
  }
`;

const EditablePortfolio = ({ children, isEditMode, projects, onUpdateProject, onAddProject, onDeleteProject, language, section }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editProject, setEditProject] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    linkText: '',
    links: []
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    const project = projects[index];
    setEditProject({
      ...project,
      links: project.links || []
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditIndex(-1);
    setEditProject({
      title: '',
      description: '',
      image: '',
      link: '',
      linkText: '',
      links: []
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const projectToSave = { ...editProject };
    
    if (projectToSave.link && projectToSave.linkText) {
      projectToSave.links = [
        ...(projectToSave.links || []),
        { text: projectToSave.linkText, url: projectToSave.link }
      ];
      delete projectToSave.link;
      delete projectToSave.linkText;
    }

    if (editIndex === -1) {
      onAddProject(language, section, projectToSave);
    } else {
      onUpdateProject(language, section, editIndex, projectToSave);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditProject({
      title: '',
      description: '',
      image: '',
      link: '',
      linkText: '',
      links: []
    });
  };

  const handleDelete = (index) => {
    if (window.confirm('Удалить этот проект?')) {
      onDeleteProject(language, section, index);
    }
  };

  const addLink = () => {
    setEditProject({
      ...editProject,
      links: [...(editProject.links || []), { text: '', url: '' }]
    });
  };

  const updateLink = (index, field, value) => {
    const newLinks = [...(editProject.links || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setEditProject({
      ...editProject,
      links: newLinks
    });
  };

  const removeLink = (index) => {
    const newLinks = (editProject.links || []).filter((_, i) => i !== index);
    setEditProject({
      ...editProject,
      links: newLinks
    });
  };

  if (!isEditMode) {
    return children;
  }

  return (
    <>
      <EditContainer>
        <EditButton onClick={handleAdd}>
          Добавить проект
        </EditButton>
        
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectEditButton onClick={() => handleEdit(index)} style={{zIndex:999}}>
              Редактировать
            </ProjectEditButton>
            <ProjectDeleteButton onClick={() => handleDelete(index)}>
              Удалить
            </ProjectDeleteButton>
            
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.image && <img src={project.image} alt={project.title} style={{ maxWidth: '200px' }} />}
            
            {project.links ? (
              <div>
                {project.links.map((link, linkIndex) => (
                  <div key={linkIndex}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            ) : project.link ? (
              <div>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.linkText}
                </a>
              </div>
            ) : null}
          </ProjectCard>
        ))}
        
        <AddButton onClick={handleAdd}>
          + Добавить новый проект
        </AddButton>
      </EditContainer>

      {showModal && (
        <Modal>
          <ModalContent>
            <h3>{editIndex === -1 ? 'Добавить проект' : 'Редактировать проект'}</h3>
            
            <Input
              placeholder="Название проекта"
              value={editProject.title}
              onChange={(e) => setEditProject({...editProject, title: e.target.value})}
            />
            
            <TextArea
              placeholder="Описание проекта"
              value={editProject.description}
              onChange={(e) => setEditProject({...editProject, description: e.target.value})}
            />
            
            <Input
              placeholder="Путь к изображению (например, /image.png)"
              value={editProject.image}
              onChange={(e) => setEditProject({...editProject, image: e.target.value})}
            />
            
            <h4>Ссылки:</h4>
            {(editProject.links || []).map((link, index) => (
              <LinkItem key={index}>
                <Input
                  placeholder="Текст ссылки"
                  value={link.text}
                  onChange={(e) => updateLink(index, 'text', e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                />
                <DeleteButton onClick={() => removeLink(index)}>
                  Удалить
                </DeleteButton>
              </LinkItem>
            ))}
            
            <AddButton onClick={addLink}>
              + Добавить ссылку
            </AddButton>
            
            <div style={{ marginTop: '20px' }}>
              <Button onClick={handleSave}>Сохранить</Button>
              <CancelButton onClick={handleCancel}>Отмена</CancelButton>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EditablePortfolio;