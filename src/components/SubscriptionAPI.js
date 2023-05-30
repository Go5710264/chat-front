export default class SubscriptionApi {
    constructor(apiUrl){
      this.apiUrl = apiUrl;
    }

    async add(user){
      const request = await fetch(this.apiUrl + 'subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user), 
      })


      const result = await request; 

      if(!result.ok){
        const json = await result.json();

        const status = json.status;

        if(status === 'subscripiton exists'){
            const form = document.querySelector('.nickname-entry-form');

            form.appendChild(document.createTextNode(`Никнейм ${user.name} уже занят, введите другой\n`));
        }
        
        console.error('Ошибка!')

        return;
      }

      const json = await result.json();

      const status = json.status;

      console.log(status)
    }


    

    async getSubscribers(){
        const request = await fetch(this.apiUrl + 'subscriptions/full', {
          method: 'GET',
        })
  
  
        const result = await request; 
  
        if(!result.ok){
          const json = await result.json();
  
          const status = json.status;
  
          if(status === 'subscripiton exists'){
              const form = document.querySelector('.nickname-entry-form');
  
              form.appendChild(document.createTextNode(`Никнейм ${user.name} уже занят, введите другой\n`));
          }
          
          console.error('Ошибка!')
  
          return;
        }
  
        const json = await result.json();
  
        return json;
      }





    async remove(user){
      const query = 'subscriptions/' + encodeURIComponent(user.phone);
      // Так как у DELETE нет тела запроса, запрос необходимо отправлять в строке браузера

      const request = await fetch(this.apiUrl + query, {
        method: 'DELETE', // у данного метода нет тела запроса
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const result = await request; 

      if(!result.ok){
        console.error('Ошибка!')

        return;
      }

      const json = await result.json();

      const status = json.status;

      console.log(status)
    }
  }