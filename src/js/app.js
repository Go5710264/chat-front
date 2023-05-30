// TODO: write your code here
import SubscriptionApi from '../components/SubscriptionAPI'
import createElementLI, { creatingMessageElement } from './createElement'

document.addEventListener('DOMContentLoaded', () => {

  const nickname = document.querySelector('.nickname-input-field');
  // поле ввода никнейма

  const nicknameSendingButton = document.querySelector('.nickname-entry-form-button');
  // кнопка отправки никнейма на сервер

  const windowSubscribers = document.querySelector('.subscriptions')
  // поле со списком никнеймов

  let user; // переменная с никнеймом пользователя

  nicknameSendingButton.addEventListener('click', (e) => {
    // событие при обработки ввода никнейма

    e.preventDefault();

    user = nickname.value; // инициализация никнейма

    api.add({"name": user}).then( // отправка никнейма на сервер
      result => { // по завершении запроса
        const niknameItem = Array.from(windowSubscribers.children)
          .find(item => item.textContent === user)
          // найти никнейм пользователя страницы в общем списке

        niknameItem.textContent = 'You'; // заменить его на 'You'
      }
    )
  })

  const eventSource = new EventSource('http://localhost:7070/sse');
  // инициализация SSE соединения (получение сообщений с сервера при обновлении данных)
  
  eventSource.addEventListener('open', (e) => {
  // событие при ОТКРЫТИИ соединения с сервером

    console.log(e);
    
    api.getSubscribers().then( 
    // отправка запроса на получение списка пользователей чата
      result => result.forEach(item => { // результат запроса проитерировать
        createElementLI(item.name);
        // отобразить каждый никнейм на странице
      })
    )
    
    console.log('sse open')
  });


  eventSource.addEventListener('error', (e)=> {
    console.log(e);
    
    console.log('sse error')
  })


  eventSource.addEventListener('message', (e) => {
  // событие при ОБНОВЛЕНИИ данных на сервере

    console.log(e);

    const { name } = JSON.parse(e.data);
    // инициализация никнейма добаленного на сервер

    createElementLI(name); // отобразить новый никнейм на странице

    console.log('sse message')
  })

  const ws = new WebSocket('ws://localhost:7070/ws');
  // инициализация WS соединения (двусторонний обмен данных)

  const chat = document.querySelector('.chat'); // доступ к окну чата
  const chatMessage = document.querySelector('.chat-message'); // поле ввода сообщения
  const chatSend = document.querySelector('.chat-send'); // кнопка отправить

  chatSend.addEventListener('click', () => {
  // событие клика на кнопку отправить

    const message = chatMessage.value; 
    // инициализация сообщения введенного в поле ввода

    if(!message) return; // если сообщения нет, выйти из функции

    ws.send(message); // отправка WS запроса с данными на сервер 

    chatMessage.value = ''; // очистить поле ввода
  })

  ws.addEventListener('open', (e)=> {
  // событие открытия WS соединения с сервером 
    console.log(e);
    
    console.log('ws open')
  })

  ws.addEventListener('close', (e)=> {
  // событие закрытия WS соединения с сервером 
    console.log(e);
    
    console.log('ws close')
  })

  // Проблема состоит в том что необоходимо показывать имя вместе с сообщением (отправлять никнейм вместе с сообщением?). Необоходимо фиксировать YOU на своем никнейме

  ws.addEventListener('error', (e)=> {
    console.log(e);
    
    console.log('ws error')
  })

  ws.addEventListener('message', (e)=> {
  // событие при ОБНОВЛЕНИИ данных на сервере
  
    console.log(e);
    
    const data = JSON.parse(e.data);
    // спарсить данные полученные с сервера

    const { chat: messages } = data;
    // деструкция объекта с переприсвоением названия свойства новой переменной

    if(messages.length > 1) { // если сообщений более одного
      messages.forEach(message => {
      // проитерировать сообщения

        creatingMessageElement(message);
        // создать элементы с сообщением
      });
      return;
    }

    // иначе содать элемент с одним сообщением
    creatingMessageElement(messages, 'You');
  })

  window.api = new SubscriptionApi ('http://localhost:7070/')
});
