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
  max-width: 600px;
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

const SkillCard = styled.div`
  display: inline-block;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin: 8px;
  position: relative;
  min-width: 150px;
  
  &:hover {
    border-color: #3b82f6;
  }
`;

const SkillEditButton = styled.button`
  position: absolute;
  top: 4px;
  right: 25px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 10px;
  cursor: pointer;
  
  &:hover {
    background: #2563eb;
  }
`;

const SkillDeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 10px;
  cursor: pointer;
  
  &:hover {
    background: #dc2626;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const EditableSkills = ({ children, isEditMode, skills, onUpdateSkill, onAddSkill, onDeleteSkill, language }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editSkill, setEditSkill] = useState({
    name: '',
    icon: ''
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditSkill(skills[index]);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditIndex(-1);
    setEditSkill({
      name: '',
      icon: 'fas fa-code'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editIndex === -1) {
      onAddSkill(language, editSkill);
    } else {
      onUpdateSkill(language, editIndex, editSkill);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditSkill({
      name: '',
      icon: ''
    });
  };

  const handleDelete = (index) => {
    if (window.confirm('Удалить этот навык?')) {
      onDeleteSkill(language, index);
    }
  };

  if (!isEditMode) {
    return children;
  }

  return (
    <>
      <EditContainer>
        <EditButton onClick={handleAdd}>
          Добавить навык
        </EditButton>
        
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard key={index}>
              <SkillEditButton onClick={() => handleEdit(index)}>
                Ред
              </SkillEditButton>
              <SkillDeleteButton onClick={() => handleDelete(index)}>
                ×
              </SkillDeleteButton>
              
              <div style={{ marginTop: '20px' }}>
                <i className={skill.icon} style={{ marginRight: '8px' }}></i>
                {skill.name}
              </div>
            </SkillCard>
          ))}
        </SkillsGrid>
        
        <AddButton onClick={handleAdd}>
          + Добавить новый навык
        </AddButton>
      </EditContainer>

      {showModal && (
        <Modal>
          <ModalContent>
            <h3>{editIndex === -1 ? 'Добавить навык' : 'Редактировать навык'}</h3>
            
            <Input
              placeholder="Название навыка"
              value={editSkill.name}
              onChange={(e) => setEditSkill({...editSkill, name: e.target.value})}
            />
            
            <Input
              placeholder="CSS класс иконки (например, fas fa-code)"
              value={editSkill.icon}
              onChange={(e) => setEditSkill({...editSkill, icon: e.target.value})}
            />
            
            <div style={{ margin: '16px 0' }}>
              <strong>Предпросмотр:</strong>
              <div style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '8px' }}>
                <i className={editSkill.icon} style={{ marginRight: '8px' }}></i>
                {editSkill.name || 'Название навыка'}
              </div>
            </div>
            
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

export default EditableSkills;