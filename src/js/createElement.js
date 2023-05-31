// import { user as client } from './app';

const subscriptions = document.querySelector('.subscriptions');
const chat = document.querySelector('.chat'); // доступ к окну чата

function formatDate(date) {
  return `${date.getHours()}:${
    date.getMinutes()} ${
    date.getDate()}.${
    date.getMonth() + 1}.${
    date.getFullYear()}`;
}

export default function createElementLI(content) {
  const arr = Array.from(subscriptions.children);
  const index = arr.findIndex((item) => item.textContent === content);

  if (index !== -1) {
    subscriptions.removeChild(subscriptions.children[index]);

    return;
  }

  const elem = document.createElement('li');
  elem.textContent = content;

  subscriptions.appendChild(elem);
}

export function creatingMessageElement(content, user, date, client) {
  const userMessage = document.createElement('li'); // создание элемента с сообщением

  const nick = document.createElement('h3'); // создание элемента с никнеймом
  nick.textContent = client === user ? 'You' : user;

  const time = document.createElement('time');
  const timeSendingMessage = new Date(date);
  time.textContent = formatDate(timeSendingMessage);
  nick.appendChild(time);

  const span = document.createElement('span');
  span.textContent = content;

  userMessage.appendChild(nick);
  userMessage.appendChild(span);

  chat.appendChild(userMessage);
}
