import throttle from 'lodash.throttle';

const userData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener(
  'input',
  throttle(event => {
    userData[event.target.name] = event.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(userData));
  }),
  500
);

function onFormSubmit(event) {
  event.preventDefault();
  const savedStorage = localStorage.getItem('feedback-form-state');
  const parsedStorage = JSON.parse(savedStorage);
  console.log(parsedStorage);
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function populateTextarea() {
  const unparsedStorage = localStorage.getItem('feedback-form-state');
  const parsedStorage = JSON.parse(unparsedStorage);
  if (unparsedStorage) {
    refs.email.value = parsedStorage.email;
    refs.textarea.value = parsedStorage.message;
  }
}
