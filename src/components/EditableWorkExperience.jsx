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

const ResponsibilityItem = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  
  button {
    margin-left: 10px;
    padding: 4px 8px;
    font-size: 12px;
  }
`;

const JobCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  position: relative;
  
  &:hover {
    border-color: #3b82f6;
  }
`;

const JobEditButton = styled.button`
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
  
  &:hover {
    background: #2563eb;
  }
`;

const JobDeleteButton = styled.button`
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
  
  &:hover {
    background: #dc2626;
  }
`;

const EditableWorkExperience = ({ children, isEditMode, jobs, onUpdateJob, onAddJob, onDeleteJob, language }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editJob, setEditJob] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    responsibilities: []
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditJob(jobs[index]);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditIndex(-1);
    setEditJob({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: []
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editIndex === -1) {
      onAddJob(language, editJob);
    } else {
      onUpdateJob(language, editIndex, editJob);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditJob({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: []
    });
  };

  const handleDelete = (index) => {
    if (window.confirm('Удалить эту позицию?')) {
      onDeleteJob(language, index);
    }
  };

  const addResponsibility = () => {
    setEditJob({
      ...editJob,
      responsibilities: [...editJob.responsibilities, '']
    });
  };

  const updateResponsibility = (index, value) => {
    const newResponsibilities = [...editJob.responsibilities];
    newResponsibilities[index] = value;
    setEditJob({
      ...editJob,
      responsibilities: newResponsibilities
    });
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = editJob.responsibilities.filter((_, i) => i !== index);
    setEditJob({
      ...editJob,
      responsibilities: newResponsibilities
    });
  };

  if (!isEditMode) {
    return children;
  }

  return (
    <>
      <EditContainer data-edit-container>
        <EditButton onClick={handleAdd} data-edit-button>
          Добавить позицию
        </EditButton>
        
        {jobs.map((job, index) => (
          <JobCard key={index}>
            <JobEditButton onClick={() => handleEdit(index)} data-edit-button>
              Редактировать
            </JobEditButton>
            <JobDeleteButton onClick={() => handleDelete(index)} data-edit-button>
              Удалить
            </JobDeleteButton>
            
            <h3>{job.title}</h3>
            <p><strong>{job.company}</strong></p>
            <p>{job.startDate} - {job.endDate}</p>
            <ul>
              {job.responsibilities.map((resp, respIndex) => (
                <li key={respIndex} dangerouslySetInnerHTML={{ __html: resp }} />
              ))}
            </ul>
          </JobCard>
        ))}
        
        <AddButton onClick={handleAdd}>
          + Добавить новую позицию
        </AddButton>
      </EditContainer>

      {showModal && (
        <Modal>
          <ModalContent>
            <h3>{editIndex === -1 ? 'Добавить позицию' : 'Редактировать позицию'}</h3>
            
            <Input
              placeholder="Должность"
              value={editJob.title}
              onChange={(e) => setEditJob({...editJob, title: e.target.value})}
            />
            
            <Input
              placeholder="Компания"
              value={editJob.company}
              onChange={(e) => setEditJob({...editJob, company: e.target.value})}
            />
            
            <Input
              placeholder="Дата начала (например, 2024-01)"
              value={editJob.startDate}
              onChange={(e) => setEditJob({...editJob, startDate: e.target.value})}
            />
            
            <Input
              placeholder="Дата окончания (например, present)"
              value={editJob.endDate}
              onChange={(e) => setEditJob({...editJob, endDate: e.target.value})}
            />
            
            <h4>Обязанности:</h4>
            {editJob.responsibilities.map((resp, index) => (
              <ResponsibilityItem key={index}>
                <TextArea
                  placeholder="Описание обязанности"
                  value={resp}
                  onChange={(e) => updateResponsibility(index, e.target.value)}
                />
                <DeleteButton onClick={() => removeResponsibility(index)}>
                  Удалить
                </DeleteButton>
              </ResponsibilityItem>
            ))}
            
            <AddButton onClick={addResponsibility}>
              + Добавить обязанность
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

export default EditableWorkExperience;