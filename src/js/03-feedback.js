import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let fieldData = {};


form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

onPopulateMessageOutput();

function onFormSubmit(evt) {

    const formData = new FormData(form);

    formData.forEach((value, name) => console.log(value, name));


    const formElements = evt.currentTarget.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;

    if (email.length && message.length) {
        evt.preventDefault();
        console.log(fieldData);
        evt.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
        fieldData = {};

    } else {
        alert(`Все поля должны быть заполнены!`);
    };
        
};

function onFormInput(evt) {

    fieldData[evt.target.name] = evt.target.value;
            
    const records = JSON.stringify(fieldData);
        
    localStorage.setItem(STORAGE_KEY, records);
  
}

function onPopulateMessageOutput() {
    let savedMessage = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedMessage);
    
    if (parsedData) {
        Object.entries(parsedData).forEach(([name, value]) => {
            fieldData[name] = value;
            form.elements[name].value = value;
        });

    }
}

