import {React,useState, useMemo, useEffect} from 'react';
import { Cascader } from 'antd';
import { Slider } from 'antd';
import { Typography, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../assets/css/Filter.css';
import axios from 'axios';
import { useFilters } from '../context/FiltersContext';
const { SHOW_CHILD } = Cascader;
const {Title} = Typography;

function Filter() {
  const { filters, updateFilters, fetchFilteredBooks, fetchMetadata } = useFilters();
  console.log("Context filters:", filters);


  const handleFilterChange = (value, filterName) => {
    console.log("После нажатия:", filters);
    updateFilters({ ...filters, [filterName]: value });
    console.log("UpdateFilters:", updateFilters);
  };  

  const applyFilters = () => {
    console.log("applyFilters:", updateFilters);
    const queryParams = new URLSearchParams({
      genre: filters.genres.join(','),
      language: filters.languages.join(','),
      author: filters.authors.join(','),
      age_restriction_gte: filters.ageRange[0],
      age_restriction_lte: filters.ageRange[1],
      price_gte: filters.priceRange[0],
      price_lte: filters.priceRange[1]
    }).toString();

    fetchFilteredBooks(queryParams);
    console.log("fetchFilteredBooks:", fetchFilteredBooks);
  };
  useEffect(() => {
    fetchMetadata();
  }, []);
  return (
    <div className='Filter'>
      <Title level={2}>Категории</Title>
    <Title level={3}>Жанр</Title>
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
      <Title level={3}>Язык</Title>
      <Cascader
        style={{ width: '30%' }}
        options={filters.languageData}
        onChange={(value) => handleFilterChange(value, 'languages')}
        multiple
        maxTagCount="responsive"
        //defaultValue={['russian']}
      />
      <Title level={3}>Автор</Title>
      <Cascader
        style={{ width: '30%' }}
        options={filters.authorData}
        onChange={(value) => handleFilterChange(value, 'authors')}
        multiple
        maxTagCount="responsive"
      />

      <Title level={4}>Возраст</Title>
      <Slider range={{ draggableTrack: true }} defaultValue={filters.ageRange}
                onChange={(value) => handleFilterChange(value, 'ageRange')}
                min={0}
                max={100} style={{ width: '30%' }} />
      <Title level={4}>Цена</Title>
      <Slider range={{ draggableTrack: true }} defaultValue={filters.priceRange} style={{ width: '30%' }} 
                onChange={(value) => handleFilterChange(value, 'priceRange')}
                min={0}
                max={1000}/>
      <Button icon={<SearchOutlined />} onClick={applyFilters}>Найти</Button>
    </div>
  );
}

export default Filter;
