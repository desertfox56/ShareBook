import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
// Создаем контекст фильтров
const FiltersContext = createContext();
// Хук для использования контекста фильтров
export const useFilters = () => useContext(FiltersContext);
// Провайдер для контекста фильтров
export const FiltersProvider = ({ children }) => {
    // Состояние фильтров и их начальные значения
    const [filters, setFilters] = useState({
        genres: [], //Жанры
        languages: [], // Языки
        authors: [], // Авторы
        ageRange: [0, 100], // Возрастной диапозон
        priceRange: [0, 1000], // Ценовой диапозон
        genreData: [], // Данные о жанрах
        languageData: [], // Данные о языках
        authorData: [] // Данные об авторах
    }); 
    // Состояние для хранения отфильтрованных книг
    const [filteredBooks, setFilteredBooks] = useState([]);
    // Функция для обновления фильтров
    const updateFilters = useCallback((newFilters) => {
                setFilters(prevFilters => {
            console.log("Updating filters with:", newFilters);
            const updatedFilters = { ...prevFilters, ...newFilters };
            return updatedFilters;
        });
    }, []);
    // Функция для получения отфильтрованных книг с сервера
    const fetchFilteredBooks = useCallback((filterParams) => {
                axios.get(`${process.env.REACT_APP_API_URL}/marketplace/Filter/?${filterParams}`)
            
            .then(response => {
                                setFilteredBooks(response.data.results);
            })
            
            .catch(error => console.error('Error fetching filtered books:', error));
            
    }, []);
    // Функция для получения метаданных (жанры, языки, авторы) с сервера
    const fetchMetadata = useCallback(() => {
              Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/marketplace/genres/`),
        axios.get(`${process.env.REACT_APP_API_URL}/marketplace/languages/`),
        axios.get(`${process.env.REACT_APP_API_URL}/marketplace/authors/`)
      ]).then(([genreRes, languageRes, authorRes]) => {
               const newFilters = {
            genreData: genreRes.data.results.map(g => ({ label: g.name, value: g.id })),
            languageData: languageRes.data.results.map(l => ({ label: l.name, value: l.id })),
            authorData: authorRes.data.results.map(a => ({
                label: a.full_name,
                value: a.id
              }))
        };
         // Обновляем фильтры новыми данными
        updateFilters(newFilters);

      }).catch(error => {
              });
    }, [updateFilters]); 

    // Эффект для первоначального получения метаданных при монтировании компонента
    useEffect(() => {
      fetchMetadata();
    }, [fetchMetadata]);

    return (
        <FiltersContext.Provider value={{ 
          filters, 
          filteredBooks, 
          updateFilters, 
          fetchFilteredBooks,
          fetchMetadata 
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

