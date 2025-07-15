import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const AdminButton = styled.button`
  background: ${props => props.isActive ? '#ef4444' : '#3b82f6'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${props => props.isActive ? '#dc2626' : '#2563eb'};
  }
`;

const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const LoginForm = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  min-width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
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

const AdminPanel = ({ isEditMode, onToggleEditMode, onSaveChanges, onResetData, onExportData, onImportData }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setShowLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    onToggleEditMode(false);
  };

  const handleToggleEdit = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      onToggleEditMode(!isEditMode);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onImportData(data);
        } catch (err) {
          alert('Ошибка при импорте файла');
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminContainer>
        <AdminButton onClick={handleToggleEdit}>
          Админ
        </AdminButton>
        
        {showLogin && (
          <LoginModal>
            <LoginForm>
              <h3>Вход в админ-панель</h3>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
              <Button onClick={handleLogin}>Войти</Button>
              <Button onClick={() => setShowLogin(false)}>Отмена</Button>
            </LoginForm>
          </LoginModal>
        )}
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <AdminButton isActive={isEditMode} onClick={handleToggleEdit}>
          {isEditMode ? 'Выйти из редактирования' : 'Редактировать'}
        </AdminButton>
        
        {isEditMode && (
          <>
            <Button onClick={onSaveChanges}>Сохранить</Button>
            <Button onClick={onResetData}>Сбросить</Button>
            <Button onClick={onExportData}>Экспорт</Button>
            <label>
              <Button as="span">Импорт</Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </>
        )}
        
        <AdminButton onClick={handleLogout}>
          Выйти
        </AdminButton>
      </div>
    </AdminContainer>
  );
};

export default AdminPanel;