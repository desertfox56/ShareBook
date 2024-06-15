import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Создаем контекст для поиска
const SearchContext = createContext();
// Хук для использования контекста поиска
export const useSearch = () => useContext(SearchContext);
// Провайдер для контекста поиска
export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]); // Состояние для хранения результатов поиска
    const [isSearched, setIsSearched] = useState(false); // Состояние для указания, был ли выполнен поиск
    const navigate = useNavigate(); // Хук для навигации

    // Обработчик поиска
    const handleSearch = (value) => {
        // Проверяем, не является ли запрос пустым
        if (!value.trim()) {
            setSearchResults([]);
            setIsSearched(false);
            return;
        }
        // Устанавливаем состояние, что поиск выполнен
        setIsSearched(true);
        const apiUrl = `${process.env.REACT_APP_API_URL}/marketplace/search`;
        const params = { title: value };
        // Отправляем GET запрос на сервер для поиска
        axios.get(apiUrl, { params })
            .then(response => {
                setSearchResults(response.data.results || []);
                setIsSearched(true); // Устанавливаем состояние, что поиск выполнен
                navigate('/search-results/'); // Перенаправляем пользователя на страницу результатов поиска
            })
            .catch(error => {
                console.error('Error during search:', error);
                setSearchResults([]);
                setIsSearched(false);
            });
    };

    return (
        <SearchContext.Provider value={{
            searchResults,
            isSearched,
            setSearchResults,
            setIsSearched,
            handleSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};