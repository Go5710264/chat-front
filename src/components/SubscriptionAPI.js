export default class SubscriptionApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async add(user) { // отправка нового никнейма на сервер
    const request = await fetch(`${this.apiUrl}subscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await request;

    if (!result.ok) { // обработка ошики
      const json = await result.json();

      const { status } = json;

      if (status === 'subscripiton exists') { // если подписчик уже есть
        const form = document.querySelector('.nickname-entry-form'); // найти форму

        form.appendChild(document.createTextNode(`Никнейм ${user.name} уже занят, введите другой\n`));
        // добавить к форме текст с предупреждением
      }

      console.error('Ошибка!');

      return;
    }

    const json = await result.json();
    // обработать ответ сервера

    const { status } = json; // получить статус ответа

    console.log(status);
  }

  async getSubscribers() { // получение списка подписчиков
    console.log('hi')
    const request = await fetch(`${this.apiUrl}subscriptions/full`, {
      method: 'GET',
    });

    const result = await request; // получение ответа сервера

    if (!result.ok) { // обработка ошибки ответа
      console.error('Ошибка!');
    }

    // const json = await result.json(); // обработка отвера

    // return json; // вернуть массив с подписчиками
  }

  async remove(user) { // удаление подписчика
    console.log('hi')
    const query = `subscriptions/${encodeURIComponent(user)}`;
    // Так как у DELETE нет тела запроса, запрос необходимо отправлять в строке браузера

    const request = await fetch(this.apiUrl + query, {
      method: 'DELETE', // у данного метода нет тела запроса
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка!');

      return;
    }

    const json = await result.json();

    const { status } = json;

    console.log(status);
  }
}
