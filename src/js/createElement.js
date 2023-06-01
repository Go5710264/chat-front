const subscriptions = document.querySelector('.subscriptions');
const chat = document.querySelector('.chat');
const chatContainer = document.querySelector('.chat-container');

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
  console.log(content);
  console.log(arr);

  if (index !== -1) {
    subscriptions.removeChild(subscriptions.children[index]);

    return;
  }

  const elem = document.createElement('li');
  elem.classList.add('subscriber');
  elem.textContent = content;

  subscriptions.appendChild(elem);
}

export function creatingMessageElement(content, user, date, client) {
  const userMessage = document.createElement('li');

  const nick = document.createElement('h3');
  nick.classList.add('chat-user-nickname');
  nick.textContent = client === user ? 'You' : user;

  const time = document.createElement('time');
  time.classList.add('sending-time');
  const timeSendingMessage = new Date(date);
  time.textContent = ` ${formatDate(timeSendingMessage)}`;
  nick.appendChild(time);

  const span = document.createElement('span');
  span.classList.add('chat-msg');
  span.textContent = content;

  userMessage.appendChild(nick);
  userMessage.appendChild(span);

  if (client === user) {
    userMessage.classList.add('user-msg');
  } else {
    userMessage.classList.add('msg');
  }

  chat.appendChild(userMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
