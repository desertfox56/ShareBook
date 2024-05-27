import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (value) => {
        if (!value.trim()) {
            setSearchResults([]);
            setIsSearched(false);
            return;
        }

        setIsSearched(true);
        const apiUrl = 'http://localhost:8000/api/marketplace/search';
        const params = { title: value };

        axios.get(apiUrl, { params })
            .then(response => {
                setSearchResults(response.data.results || []);
                setIsSearched(true); // Это должно вызвать перерисовку, если используется для рендеринга
                console.log('Переход на страницу результатов');
                navigate('/search-results/');
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