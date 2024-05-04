import React from 'react';
import PDFTextExtractor from '../components/RenderPDF';
//Когда подключу сервер, дописать axios с учетом получения ссылки на пдф из базы данных.
function RenderPDF  ()  {
    return(
        <PDFTextExtractor pdfUrl="/для студентов 2024г. ПИ Методические рекомендации ДП .pdf" />

    );
};
export default RenderPDF;
