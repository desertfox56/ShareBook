import { Collapse } from 'antd';
const { Panel } = Collapse;

const text1 = `
  Нет, не обязательно, можно купить книгу  и по ее рыночной цене на нашем сайте.
`;
const text2 = `
  Для этого достаточно, чтобы друг был зарегистрирован на Sharebook со своей электронной почтой. Ее надо будет указать в поле "Почта друга"
`;
const text3 = `
  Для этого необходимо иметь книгу у себя личной библиотеке и там нажать на иконку скачать.
`;
const text4 = `
  Это можно сделать в режиме чтения книги на сайте.
`;
const text5 = `
  Скоро...
`;

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
            <Panel header="Как скачать книгу для чтения оффлайн?" key="3">
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