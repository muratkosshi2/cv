import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId = 'root', filename = 'resume') => {
  try {
    // Найти элемент для экспорта
    const element = document.getElementById(elementId) || document.body;
    
    // Временно скрыть админ-панель для экспорта
    const adminPanel = document.querySelector('[data-admin-panel]');
    const originalAdminDisplay = adminPanel ? adminPanel.style.display : null;
    if (adminPanel) {
      adminPanel.style.display = 'none';
    }

    // Временно скрыть кнопки редактирования
    const editButtons = document.querySelectorAll('[data-edit-button]');
    const originalEditButtonsDisplay = [];
    editButtons.forEach((button, index) => {
      originalEditButtonsDisplay[index] = button.style.display;
      button.style.display = 'none';
    });

    // Временно скрыть пунктирные рамки редактирования
    const editContainers = document.querySelectorAll('[data-edit-container]');
    const originalEditContainersStyle = [];
    editContainers.forEach((container, index) => {
      originalEditContainersStyle[index] = container.style.border;
      container.style.border = 'none';
    });

    // Создать canvas из HTML
    const canvas = await html2canvas(element, {
      scale: 2, // Увеличить масштаб для лучшего качества
      useCORS: true, // Разрешить загрузку изображений с других доменов
      allowTaint: true,
      backgroundColor: '#0F172A', // Установить фон
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });

    // Восстановить админ-панель
    if (adminPanel && originalAdminDisplay !== null) {
      adminPanel.style.display = originalAdminDisplay;
    }

    // Восстановить кнопки редактирования
    editButtons.forEach((button, index) => {
      button.style.display = originalEditButtonsDisplay[index] || '';
    });

    // Восстановить стили редактирования
    editContainers.forEach((container, index) => {
      container.style.border = originalEditContainersStyle[index] || '';
    });

    // Создать PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Рассчитать размеры для A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Масштабировать изображение под A4
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    
    // Центрировать изображение
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    // Если изображение слишком высокое, разбить на страницы
    if (scaledHeight > pdfHeight) {
      let position = 0;
      const pageHeight = pdfHeight;
      
      while (position < scaledHeight) {
        if (position > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData,
          'PNG',
          x,
          -position,
          scaledWidth,
          scaledHeight
        );
        
        position += pageHeight;
      }
    } else {
      pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    }

    // Сохранить PDF
    pdf.save(`${filename}.pdf`);
    
    return { success: true, message: 'PDF успешно создан' };
  } catch (error) {
    console.error('Ошибка при создании PDF:', error);
    return { success: false, message: 'Ошибка при создании PDF: ' + error.message };
  }
};

// Экспорт только видимой части страницы
export const exportVisibleToPDF = async (filename = 'resume') => {
  try {
    // Временно скрыть админ-панель
    const adminPanel = document.querySelector('[data-admin-panel]');
    const originalAdminDisplay = adminPanel ? adminPanel.style.display : null;
    if (adminPanel) {
      adminPanel.style.display = 'none';
    }

    // Найти основной контейнер резюме
    const resumeContainer = document.querySelector('[data-resume-container]') || 
                           document.querySelector('.resume-container') ||
                           document.body;

    const canvas = await html2canvas(resumeContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0F172A',
      width: resumeContainer.scrollWidth,
      height: resumeContainer.scrollHeight
    });

    // Восстановить админ-панель
    if (adminPanel && originalAdminDisplay !== null) {
      adminPanel.style.display = originalAdminDisplay;
    }

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    pdf.save(`${filename}.pdf`);
    
    return { success: true, message: 'PDF успешно создан' };
  } catch (error) {
    console.error('Ошибка при создании PDF:', error);
    return { success: false, message: 'Ошибка при создании PDF: ' + error.message };
  }
};