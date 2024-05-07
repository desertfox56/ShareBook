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
    }); console.log("setFilters:", setFilters);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const updateFilters = useCallback((newFilters) => {
        console.log('Attempting to update filters with:', newFilters);
        setFilters(prevFilters => {
            console.log("Updating filters with:", newFilters);
            const updatedFilters = { ...prevFilters, ...newFilters };
            console.log('Filters updated to:', updatedFilters);
            return updatedFilters;
        });
    }, []);

    const fetchFilteredBooks = useCallback((filterParams) => {
        console.log('Fetching filtered books with params:', filterParams);
        axios.get(`http://localhost:8000/api/marketplace/Filter/?${filterParams}`)
            
            .then(response => {
                console.log('Filtered books received:', response.data.results);
                setFilteredBooks(response.data.results);
            })
            
            .catch(error => console.error('Error fetching filtered books:', error));
            
    }, []);

    const fetchMetadata = useCallback(() => {
        console.log('Fetching metadata for genres, languages, and authors');
      Promise.all([
        axios.get('http://localhost:8000/api/marketplace/genres/'),
        axios.get('http://localhost:8000/api/marketplace/languages/'),
        axios.get('http://localhost:8000/api/marketplace/authors/')
      ]).then(([genreRes, languageRes, authorRes]) => {
        console.log('Author data before processing:', authorRes.data.results);
        const newFilters = {
            genreData: genreRes.data.results.map(g => ({ label: g.name, value: g.id })),
            languageData: languageRes.data.results.map(l => ({ label: l.name, value: l.id })),
            authorData: authorRes.data.results.map(a => ({
                label: a.full_name,
                value: a.id
              }))
        };
        console.log('Metadata fetched and processed:', newFilters);
        updateFilters(newFilters);

      }).catch(error => {
        console.error('Error fetching metadata:', error);
      });
    }, [updateFilters]); console.log("UpdateFilters:", updateFilters);

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

