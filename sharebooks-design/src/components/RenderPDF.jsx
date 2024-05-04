import React, { useState, useEffect } from 'react';
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist/legacy/build/pdf.mjs'; 
//import Tesseract from 'tesseract.js';
//import Tesseract from 'tesseract.js-core/tesseract-core';
GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'; 

const PDFTextExtractor = ({ pdfUrl }) => {
    const [pdfText, setPdfText] = useState('');
    
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
            try {
                const pdf = await loadingTask.promise;
                let fullText = '';
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += cleanText(pageText) + ' '; // Append cleaned text from each page
                }
                setPdfText(fullText);
            } catch (error) {
                console.error('Error loading PDF: ', error);
            }
        };

        fetchPdfText();
    }, [pdfUrl]);

    return (
        <div>
            {pdfText ? <p>{pdfText}</p> : <p>Loading PDF content...</p>}
            
        </div>
    );
};

export default PDFTextExtractor;
