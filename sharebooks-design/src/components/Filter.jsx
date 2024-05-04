import {React,useState, useMemo, useEffect} from 'react';
import { Cascader } from 'antd';
import { Slider } from 'antd';
import { Typography, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../assets/css/Filter.css';
import axios from 'axios';
// Константа для стратегии отображения выбранных элементов
const { SHOW_CHILD } = Cascader;
const {Title} = Typography;

function Filter() {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [ageRange, setAgeRange] = useState([0, 60]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [filters, setFilters] = useState({
    genre: null,
    language: null,
    author: null,
});

  useEffect(() => {
    async function fetchData() {
      
        const response = await axios.get('http://localhost:8000/api/marketplace/allbooks/');
        if (response.data && response.data.results) {
          setGenres([...new Set(response.data.results.map(book => ({ label: book.genre_name, value: book.genre })))]);
          setLanguages([...new Set(response.data.results.map(book => ({ label: book.language_name, value: book.language })))]);
          setAuthors([...new Set(response.data.results.map(book => ({ label: book.author_name, value: book.author })))]);
          //setAge([...new Set(response.data.results.map(book => ({label: book.age_restriction, value: book.age})))]);
          
      } else {
          console.error('Unexpected response structure:', response.data);
      }
  }
    fetchData();
  }, []);

  const filteredAuthors = useMemo(() => {
    return authors.filter(author => author.value === selectedAuthor);
  }, [authors, selectedAuthor]);

  // Функция для обработки выбора
  const handleFilterChange = (value, field) => {
    setFilters(prev => ({ ...prev, [field]: value }));
};
const applyFilters = () => {
    console.log('Applying filters:', filters);
    console.log('Age Range:', ageRange);
    console.log('Price Range:', priceRange);
    // Here you might fetch filtered data from the backend or filter locally
};
const onChangeAuthor = (value, selectedOptions) => {
    setSelectedAuthor(value);
  };

  return (
    <div className='Filter'>
      <Title level={2}>Категории</Title>
    <Title level={3}>Жанр</Title>
      <Cascader
        style={{ width: '30%' }}
        options={genres}
        onChange={(value) => handleFilterChange(value, 'genre')}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
      />
      <br />
      <br />
      <Title level={3}>Язык</Title>
      <Cascader
        style={{ width: '30%' }}
        options={languages}
        onChange={(value) => handleFilterChange(value, 'language')}
        multiple
        maxTagCount="responsive"
        defaultValue={['russian']}
      />
      <Title level={3}>Автор</Title>
      <Cascader
        style={{ width: '30%' }}
        options={authors}
        onChange={(value) => handleFilterChange(value, 'author')}
        multiple
        maxTagCount="responsive"
      />

      <Title level={4}>Возраст</Title>
      <Slider range={{ draggableTrack: true }} defaultValue={ageRange}
                onChange={setAgeRange}
                min={0}
                max={100} style={{ width: '30%' }} />
      <Title level={4}>Цена</Title>
      <Slider range={{ draggableTrack: true }} defaultValue={[0, 50]} style={{ width: '30%' }} 
                onChange={setPriceRange}
                min={0}
                max={1000}/>
      <Button icon={<SearchOutlined />} onClick={applyFilters}>Найти</Button>
    </div>
  );
}

export default Filter;
