import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Use the new Todo class to generate todo elements
const generateTodo = (data) => {
  // If no id, generate one for new todos
  if (!data.id) {
    data.id = uuidv4();
  }
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Helper to generate and append a todo
function renderTodo(todoData) {
  const todo = generateTodo(todoData);
  todosList.append(todo);
}

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Guard: Only proceed if the form is valid
  if (!addTodoForm.checkValidity()) {
    return;
  }

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const newTodoData = { name, date };
  renderTodo(newTodoData);
  closeModal(addTodoPopup);

  // Reset validation and form controls after successful submission
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
