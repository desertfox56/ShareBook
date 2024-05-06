// FiltersContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        genres: [],
        languages: [],
        authors: [],
        ageRange: [0, 100],
        priceRange: [0, 1000],
        genreData: [],
        languageData: [],
        authorData: []
    });
    const [filteredBooks, setFilteredBooks] = useState([]);

    const updateFilters = useCallback((newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    }, []);

    const fetchFilteredBooks = useCallback((filterParams) => {
        axios.get(`http://localhost:8000/api/marketplace/Filter/?${filterParams}`)
            .then(response => setFilteredBooks(response.data.results))
            .catch(error => console.error('Error fetching filtered books:', error));
    }, []);

    const fetchMetadata = useCallback(() => {
      Promise.all([
        axios.get('http://localhost:8000/api/marketplace/genres/'),
        axios.get('http://localhost:8000/api/marketplace/languages/'),
        axios.get('http://localhost:8000/api/marketplace/authors/')
      ]).then(([genreRes, languageRes, authorRes]) => {
        updateFilters({
          genreData: genreRes.data.results.map(g => ({ label: g.name, value: g.id })),
          languageData: languageRes.data.results.map(l => ({ label: l.name, value: l.id })),
          authorData: authorRes.data.results.map(a => ({ label: `${a.first_name} ${a.second_name}`, value: a.id }))
        });
      }).catch(error => {
        console.error('Error fetching metadata:', error);
      });
    }, [updateFilters]);

    // Fetch metadata initially and on any major changes that would require refetching
    useEffect(() => {
      fetchMetadata();
    }, [fetchMetadata]);

    return (
        <FiltersContext.Provider value={{ 
          filters, 
          filteredBooks, 
          updateFilters, 
          fetchFilteredBooks,
          fetchMetadata // Make sure to provide this method to allow manual refresh/re-fetching
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

