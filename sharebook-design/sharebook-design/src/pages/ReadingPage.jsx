import React, { useState, useEffect  } from 'react';
import { Typography, Collapse,  Image } from 'antd';
import { FloatButton } from 'antd';
import '../assets/css/ReadingPage.css';
import {usePDFTextExtractor} from '../components/RenderPDF';
import axios from 'axios';
const { Panel } = Collapse;
const { Title } = Typography;
// Определяем стили для различных жанров
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
    // Добавить стили для других жанров!
  };
  
const BookReadingPage = () => {
  
    // Состояния компонента
    const [currentGenre, setCurrentGenre] = useState('fantasy'); // Текущий жанр книги
    const [pdfUrl, setPdfUrl] = useState(null); // URL PDF файла книги
    const [pdfText, setPdfText] = useState(''); // Текст, извлечённый из PDF
    const [chapters, setChapters] = useState([]);  // Главы книги
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [data, setData] = useState({ book: { image: '', title: '' } }); // Данныe книги

      // Эффект для получения URL PDF
      useEffect(() => {
       const fetchPdfUrl = async () => {
           try {
               const token = localStorage.getItem('accessToken');
               const selectedBookId = localStorage.getItem('selectedBookId');
              
           if (!token) {
           console.log('No token found, user is not authorized');
         
           return;
           }
           if (!selectedBookId) {
             console.log('No bookId found, user does not have this book');
           
             return;
             }
              // Добавляем токен в заголовки запроса
         const headers = {
           Authorization: `JWT ${token}`,
         };
         // Формируем URL для запроса данных отдельной книги
           const userBookUrl = `${process.env.REACT_APP_API_URL}/marketplace/book/${selectedBookId}/`;

           const response = await axios.get(userBookUrl, { headers });    
 
           setPdfUrl(response.data.file); // // Сохраняем URL PDF файла
           setData({ book: response.data }); // Сохраняем данные книги в состояние
           } catch (error) {
               console.error('Ошибка получения URL PDF:', error);
           }
       };

       fetchPdfUrl();
   }, []);
// Используем хук для извлечения текста из PDF
usePDFTextExtractor(pdfUrl, setPdfText);

// Эффект для отслеживания изменений pdfUrl
   useEffect(() => {
     if (pdfUrl) {
       console.log('setPdfURL', pdfUrl);
     }
   }, [pdfUrl]); // Добавлен новый useEffect для отслеживания изменений pdfUrl

  // Обработка загруженного текста PDF
  useEffect(() => {
    if (pdfText) {
        //Разбиваем текст PDF файла на главы/страницы по 5000 символов каждый
        const newChapters = splitTextIntoChapters(pdfText, 5000);
        setChapters(newChapters);
        setLoading(false);
    }
}, [pdfText]);

// Функция разбиения текста на страницы
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
    
    if (!punctuation) { // Если подходящий знак препинания не найден, ищем начало предложения в обратном направлении
      for (let i = end; i >= offset; i--) { 
        if (['.', '!', '?', ';'].includes(text[i])) {
          end = i + 1;
          break;
        }
      }
    }

    let chapterContent = text.substring(offset, end).trim();
    //Убеждаемся, что после ; на новой странице текст будет начинаться с заглавной буквы
    if (chapterContent && chapterContent[0]) {
      chapterContent = chapterContent.charAt(0).toUpperCase() + chapterContent.slice(1);
    }

    // Добавляем страницу с найденным куском текста
    results.push({
      title: `Страница ${results.length + 1}`,
      content: chapterContent
    });

    // Смещаем начало следующей страницы
    offset = end;
  }

  return results;
}

// Если происходит загрузка, отображаем сообщение о загрузке
if (loading) return <div>Loading...</div>;        
const genreStyle = genreStyles[currentGenre]; // Получаем стиль для текущего жанра

  return (
    
    <div className="book-reading-page" style={genreStyles}>
      
        <div style={{textAlign:'center'}}>
        <Image
            alt="example"
            src={data.book.image}
            height="20%"
            width="20%"               
          /> {/* Обложка книги */}

      <Title level={2}>{data.book.title}</Title></div> {/*Название книги*/}
      {/* Загрузка текста книги с помощью компонента Collapse*/}
      {!loading ? (
      <>
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

    <FloatButton.BackTop/> {/* Кнопка для возвращения на начало страницы*/}
</div>
);
};
export default BookReadingPage;
