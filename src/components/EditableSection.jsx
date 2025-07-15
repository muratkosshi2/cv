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
  z-index: 999!important;
  
  &:hover {
    background: #2563eb;
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
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

const EditableSection = ({ children, isEditMode, onEdit, title, type = 'text' }) => {
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEdit = () => {
    if (type === 'html') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = children.props.dangerouslySetInnerHTML.__html;
      setEditValue(tempDiv.innerHTML);
    } else {
      setEditValue(children.props.children || '');
    }
    setShowModal(true);
  };

  const handleSave = () => {
    onEdit(editValue);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditValue('');
  };

  if (!isEditMode) {
    return children;
  }

  return (
    <>
      <EditContainer data-edit-container>
        <EditButton onClick={handleEdit} data-edit-button>
          Редактировать
        </EditButton>
        {children}
      </EditContainer>

      {showModal && (
        <Modal>
          <ModalContent>
            <h3>Редактировать {title}</h3>
            <TextArea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Введите текст..."
            />
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

export default EditableSection;