import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");

// Instantiate TodoCounter
const todoCounter = new TodoCounter(initialTodos, '.counter__text');

// Helper to generate a todo element
function generateTodo(data) {
  // Validate required fields
  if (!data || typeof data.name !== 'string' || data.name.trim() === '') {
    console.error('Invalid todo data:', data);
    return null;
  }
  if (!data.id) {
    data.id = uuidv4();
  }
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
}


// Instantiate Section for rendering todos
const section = new Section({
  items: initialTodos,
  renderer: (item) => generateTodo(item),
  containerSelector: ".todos__list"
});

// Helper to add a new todo and update the counter
function renderTodo(todoData) {
  const todoElement = generateTodo(todoData);
  if (todoElement) {
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
  }
}

// Set up form validator before popup so it's always defined
const form = document.forms["add-todo-form"];
const formValidator = new FormValidator(validationConfig, form);
formValidator.enableValidation();

// Instantiate PopupWithForm for the add-todo popup
const addTodoPopup = new PopupWithForm('#add-todo-popup', (inputValues) => {
  if (!form.checkValidity()) {
    return;
  }
  const name = inputValues.name;
  const dateInput = inputValues.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const newTodoData = { name, date };
  renderTodo(newTodoData);
  addTodoPopup.close();
  formValidator.resetValidation();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Render initial todos using Section
section.renderItems();
