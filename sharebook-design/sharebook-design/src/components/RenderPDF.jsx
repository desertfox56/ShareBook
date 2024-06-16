import React, { useState, useEffect } from 'react';
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist/legacy/build/pdf.mjs'; 
// Указываем путь к worker для PDF.js
GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'; 
// Кастомный хук для извлечения текста из PDF-файла
export function usePDFTextExtractor(pdfUrl, setPdfText) {

// Функция для очистки текста от специальных символов   
function cleanText(text) {
    return text
      .replace(/[“”]/g, '"')
      .replace(/[\u2018\u2019]/g, "'") // Замена фигурных кавычек на прямые
      .replace(/[\u201C\u201D]/g, '"') // Замена фигурных двойных кавычек
      .replace(/\u2013/g, '-') // Замена длинных тире
      .replace(/\u2026/g, '...'); // Замена многоточий
  }

    // Используем эффект для извлечения текста из PDF
    useEffect(() => {
        const fetchPdfText = async () => {
            const loadingTask = getDocument(pdfUrl); // Загружаем PDF
            console.log('Запуск загрузки PDF:', pdfUrl);
            try {
                const pdf = await loadingTask.promise; // Ожидаем завершения загрузки PDF
                console.log('PDF загружен:', pdf);
                let fullText = ''; // Переменная для хранения полного текста
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum); // Получаем страницу PDF
                    const textContent = await page.getTextContent(); // Получаем текстовое содержимое страницы
                    const pageText = textContent.items.map(item => item.str).join(' '); // Соединяем текстовые элементы
                    fullText += cleanText(pageText) + ' '; // Добавляем очищенный текст страницы
                }
                setPdfText(fullText); // Устанавливаем полный текст в состояние
                console.log('Текст PDF обработан:', fullText);
            } catch (error) {
                console.error('Ошибка загрузки PDF: ', error);
            }
        };

        if (pdfUrl) {
            fetchPdfText(); // Запускаем извлечение текста, если URL PDF установлен
        } 
    }, [pdfUrl, setPdfText]); // Зависимости эффекта
    console.log('Текст PDF setPdfText:', setPdfText);    
};


