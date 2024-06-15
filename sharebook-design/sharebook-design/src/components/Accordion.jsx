import { Collapse } from 'antd';
const { Panel } = Collapse;

const text1 = `
  Нет, не обязательно, можно совершенно бесплатно арендовать ее на нашем сайте.
`;
const text2 = `
  Для этого достаточно, чтобы друг был зарегистрирован на Sharebook со своей электронной почтой. Ее надо будет указать в поле "Почта друга"
`;
const text3 = `
  Для этого необходимо перейти на страницу "Контакты", и написать в форму обратной связи.
`;
const text4 = `
  Это можно сделать в режиме чтения книги на сайте.
`;
const text5 = `
  Скоро...
`;

//Функция показа FAQ в виде компонента Collapce
function FAQAccordion() {
    return (
        <>
        <Collapse accordion>
            <Panel header="Обязательно ли оформлять подписку для чтения книг?" key="1">
                <p>{text1}</p>
            </Panel>
            <Panel header="Как делиться книгой с другом?" key="2">
                <p>{text2}</p>
            </Panel>
            <Panel header="Как можно связаться с администрацией сайта?" key="3">
                <p>{text3}</p>
            </Panel>
            <Panel header="Как сменить стиль текста книги?" key="4">
                <p>{text4}</p>
            </Panel>
            <Panel header="Когда будет мобильное приложение?" key="5">
                <p>{text5}</p>
            </Panel>
        </Collapse>
        </>
    );
}

export default FAQAccordion;