import React, { useState, useEffect,  Suspense, lazy  } from 'react';
import { Typography, Collapse, Button, Image, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProgressBar from '../components/ProgressBar';
import PictureDonQuxote from '../assets/img/Don Quixote.jpg';
import AppPagination from '../components/Pagination';
import { FloatButton } from 'antd';
import '../assets/css/ReadingPage.css';
//import PDFTextExtractor from '../components/RenderPDF';
import {usePDFTextExtractor} from '../components/RenderPDF';
import axios from 'axios';
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;
const genreStyles = {
    fantasy: {
      backgroundColor: '#f4f0ec',
      color: '#3d2c29',
      fontFamily: "'Baskervville', serif",
      fontWeight: '400',
      textAlign: 'justify',
      
      
    },
    mystery: {
      backgroundColor: '#e3e4db',
      color: '#423d33',
    },
    romance: {
      backgroundColor: '#fff0f0',
      color: '#442c2e',
    },
    // Добавьте стили для других жанров
  };
  
const BookReadingPage = () => {
  
    const [currentGenre, setCurrentGenre] = useState('fantasy'); // Пример начального состояния
    //const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfText, setPdfText] = useState('');
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    usePDFTextExtractor("/для студентов 2024г. ПИ Методические рекомендации ДП .pdf", setPdfText);
     // Запрос URL PDF
  //    useEffect(() => {
  //     const fetchPdfUrl = async () => {
  //         try {
  //             const token = localStorage.getItem('accessToken');
  //             const selectedBookId = localStorage.getItem('selectedBookId');
              
  //         if (!token) {
  //         console.log('No token found, user is not authorized');
         
  //         return;
  //         }
  //         if (!selectedBookId) {
  //           console.log('No bookId found, user does not have this book');
           
  //           return;
  //           }
  //            // Добавляем токен в заголовки запроса
  //       const headers = {
  //         Authorization: `JWT ${token}`,
  //       };
  //       // Формируем URL для запроса данных отдельной книги
  //         const userBookUrl = `http://localhost:8000/api/marketplace/book/${selectedBookId}/`;
  //         const response = await axios.get(userBookUrl, { headers });    
  //         setPdfUrl(response.data.file); // Предполагаем, что API возвращает книгу с URL
  //         } catch (error) {
  //             console.error('Ошибка получения URL PDF:', error);
  //         }
  //     };

  //     fetchPdfUrl();
  // }, []);
  // useEffect(() => {
  //   if (pdfUrl) {
  //     console.log('setPdfURL', pdfUrl);
  //   }
  // }, [pdfUrl]); // Добавлен новый useEffect для отслеживания изменений pdfUrl
  // Обработка загруженного текста PDF
  useEffect(() => {
    if (pdfText) {
        const newChapters = splitTextIntoChapters(pdfText, 5000);
        setChapters(newChapters);
        setLoading(false);
    }
}, [pdfText]);

// Функция разбиения текста на главы, необходимо реализовать, чтобы если знак препинания не находится(даже с учетом 100 смиволов для поиска точки) то весь текст влоть до первой предыдущей точки остался в главе, а уже новое предложение было бы не разорваным, а с новой главы
function splitTextIntoChapters(text, charsPerChapter = 5000) {
  const results = [];
  let offset = 0;
  //const abbreviations = ['т.е.', 'т.д.', 'т.п.', 'пр.']; продумать над сокращениями(пока решено!)

  while (offset < text.length) {
    let end = offset + charsPerChapter;
    // Проверяем, не выходим ли мы за пределы текста
    if (end > text.length) end = text.length; 
    // Ищем ближайший знак препинания после предела charsPerChapter
    let boundary = Math.min(end + 100, text.length); // Даем запас символов для поиска точки
    let punctuation = false;
    for (let i = end; i < boundary; i++) {
      if (['.', '!', '?', ';'].includes(text[i]) && text[i + 1] === ' ' && text[i + 2] && text[i + 2] === text[i + 2].toUpperCase()) {
        end = i + 1; // Включаем знак препинания в текущую главу
        punctuation = true;
        break;
      }
    }
    
    if (!punctuation) { // Если подходящий знак препинания не найден
      for (let i = end; i >= offset; i--) { // Ищем начало предложения в обратном направлении
        if (['.', '!', '?', ';'].includes(text[i])) {
          end = i + 1;
          break;
        }
      }
    }

    let chapterContent = text.substring(offset, end).trim();
    //Убеждаемся, что после ; на новой главе текст будет начинаться с заглавной буквы
    if (chapterContent && chapterContent[0]) {
      chapterContent = chapterContent.charAt(0).toUpperCase() + chapterContent.slice(1);
    }

    // Добавляем главу с найденным куском текста
    results.push({
      title: `Глава ${results.length + 1}`,
      content: chapterContent
    });

    // Смещаем начало следующей главы
    offset = end;
  }

  return results;
}

if (loading) return <div>Loading...</div>;
        
          //setChapters(splitTextIntoChapters(pdfText));
          //setLoading(false);
      

//const handlePrevChapter = () => setCurrentChapter(Math.max(0, currentChapter - 1));
//const handleNextChapter = () => setCurrentChapter(Math.min(chapters.length - 1, currentChapter + 1));

// const renderChapterContent = (chapter) => (
//     <Paragraph>{chapter.content}</Paragraph>
// );
    // Допустим, у вас есть функция для получения жанра книги, возможно, из URL или контекста
  // useEffect(() => {
  //   const genre = fetchBookGenre();
  //   setCurrentGenre(genre);
  // }, []);
    const genreStyle = genreStyles[currentGenre]; // Получаем стиль для текущего жанра
  // Допустим, у вас есть массив глав, каждая глава - это объект с заголовком и содержанием

  return (
    
    <div className="book-reading-page" style={genreStyles}>
      
        <div style={{textAlign:'center'}}>
        <Image
            alt="example"
            src={PictureDonQuxote}
            height="20%"
            width="20%"               
          />

      <Title level={2}>Название Книги</Title></div>
      
      {!loading ? (
      <>{/*
        <Button icon={<LeftOutlined />} onClick={handlePrevChapter} disabled={currentChapter === 0} />
        <Button icon={<RightOutlined />} onClick={handleNextChapter} disabled={currentChapter === chapters.length - 1} />
      <ProgressBar current={currentChapter + 1} total={chapters.length} /> */}
        <Collapse defaultActiveKey={['0']}  style={{ fontFamily: "'Baskervville', serif", fontWeight: 'normal', color:'#121111', fontSize:'16px', textAlign:'justify', wordWrap:'break-word' }}>
                        {chapters.map((chapter, index) => (
                            <Panel header={chapter.title} key={index}>
                                 {chapter.content}
                            </Panel>
                        ))}
                    </Collapse>
      </>
    ) : (
      <p>Loading chapters...</p>
  )}

  <div style={{ marginTop: 20, textAlign: 'center' }}>
      <AppPagination/>
  </div>
  <FloatButton.BackTop/>
</div>
);
};
export default BookReadingPage;
