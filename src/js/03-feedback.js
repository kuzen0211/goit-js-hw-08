import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', throttle(onFormInput, 500));
refs.textarea.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('input', onFormDataCollect);

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

insertData();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
}

function onFormInput() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function insertData() {
  const saveData = localStorage.getItem(STORAGE_KEY);
  const parseSaveData = JSON.parse(saveData);

  if (saveData) {
    refs.input.value = parseSaveData.email;
    refs.textarea.value = parseSaveData.message;
  }
}

function onFormDataCollect(e) {
  formData[e.target.name] = e.target.value;
}
