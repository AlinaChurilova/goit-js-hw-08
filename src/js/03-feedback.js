import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
onPopulateMessageOutput();
function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(formData)
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  
    
};
function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    
  
    const records = JSON.stringify(formData);
    
    localStorage.setItem(STORAGE_KEY, records);
  
}
function onPopulateMessageOutput() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedMessage);
    if (parsedData) {
      
        refs.textarea.value = parsedData.message;
        refs.email.value = parsedData.email;
    };
}
