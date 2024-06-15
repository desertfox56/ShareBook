import {React, useEffect} from 'react';
import { Cascader } from 'antd';
import { Slider } from 'antd';
import { Typography, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../assets/css/Filter.css';
import { useFilters } from '../context/FiltersContext';
const { SHOW_CHILD } = Cascader;
const {Title} = Typography;

function Filter() {
  const { filters, updateFilters, fetchFilteredBooks, fetchMetadata } = useFilters();
  console.log("Context filters:", filters);

  // Обработчик изменения фильтров
  const handleFilterChange = (value, filterName) => {
    // Обновляем состояние фильтров
    updateFilters({ ...filters, [filterName]: value });
  }; 

  // Применяем фильтры
  const applyFilters = () => {
    // Формируем строку параметров запроса
    const queryParams = new URLSearchParams({
      genre: filters.genres.join(','),
      language: filters.languages.join(','),
      author: filters.authors.join(','),
      age_restriction__gte: filters.ageRange[0],
      age_restriction__lte: filters.ageRange[1],
      price_gte: filters.priceRange[0],
      price_lte: filters.priceRange[1]
    }).toString();

    // Отправляем запрос на сервер для получения отфильтрованных книг
    fetchFilteredBooks(queryParams);
    console.log("fetchFilteredBooks:", fetchFilteredBooks);
  };
  // Эффект для получения метаданных при монтировании компонента
  useEffect(() => {
    fetchMetadata();
  }, []);
  return (
    <div className='Filter'>
      <Title level={2} className='FilterName'>Категории</Title>
    <Title level={3} className='FilterName'>Жанр</Title>
      <Cascader
        style={{ width: '30%' }}
        options={filters.genreData}
        onChange={(value) => handleFilterChange(value, 'genres')}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}      
      /> 
      <br />
      <br />
      <Title level={3} className='FilterName1'>Язык</Title>
      <Cascader
        style={{ width: '30%' }}
        options={filters.languageData}
        onChange={(value) => handleFilterChange(value, 'languages')}
        multiple
        maxTagCount="responsive"
      />
      <Title level={3} className='FilterName'>Автор</Title>
      <Cascader
        style={{ width: '30%' }}
        options={filters.authorData}
        onChange={(value) => handleFilterChange(value, 'authors')}
        multiple
        maxTagCount="responsive"
      />

      <Title level={4} className='FilterName'>Возраст</Title>
      <Slider range={{ draggableTrack: true }} defaultValue={filters.ageRange}
                onChange={(value) => handleFilterChange(value, 'ageRange')}
                min={0}
                max={100} style={{ width: '30%' }} />
           
      <Button icon={<SearchOutlined />} onClick={applyFilters}>Найти</Button>
    </div>
  );
}

export default Filter;
