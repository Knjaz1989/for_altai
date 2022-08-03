window.addEventListener('load', () => {
    const orderForm = new OrderForm('order-form');
    orderForm.init();
});

class OrderForm {
  static apiURL = "http://localhost:8080"; // путь на сервере - перенесем в env.

  // Cписок обрабатываемых полей
  static fields = [
    'face',
    'city',
    'initials',
    'telephone',
    'email',
    'originalLang',
    'targetLang',
    'image',
    'date',
    'comment',
    'privacy'
  ];

  constructor(orderFormId) {
    this.id = orderFormId;
    this.html = document.getElementById(orderFormId);
    this.data = {};
  }

  init() {
    this.html.addEventListener('submit', async (e) => {
      e.preventDefault();
      this.collectData();

      if (this.validateValues()) {
        await this.sendFormData();
      }
      this.printValues(); // на время разработки
    });
  }

  collectData() {
    OrderForm.fields.forEach((field) => {
      this.data[field] = this.html[field].value;
    });
    this.files = this.html.file.files;
    console.log(this.files);
  }

  // На время разработки - потом удалим
  printValues() {
    console.log(JSON.stringify(this.data));
  };

  validateValues() {
    // Это пример:
    if (!this.data['city'] || this.data['city'].length <= 0) {
      this.showErrorMessage('Укажите город');
      return false;
    }
    // Напишем, когда решим, что и как валидируем
    return true;
  }

  async sendFormData() {
    // Метод для отправки данных на сервер - формат JSON, поля по списку
    try {
      const formData = new FormData();

      Object.keys(this.data).forEach((key) => {
        formData.set(key, this.data[key]);
      });
      Object.keys(this.files).forEach((key) => {
        formData.append(`files[]`, this.files[key], this.files[key].name);
      });

      const request = await fetch(OrderForm.apiURL, {
        method: 'POST',
        body: formData,
        });
      if (request.ok) {
        const data = await request.text();
        console.log('From server: ');
        console.log(data);
        console.log(request.status, request.statusText);
        // showSuccessMessage();
      }
    } catch (e) {
      this.showErrorMessage(e.message);
    }

  }

  showErrorMessage(message) {
    // Метод для показа сообщения об ошибке при валидации
    console.log('Ошибка: ', message);
  }

  showSuccessMessage() {
    // Метод для показа сообщения об успешной отправке формы на сервер
    console.log('Данные успешно отправлены');
  }
}
