const subscriptions = document.querySelector('.subscriptions');
const chat = document.querySelector('.chat'); // доступ к окну чата


export default function createElementLI(content){
    let elem = document.createElement('li');
    elem.textContent = content;

    subscriptions.appendChild(elem)
}

export function creatingMessageElement(content, user){
    let userMessage = document.createElement('li'); // создание элемента с сообщением
    
    let nick = document.createElement('h3'); // создание элемента с никнеймом
    nick.textContent = user;

    let span = document.createElement('span');
    span.textContent = content;

    // chat.appendChild(document.createTextNode(content + '\n'))
    userMessage.appendChild(nick);
    userMessage.appendChild(span);
    
    chat.appendChild(userMessage)

    console.log(userMessage)
}