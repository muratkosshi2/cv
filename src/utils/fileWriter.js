// Функция для записи данных в JSON файлы
export const saveDataToFiles = async (data) => {
  try {
    // Сохранение данных для каждого языка
    const languages = ['en', 'ru', 'kz'];
    
    for (const lang of languages) {
      if (data[lang]) {
        const jsonData = JSON.stringify(data[lang], null, 2);
        
        // Создаем Blob и скачиваем файл
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${lang}.json`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Небольшая задержка между скачиваниями
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении файлов:', error);
    return false;
  }
};

// Функция для создания резервной копии всех данных
export const createBackup = (data) => {
  const backupData = {
    timestamp: new Date().toISOString(),
    data: data
  };
  
  const jsonData = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resume-backup-${new Date().getTime()}.json`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Функция для автоматического сохранения изменений
export const autoSaveToFiles = async (data) => {
  // Создаем резервную копию
  createBackup(data);
  
  // Сохраняем файлы локалей
  const success = await saveDataToFiles(data);
  
  if (success) {
    console.log('Данные автоматически сохранены в файлы');
    return true;
  } else {
    console.error('Ошибка при автоматическом сохранении');
    return false;
  }
};