import React, { useState, useEffect } from 'react';
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist/legacy/build/pdf.mjs'; 
//import Tesseract from 'tesseract.js';
//import Tesseract from 'tesseract.js-core/tesseract-core';
GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'; 

export function usePDFTextExtractor(pdfUrl, setPdfText) {

    
function cleanText(text) {
    return text
      .replace(/[“”]/g, '"')
      .replace(/[\u2018\u2019]/g, "'") // Replace fancy quotes with straight quotes
      .replace(/[\u201C\u201D]/g, '"') // Replace fancy double quotes
      .replace(/\u2013/g, '-') // Replace long dashes
      .replace(/\u2026/g, '...'); // Replace ellipses
  }
    
    useEffect(() => {
        const fetchPdfText = async () => {
            const loadingTask = getDocument(pdfUrl);
            console.log('Запуск загрузки PDF:', pdfUrl);
            try {
                const pdf = await loadingTask.promise;
                console.log('PDF загружен:', pdf);
                let fullText = '';
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += cleanText(pageText) + ' '; // Append cleaned text from each page
                }
                setPdfText(fullText);
                console.log('Текст PDF обработан:', fullText);
            } catch (error) {
                console.error('Ошибка загрузки PDF: ', error);
            }
        };

        if (pdfUrl) {
            fetchPdfText();
        } 
    }, [pdfUrl, setPdfText]); console.log('Текст PDF setPdfText:', setPdfText);

    
};


