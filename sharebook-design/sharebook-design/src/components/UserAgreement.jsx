import React from 'react';
import {  Modal, Button} from 'antd';
import '../assets/css/ModalForm.css';
import '../assets/css/UserAgreement.css';
// Компонент модального окна  для показа пользовательского соглашения
export const UserAgreementModal = ({ visible, setVisible }) =>{ 
      return (
        <>
      <Modal
        title={<div className="ModalHeader">Пользовательское соглашение</div>}
        style={{ top: 20 }}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}   
      >
        <div className="ModalContent">
        <h2 className="ModalSubHeader">1.ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</h2>
    <p className="ModalParagraph">1.1 В настоящей Политике конфиденциальности используются следующие термины:
1.1.1. «Администрация сайта http://share-book.ru/ (далее — Администрация сайта)», уполномоченные сотрудники, действующие от имени ООО «ShareBook», которые организуют и (или) осуществляют обработку персональных данных, а также определяют цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.
<br></br>
1.1.2. «Персональные данные» — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).
<br></br>
1.1.3. «Обработка персональных данных» — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
<br></br>
1.1.4. «Конфиденциальность персональных данных» — обязательное для соблюдения Администрацией сайта требование не допускать их распространения без согласия субъекта персональных данных или наличия иного законного основания.
<br></br>
1.1.5. «Пользователь сайта  http://share-book.ru/ (далее Пользователь)» — лицо, имеющее доступ к Сайту, посредством сети Интернет и использующее сайт http://share-book.ru/.
<br></br>
1.1.6. «Cookies» — небольшой фрагмент данных, отправленный веб-сервером и хранимый на компьютере пользователя, который веб-клиент или веб-браузер каждый раз пересылает веб-серверу в HTTP-запросе при попытке открыть страницу соответствующего сайта.
<br></br>
1.1.7. «IP-адрес» — уникальный сетевой адрес узла в компьютерной сети, построенной по протоколу IP.
</p> 
<h2 className="ModalSubHeader">2. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
<p className="ModalParagraph">2.1. Использование Пользователем сайта http://share-book.ru/ означает согласие с настоящей Политикой конфиденциальности и условиями обработки персональных данных Пользователя.
2.2. В случае несогласия с условиями Политики конфиденциальности Пользователь должен прекратить использование сайта http://share-book.ru/
<br></br>
2.3. Настоящая Политика конфиденциальности применяется только к сайту http://share-book.ru/ Сайт http://share-book.ru/ не контролирует и не несет ответственность за сайты третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на сайте http://share-book.ru/
<br></br>
2.4. Администрация сайта не проверяет достоверность персональных данных, предоставляемых Пользователем сайта http://share-book.ru/
</p>
<h2 className="ModalSubHeader">3. ПРЕДМЕТ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ</h2>
<p className="ModalParagraph">3.1. Настоящая Политика конфиденциальности устанавливает обязательства Администрации сайта http://share-book.ru/ по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые Пользователь предоставляет по запросу Администрации сайта при заполнении на сайте форм обратной связи, заявок, формирования отзывов о качестве услуг, а также общению через сервис online-чата.
<br></br>
<ul>3.2. Персональные данные, разрешенные к обработке в рамках настоящей Политики конфиденциальности, предоставляются Пользователем путем заполнения форм на сайте http://share-book.ru/, и включают в себя следующую информацию:
<li>3.2.1. фамилию, имя, отчество Пользователя;</li>
<li>3.2.2. контактный телефон Пользователя;</li>
<li>3.2.3. адрес электронной почты (e-mail);</li>
<li>3.2.4. город и страну проживания;</li>
<li>3.2.5. адрес сайта.</li></ul>
<br></br>
<ul>3.3. Сайт http://share-book.ru/ защищает Данные, которые автоматически передаются в процессе просмотра рекламных блоков и при посещении страниц, на которых установлен статистический скрипт системы «пиксель», Яндекс Метрика, Google Analytics:
<li>	IP адрес;</li>
<li> информация из cookies;</li>
<li>	информация о браузере (или иной программе, которая осуществляет доступ к показу рекламы);</li>
<li>	время доступа;</li>
<li>	адрес страницы, на которой расположен рекламный блок;</li>
<li>	реферер (адрес предыдущей страницы).</li></ul>
<br></br>
3.4 Сайт http://share-book.ru/ осуществляет сбор статистики об IP-адресах своих посетителей. Данная информация используется с целью выявления и решения технических проблем, а также для контроля законности использования контента сайта.
<br></br>
3.5. Любая иная персональная информация, неоговоренная выше (история переходов по страницам сайта, используемые браузеры и операционные системы и т.д.), подлежит надежному хранению и нераспространению, за исключением случаев, предусмотренных в п.п. 5.2. и 5.3. настоящей Политики конфиденциальности.
</p>
<h2 className="ModalSubHeader">4. ЦЕЛИ СБОРА ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ</h2>
<p className="ModalParagraph">4.1. Персональные данные Пользователя Администрация сайта http://share-book.ru/ могут использоваться в целях:
<br></br>
4.1.1. Предоставления консультаций;
<br></br>
4.1.2. Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования сайта http://share-book.ru/ оказания услуг, обработка запросов и заявок от Пользователя;
<br></br>
4.1.3. Определения места нахождения Пользователя для обеспечения безопасности, предотвращения мошенничества;
<br></br>
4.1.4. Предоставления Пользователю эффективной клиентской и технической поддержки при возникновении проблем связанных с использованием ранее разработанных сайтов;
<br></br>
4.1.5. Предоставления Пользователю с его согласия, обновлений услуг, специальных предложений, информации о ценах, новостной рассылки и иных сведений от имени http://share-book.ru/ или от имени партнеров http://share-book.ru/;
<br></br>
4.1.6. Осуществления рекламной деятельности с согласия Пользователя.</p>
<h2 className="ModalSubHeader">5. СПОСОБЫ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ</h2>
<p className="ModalParagraph">5.1. Обработка персональных данных Пользователя осуществляется без ограничения срока, любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств.
<br></br>
5.2. Пользователь соглашается с тем, что Администрация сайта вправе передавать персональные данные третьим лицам, исключительно в целях выполнения запроса Пользователя, оформленного на сайте http://share-book.ru/
<br></br>
5.3. Персональные данные Пользователя могут быть переданы уполномоченным органам государственной власти Российской Федерации только по основаниям и в порядке, установленным законодательством Российской Федерации.
<br></br>
5.4. При утрате или разглашении персональных данных Администрация сайта информирует Пользователя об утрате или разглашении персональных данных.
<br></br>
5.5. Администрация сайта принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
<br></br>
5.6. Администрация сайта совместно с Пользователем принимает все необходимые меры по предотвращению убытков или иных отрицательных последствий, вызванных утратой или разглашением персональных данных Пользователя.
</p>
<h2 className="ModalSubHeader">6. ОБЯЗАТЕЛЬСТВА СТОРОН</h2>
<p className="ModalParagraph">6.1. Пользователь обязан:
6.1.1. Предоставить информацию о персональных данных, необходимую для пользования сайтом http://share-book.ru/;
<br></br>
6.1.2. Обновить, дополнить предоставленную информацию о персональных данных в случае изменения данной информации.
<br></br>
6.2. Администрация сайта обязана:
<br></br>
6.2.1. Использовать полученную информацию исключительно для целей, указанных в п. 4 настоящей Политики конфиденциальности.
<br></br>
6.2.2. Обеспечить хранение конфиденциальной информации в тайне, не разглашать без предварительного письменного разрешения Пользователя, а также не осуществлять продажу, обмен, опубликование, либо разглашение иными возможными способами переданных персональных данных Пользователя, за исключением п.п. 5.2. и 5.3. настоящей Политики Конфиденциальности.
<br></br>
6.2.3. Принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку, обычно используемого для защиты такого рода информации в существующем деловом обороте.
<br></br>
6.2.4. Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя или его законного представителя либо уполномоченного органа по защите прав субъектов персональных данных на период проверки, в случае выявления недостоверных персональных данных или неправомерных действий.
 </p>
