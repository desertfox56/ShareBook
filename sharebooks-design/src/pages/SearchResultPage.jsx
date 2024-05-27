import React from 'react';
import { useSearch } from '../context/searchContext';
import ResultSearchBooks from '../components/ResultSearchBooks';
import { Typography } from 'antd';
const { Title } = Typography;
function SearchResultsPage() {
    const { searchResults, isSearched } = useSearch();
    

    if (!isSearched) {
        return <div>Введите запрос в поисковую строку.</div>;
    }

    return (
        <div>
            {searchResults.length > 0 ? (
                <div className='searchResults' style={{marginTop:'20px',marginBottom:'20px'}}>
                <Title level={3} style={{textAlign:'center'}}>Результаты поиска:</Title>
                <ResultSearchBooks books={searchResults} /></div>
            ) : (
                <div>По вашему запросу ничего не найдено.</div>
            )}
        </div>
    );
}

export default SearchResultsPage;
