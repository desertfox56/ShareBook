import React from 'react';
import { Cascader } from 'antd';
import { Slider } from 'antd';
import { Typography, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../assets/css/Filter.css';
// Константа для стратегии отображения выбранных элементов
const { SHOW_CHILD } = Cascader;
const {Title} = Typography;
// Опции для компонента Cascader
const genreOptions = [
  {
    label: 'Фантастика',
    value: 'fiction',
    children: [
      {
        label: 'Научная фантастика',
        value: 'sci-fi',
      },
      {
        label: 'Фэнтези',
        value: 'fantasy',
      },
      {
        label: 'Ужасы',
        value: 'horror',
      },
    ],
  },
  {
    label: 'Нехудожественная литература',
    value: 'non-fiction',
    children: [
      {
        label: 'История',
        value: 'history',
      },
      {
        label: 'Наука',
        value: 'science',
      },
      {
        label: 'Экономика',
        value: 'economics',
      },
    ],
  },
];

const languageOptions = [
  {
    label: 'Английский',
    value: 'english',
  },
  {
    label: 'Русский',
    value: 'russian',
  },
  {
    label: 'Испанский',
    value: 'spanish',
  },
  {
    label: 'Немецкий',
    value: 'german',
  },
];

const authorOptions = [
  {
    label: 'Лев Толстой',
    value: 'leo-tolstoy',
  },
  {
    label: 'Дж.К. Роулинг',
    value: 'jk-rowling',
  },
  {
    label: 'Стивен Кинг',
    value: 'stephen-king',
  },
  {
    label: 'Исак Азимов',
    value: 'isaac-asimov',
  },
];

function Filter() {
  // Функция для обработки выбора
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  return (
    <div className='Filter'>
      <Title level={2}>Категории</Title>
    <Title level={3}>Жанр</Title>
      <Cascader
        style={{ width: '30%' }}
        options={genreOptions}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
      />
      <br />
      <br />
      <Title level={3}>Язык</Title>
      <Cascader
        style={{ width: '30%' }}
        options={languageOptions}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        defaultValue={['russian']}
      />
      <Title level={3}>Автор</Title>
      <Cascader
        style={{ width: '30%' }}
        options={authorOptions}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
      />

      <Title level={4}>Возраст</Title>
      <Slider range={{ draggableTrack: true }} defaultValue={[18, 50]} style={{ width: '30%' }} />

      <Button icon={<SearchOutlined />}>Найти</Button>
    </div>
  );
}

export default Filter;