<h2 className="ModalSubHeader">7. ОТВЕТСТВЕННОСТЬ СТОРОН</h2>
<p className="ModalParagraph">
7.1. Администрация сайта, не исполнившая свои обязательства, несет ответственность в связи с неправомерным использованием персональных данных, в соответствии с законодательством Российской Федерации, за исключением случаев, предусмотренных п.п. 5.2., 5.3. и 7.2. настоящей Политики Конфиденциальности.
<br></br>
7.2. В случае утраты или разглашения Конфиденциальной информации Администрация сайта не несет ответственность, если данная конфиденциальная информация:
<br></br>
7.2.1. Стала публичным достоянием до ее утраты или разглашения;
<br></br>
7.2.2. Была получена от третьей стороны до момента ее получения Администрацией сайта;
<br></br>
7.2.3. Была разглашена с согласия Пользователя.</p>
<h2 className="ModalSubHeader">8. РАЗРЕШЕНИЕ СПОРОВ</h2>
<p className="ModalParagraph">
8.1. До обращения в суд с иском по спорам, возникающим из отношений между Пользователем сайта http://share-book.ru/ и Администрацией сайта, обязательным является предъявление претензии (письменного предложения о добровольном урегулировании спора).
<br></br>
8.2. Получатель претензии в течение 30 календарных дней со дня получения претензии письменно уведомляет заявителя претензии о результатах рассмотрения претензии.
<br></br>
8.3. При не достижении общего соглашения спор будет передан на рассмотрение в судебный орган в соответствии с действующим законодательством Российской Федерации.
<br></br>
8.4. К настоящей Политике конфиденциальности и отношениям между Пользователем и Администрацией сайта применяется действующее законодательство Российской Федерации.
</p>
<h2 className="ModalSubHeader">9. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</h2>
<p className="ModalParagraph">
9.1. Администрация сайта вправе вносить изменения в настоящую Политику конфиденциальности без согласия Пользователя.
<br></br>
9.2. Новая Политика конфиденциальности вступает в силу с момента ее размещения на сайте http://share-book.ru/, если иное не предусмотрено новой редакцией Политики конфиденциальности.
<br></br>
9.3. Все предложения или вопросы по настоящей Политики конфиденциальности следует сообщать через раздел «Контакты»
<br></br>
9.4. Действующая Политика конфиденциальности размещена на странице по адресу http://share-book.ru/ 
</p>
</div>
      </Modal>
      <br />
      <br />   
    </>
      );
};
export default UserAgreementModal;
