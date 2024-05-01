import React, { useState } from 'react';
import { Typography, Collapse, Button, Image, Pagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProgressBar from '../components/ProgressBar';
import PictureDonQuxote from '../assets/img/Don Quixote.jpg';
import AppPagination from '../components/Pagination';
import { FloatButton } from 'antd';
import '../assets/css/ReadingPage.css';
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;
const genreStyles = {
    fantasy: {
      backgroundColor: '#f4f0ec',
      color: '#3d2c29',
      fontFamily: "'Baskervville', serif",
      fontWeight: '400',
      
    },
    mystery: {
      backgroundColor: '#e3e4db',
      color: '#423d33',
    },
    romance: {
      backgroundColor: '#fff0f0',
      color: '#442c2e',
    },
    // Добавьте стили для других жанров
  };
  
const BookReadingPage = () => {
    const [currentGenre, setCurrentGenre] = useState('fantasy'); // Пример начального состояния
    // Допустим, у вас есть функция для получения жанра книги, возможно, из URL или контекста
  // useEffect(() => {
  //   const genre = fetchBookGenre();
  //   setCurrentGenre(genre);
  // }, []);
    const genreStyle = genreStyles[currentGenre]; // Получаем стиль для текущего жанра
  // Допустим, у вас есть массив глав, каждая глава - это объект с заголовком и содержанием
  const chapters = [
    {
      title: 'Глава 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique mauris vitae quam finibus, sed tincidunt nisl rhoncus. Praesent ultricies, enim sodales suscipit luctus, arcu enim tempor orci, at porta tortor purus ac nunc. Nulla et sagittis nisl. Quisque pulvinar sed ipsum vel dictum. Fusce eleifend aliquam tortor, tempor fermentum erat pharetra nec. Donec ullamcorper vitae dolor ut finibus. Duis vehicula nisl urna, at sagittis urna auctor et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque pretium fringilla enim, at accumsan orci euismod nec. Sed sit amet cursus dui. Ut imperdiet mi placerat urna cursus sagittis. Duis nisl felis, lacinia a massa sit amet, consequat aliquet orci.Nam nec odio accumsan, vulputate lectus aliquam, porta leo. Sed pharetra dictum lorem at pharetra. Praesent dignissim dolor ut ornare elementum. Morbi massa mi, dignissim vel tellus lacinia, pharetra accumsan purus. Nullam eget velit vel odio finibus posuere euismod ut eros. Suspendisse ultricies rutrum rhoncus. Etiam et luctus risus. Suspendisse vitae consectetur neque. Suspendisse a sapien porta, scelerisque leo quis, gravida orci. Donec vehicula euismod dignissim. Mauris finibus neque non rutrum ornare. Donec ante mi, volutpat a ipsum a, posuere viverra velit.Nunc eget porttitor tortor, lacinia lacinia purus. Pellentesque mollis purus metus, id egestas massa congue et. Curabitur aliquam rutrum ex a molestie. In hac habitasse platea dictumst. Duis cursus, purus nec vulputate scelerisque, elit odio mollis magna, id lobortis enim elit nec est. Donec id nunc ullamcorper, placerat lorem a, pharetra lacus. Mauris finibus justo eu lacinia efficitur. Pellentesque quis ex et risus feugiat accumsan sed ac neque. Cras a elit interdum, molestie sem id, congue ipsum. Fusce massa arcu, laoreet nec viverra dictum, finibus eget sapien. Fusce libero diam, lobortis id blandit eu, sodales vitae quam. Quisque euismod felis sed eros tempus tincidunt.Donec in vulputate enim, laoreet blandit justo. Morbi laoreet, tortor sed malesuada molestie, arcu elit lacinia diam, eget dictum mauris neque ut nisl. Cras in tellus ac sapien pretium hendrerit. Proin ex felis, feugiat in facilisis et, efficitur mollis ex. Pellentesque nec metus sagittis, varius lectus ut, bibendum mauris. Pellentesque et ante elit. Vestibulum consectetur magna in lacus scelerisque rhoncus. Nulla vel ex vitae nisl fermentum commodo. Mauris ante ipsum, hendrerit eleifend volutpat non, imperdiet suscipit erat. Donec cursus nisl et lectus vehicula molestie. Sed ultricies leo eget gravida lobortis. Donec id quam consectetur, venenatis eros at, ultricies enim. Ut in laoreet ipsum. Proin interdum malesuada bibendum. Praesent aliquet consequat lobortis.Curabitur vel nunc vel ligula molestie ultricies. Aliquam erat volutpat. Proin tempor enim et est pharetra, a feugiat nibh dapibus. Donec rutrum ligula id ante posuere rhoncus. Cras non dictum arcu. Sed sit amet sem velit. Mauris et iaculis tortor. Vivamus non dolor convallis, mattis nisl ut, efficitur quam. Nullam sit amet pretium diam, et ultrices dui. Cras venenatis, tortor in tincidunt bibendum, metus erat consectetur nunc, vitae condimentum leo eros quis arcu. Sed aliquet sed sapien mollis rutrum. Maecenas semper feugiat accumsan. Aenean vehicula eros dolor, in convallis urna aliquam sed.Sed fermentum ultrices arcu ut sagittis. Nam fringilla maximus lorem vitae viverra. Pellentesque vitae dolor nulla. Duis sodales eros vitae diam ullamcorper sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec dignissim leo nec efficitur porta. Nam tempor massa sit amet mollis placerat. Donec commodo rutrum urna, nec accumsan urna lobortis in. Nullam hendrerit id mi in euismod. Duis vehicula, nulla vitae efficitur ultricies, massa urna ornare massa, quis pulvinar magna dolor et neque. Nam porta pulvinar enim, eu dignissim metus pharetra sit amet. Mauris nec metus viverra, vulputate odio quis, aliquet diam. Integer molestie imperdiet risus, eu varius orci sollicitudin sit amet. Quisque a fermentum mauris. Curabitur pretium, velit vel congue bibendum, lectus dolor pulvinar ipsum, ut volutpat arcu magna in sem.In nibh risus, consequat id eleifend tincidunt, egestas sed magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis ligula et nunc convallis porttitor sed nec tellus. Aenean tempus mauris vel sem pharetra ullamcorper. Sed ornare venenatis vehicula. Morbi hendrerit vestibulum quam, ut rutrum lorem laoreet at. Sed vitae vehicula lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis accumsan interdum feugiat. Phasellus at ultrices mauris, et maximus neque. Morbi ex nisl, porttitor quis feugiat a, ultricies pulvinar enim. Donec rhoncus eleifend blandit. Cras scelerisque turpis a turpis volutpat, ut tincidunt leo faucibus. Suspendisse eget dolor volutpat, rutrum urna at, malesuada orci. Sed sit amet commodo dui.Sed sodales sapien vestibulum, ultrices sem sed, tempor ipsum. Maecenas eros ipsum, tincidunt vitae neque eu, imperdiet venenatis quam. Sed in porttitor mi. Suspendisse rutrum, nisi ac egestas euismod, velit turpis imperdiet augue, sed pretium orci quam eget purus. Nunc ut commodo neque, ut lacinia risus. Cras sodales libero eu nibh fermentum, vel porttitor mi feugiat. Proin fermentum metus in velit vestibulum dictum. Curabitur ac tristique elit. Duis lacinia velit neque, sed condimentum velit tempus posuere. Phasellus nec ligula pretium, convallis turpis sed, luctus enim. Phasellus fringilla maximus euismod. Pellentesque ac sodales mauris, eu interdum eros. Vivamus quis molestie mauris. Ut felis velit, accumsan eget aliquam eget, condimentum vel magna. Aenean eu eros sollicitudin elit gravida ornare. Sed vel metus ac leo laoreet gravida ut ac purus. Suspendisse ultrices varius ipsum eget sodales. Ut aliquam eget mi non luctus. Proin leo nibh, consequat id aliquam a, consequat eget est. Integer non posuere ex, vitae placerat quam. Cras risus lacus, lacinia non iaculis eget, iaculis et erat. Duis ut ligula dolor. Proin viverra arcu nisi, sit amet fringilla felis aliquam eu. Aliquam iaculis ullamcorper sem a suscipit. Aenean gravida non lorem vitae efficitur. Nullam congue efficitur varius. Mauris purus lacus, interdum a arcu eget, gravida tristique orci. Nunc ut tristique metus. In hac habitasse platea dictumst. Integer finibus volutpat velit eu luctus. Nulla tempus risus id tincidunt placerat. Pellentesque laoreet convallis urna, sit amet blandit ex ultricies non. Morbi pulvinar eget urna ut commodo. In nec nisi sit amet quam malesuada lacinia. Vestibulum eleifend sem arcu, ut fringilla ante gravida in. Fusce porta, purus non pretium aliquet, libero augue pharetra risus, quis mattis enim elit sit amet sapien. Cras varius et mi in semper. Donec eget accumsan elit. Donec sodales magna orci, quis dictum felis consectetur in. Duis suscipit egestas tempus. Ut vitae turpis et mauris hendrerit congue non pellentesque magna. Cras et turpis ut leo sodales molestie. Duis varius turpis finibus augue consequat pellentesque. Duis lacinia in est non interdum. In hendrerit ligula sagittis elementum mattis.',
    },
    {
      title: 'Глава 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique mauris vitae quam finibus, sed tincidunt nisl rhoncus. Praesent ultricies, enim sodales suscipit luctus, arcu enim tempor orci, at porta tortor purus ac nunc. Nulla et sagittis nisl. Quisque pulvinar sed ipsum vel dictum. Fusce eleifend aliquam tortor, tempor fermentum erat pharetra nec. Donec ullamcorper vitae dolor ut finibus. Duis vehicula nisl urna, at sagittis urna auctor et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque pretium fringilla enim, at accumsan orci euismod nec. Sed sit amet cursus dui. Ut imperdiet mi placerat urna cursus sagittis. Duis nisl felis, lacinia a massa sit amet, consequat aliquet orci.Nam nec odio accumsan, vulputate lectus aliquam, porta leo. Sed pharetra dictum lorem at pharetra. Praesent dignissim dolor ut ornare elementum. Morbi massa mi, dignissim vel tellus lacinia, pharetra accumsan purus. Nullam eget velit vel odio finibus posuere euismod ut eros. Suspendisse ultricies rutrum rhoncus. Etiam et luctus risus. Suspendisse vitae consectetur neque. Suspendisse a sapien porta, scelerisque leo quis, gravida orci. Donec vehicula euismod dignissim. Mauris finibus neque non rutrum ornare. Donec ante mi, volutpat a ipsum a, posuere viverra velit.Nunc eget porttitor tortor, lacinia lacinia purus. Pellentesque mollis purus metus, id egestas massa congue et. Curabitur aliquam rutrum ex a molestie. In hac habitasse platea dictumst. Duis cursus, purus nec vulputate scelerisque, elit odio mollis magna, id lobortis enim elit nec est. Donec id nunc ullamcorper, placerat lorem a, pharetra lacus. Mauris finibus justo eu lacinia efficitur. Pellentesque quis ex et risus feugiat accumsan sed ac neque. Cras a elit interdum, molestie sem id, congue ipsum. Fusce massa arcu, laoreet nec viverra dictum, finibus eget sapien. Fusce libero diam, lobortis id blandit eu, sodales vitae quam. Quisque euismod felis sed eros tempus tincidunt.Donec in vulputate enim, laoreet blandit justo. Morbi laoreet, tortor sed malesuada molestie, arcu elit lacinia diam, eget dictum mauris neque ut nisl. Cras in tellus ac sapien pretium hendrerit. Proin ex felis, feugiat in facilisis et, efficitur mollis ex. Pellentesque nec metus sagittis, varius lectus ut, bibendum mauris. Pellentesque et ante elit. Vestibulum consectetur magna in lacus scelerisque rhoncus. Nulla vel ex vitae nisl fermentum commodo. Mauris ante ipsum, hendrerit eleifend volutpat non, imperdiet suscipit erat. Donec cursus nisl et lectus vehicula molestie. Sed ultricies leo eget gravida lobortis. Donec id quam consectetur, venenatis eros at, ultricies enim. Ut in laoreet ipsum. Proin interdum malesuada bibendum. Praesent aliquet consequat lobortis.Curabitur vel nunc vel ligula molestie ultricies. Aliquam erat volutpat. Proin tempor enim et est pharetra, a feugiat nibh dapibus. Donec rutrum ligula id ante posuere rhoncus. Cras non dictum arcu. Sed sit amet sem velit. Mauris et iaculis tortor. Vivamus non dolor convallis, mattis nisl ut, efficitur quam. Nullam sit amet pretium diam, et ultrices dui. Cras venenatis, tortor in tincidunt bibendum, metus erat consectetur nunc, vitae condimentum leo eros quis arcu. Sed aliquet sed sapien mollis rutrum. Maecenas semper feugiat accumsan. Aenean vehicula eros dolor, in convallis urna aliquam sed.Sed fermentum ultrices arcu ut sagittis. Nam fringilla maximus lorem vitae viverra. Pellentesque vitae dolor nulla. Duis sodales eros vitae diam ullamcorper sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec dignissim leo nec efficitur porta. Nam tempor massa sit amet mollis placerat. Donec commodo rutrum urna, nec accumsan urna lobortis in. Nullam hendrerit id mi in euismod. Duis vehicula, nulla vitae efficitur ultricies, massa urna ornare massa, quis pulvinar magna dolor et neque. Nam porta pulvinar enim, eu dignissim metus pharetra sit amet. Mauris nec metus viverra, vulputate odio quis, aliquet diam. Integer molestie imperdiet risus, eu varius orci sollicitudin sit amet. Quisque a fermentum mauris. Curabitur pretium, velit vel congue bibendum, lectus dolor pulvinar ipsum, ut volutpat arcu magna in sem.In nibh risus, consequat id eleifend tincidunt, egestas sed magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis ligula et nunc convallis porttitor sed nec tellus. Aenean tempus mauris vel sem pharetra ullamcorper. Sed ornare venenatis vehicula. Morbi hendrerit vestibulum quam, ut rutrum lorem laoreet at. Sed vitae vehicula lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis accumsan interdum feugiat. Phasellus at ultrices mauris, et maximus neque. Morbi ex nisl, porttitor quis feugiat a, ultricies pulvinar enim. Donec rhoncus eleifend blandit. Cras scelerisque turpis a turpis volutpat, ut tincidunt leo faucibus. Suspendisse eget dolor volutpat, rutrum urna at, malesuada orci. Sed sit amet commodo dui.Sed sodales sapien vestibulum, ultrices sem sed, tempor ipsum. Maecenas eros ipsum, tincidunt vitae neque eu, imperdiet venenatis quam. Sed in porttitor mi. Suspendisse rutrum, nisi ac egestas euismod, velit turpis imperdiet augue, sed pretium orci quam eget purus. Nunc ut commodo neque, ut lacinia risus. Cras sodales libero eu nibh fermentum, vel porttitor mi feugiat. Proin fermentum metus in velit vestibulum dictum. Curabitur ac tristique elit. Duis lacinia velit neque, sed condimentum velit tempus posuere. Phasellus nec ligula pretium, convallis turpis sed, luctus enim. Phasellus fringilla maximus euismod. Pellentesque ac sodales mauris, eu interdum eros. Vivamus quis molestie mauris. Ut felis velit, accumsan eget aliquam eget, condimentum vel magna. Aenean eu eros sollicitudin elit gravida ornare. Sed vel metus ac leo laoreet gravida ut ac purus. Suspendisse ultrices varius ipsum eget sodales. Ut aliquam eget mi non luctus. Proin leo nibh, consequat id aliquam a, consequat eget est. Integer non posuere ex, vitae placerat quam. Cras risus lacus, lacinia non iaculis eget, iaculis et erat. Duis ut ligula dolor. Proin viverra arcu nisi, sit amet fringilla felis aliquam eu. Aliquam iaculis ullamcorper sem a suscipit. Aenean gravida non lorem vitae efficitur. Nullam congue efficitur varius. Mauris purus lacus, interdum a arcu eget, gravida tristique orci. Nunc ut tristique metus. In hac habitasse platea dictumst. Integer finibus volutpat velit eu luctus. Nulla tempus risus id tincidunt placerat. Pellentesque laoreet convallis urna, sit amet blandit ex ultricies non. Morbi pulvinar eget urna ut commodo. In nec nisi sit amet quam malesuada lacinia. Vestibulum eleifend sem arcu, ut fringilla ante gravida in. Fusce porta, purus non pretium aliquet, libero augue pharetra risus, quis mattis enim elit sit amet sapien. Cras varius et mi in semper. Donec eget accumsan elit. Donec sodales magna orci, quis dictum felis consectetur in. Duis suscipit egestas tempus. Ut vitae turpis et mauris hendrerit congue non pellentesque magna. Cras et turpis ut leo sodales molestie. Duis varius turpis finibus augue consequat pellentesque. Duis lacinia in est non interdum. In hendrerit ligula sagittis elementum mattis.',
    },
    // Добавьте больше глав по аналогии
  ];

  // Функция для рендеринга содержимого главы
  const renderChapterContent = (chapter) => (
    <Typography>
      <Paragraph style={{ fontFamily: "'Baskervville', serif", fontWeight: 'normal', color:'#121111' }}>
        {chapter.content}
      </Paragraph>
    </Typography>
  );

  return (
    <div className="book-reading-page" style={genreStyle}>
        <div style={{textAlign:'center'}}>
        <Image
            alt="example"
            src={PictureDonQuxote}
            height="20%"
            width="20%"               
          />

      <Title level={2}>Название Книги</Title></div>

      <ProgressBar/> {/* Прогресс чтения */}
      
      <Collapse collapsible="header"
      defaultActiveKey={['0']}>
        {chapters.map((chapter, index) => (
          <Panel header={chapter.title} key={index}>
            {renderChapterContent(chapter)}
          </Panel>
        ))}
         
      </Collapse>
      
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <AppPagination/>
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default BookReadingPage;
