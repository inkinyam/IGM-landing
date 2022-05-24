export default class Form {
  constructor (formId) {
    this._formId = formId;
    this.form =  document.getElementById(this._formId);
    this.SubmitButton = this.form.querySelector('.form__submit');
    this._checkbox = this.form.querySelector('.form__check');
    this._resulMessage = this.form.querySelector('.form__message')
  }

//метод, который меняет значение чекбокса при нажатии
  toggleCheckboxValue () {
    this._checkbox = this.form.querySelector('.form__check');
    if (this._checkbox.value === '0') 
      { this._checkbox.value ='1' }
    else {this._checkbox.value ='0'}  
  }

//метод, получающий значение всех импутов и собирающих их в объект
  getInputsValue () {
    this._formInputs = Array.from(this.form.querySelectorAll('.item'));
    this._formValues = {};
    this._formInputs.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues; 
  }

//метод, получающий необходимые атрибуты формы
  _getAttributeForm () {
    this._validateUrl = this.form.getAttribute('data-validate-url');
    this._method = this.form.getAttribute('method');
    this._action = this.form.getAttribute('action');
  }

// метод, навешивающий слушатели на элементы
   setEventListeners () {

    //чекбокс
    this._checkbox.addEventListener('click', this.toggleCheckboxValue);

    //кнопка сабмита
    this.form.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this.sendSubmitForm();
    })
  } 

  //метод, отправляющий через АПИ запрос на валидацию
  sendValidationRequest () {
    this._getAttributeForm();
    this.getInputsValue();
  
    return fetch (this._validateUrl, {
      method: this._method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(this._formValues)
    })
    .then ( res => { 
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`${res.status}`);
    })
  }

  //метод, отправляющий через АПИ запрос на отправку формы
  sendAcceptRequest() {
    return fetch (this._action, {
      method: this._method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(this._formValues)
    })
    .then ( res => { 
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`${res.status}`);
    })
  }

  //метод, который выделяет инпут как ошибочный
  _showErrInput(item) {
    document.getElementById(item).classList.add('form__input_type_err');
    document.getElementById(item).classList.remove('form__input_type_check');
  }

  // метод, который выделяет инпут, как правильный
  _showCheckInput (item) {
    document.getElementById(item).classList.remove('form__input_type_err');
    document.getElementById(item).classList.add('form__input_type_check');
  }

  //метод, который прячет спаны и очищает их
  _clearSpans() {
    this._spans = this.form.querySelectorAll('.form__err');
    this._spans.forEach(span => {
      span.classList.remove('form__err_show');
      span.textContent='';
    })
  }

 //метод,к оторый отображает результат проверки
  _showValidityQueryResult(res) {
    this._clearSpans();
 
    this._formInputs.forEach(item => {
      if (Object.keys(res).includes(`${item.id}`)) {
        const errorElement = this.form.querySelector(`.form__err-${item.id}`);
        errorElement.classList.add('form__err_show');
        errorElement.textContent = res[item.id];
        this._showErrInput(item.id);
      } else {
        this._showCheckInput(item.id)
      }
    })
  }

  //метод, который показывает надпись "отправлено" и обновляет форму
  _showResultMessage(res){
    this._resulMessage.textContent = res['message'];
    this._resulMessage.classList.add('form__message_show');
    this.form.reset();
  }

  _hideResultMessage() {
    this._resulMessage.textContent = '';
    this._resulMessage.classList.remove('form__message_show');
  }
  
  //метод, который отправляет значения формы на сервер 
  sendSubmitForm(){
    this.sendValidationRequest()
      .then( res => {
        this._showValidityQueryResult(res);
        if (Object.keys(res).length == 0) {
          this.sendAcceptRequest()
          .then(res=>{this._showResultMessage(res)})
          .catch(err=>console.log(`Что-то не так. ${err}`))
        } else {
          this._hideResultMessage();
        }
      }) 
    .catch((err)=>{ console.log(`Что-то не так. ${err}`)})
  }

}
  


