
class Todo {
  // Create a new todo item instance
  constructor(data, selector) {
    this._data = data; // The todo data object
    this._selector = selector; // The template selector string
    this._templateElement = document.querySelector(selector); // The template element
    this._todoElement = null; // Will hold the generated todo DOM element
  }

  // Set up event listeners for delete and checkbox actions
  _setEventListeners() {
    const deleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const checkbox = this._todoElement.querySelector(".todo__completed");

    // Remove the todo from the DOM when delete button is clicked
    deleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    // Update the completed status when the checkbox is toggled
    checkbox.addEventListener("change", () => {
      this._data.completed = checkbox.checked;
      // You could also visually indicate completion here if desired
    });
  }

  // Generate the todo DOM element from the template and fill in data
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");

    // Set the todo name
    todoNameEl.textContent = this._data.name;

    // Set the checkbox to reflect completed status
    todoCheckboxEl.checked = !!this._data.completed;

    // Assign unique id and label for accessibility
    const todoId = this._data.id || crypto.randomUUID();
    todoCheckboxEl.id = `todo-${todoId}`;
    todoLabel.setAttribute("for", `todo-${todoId}`);

    // Show due date if present and valid
    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        todoDate.textContent = "";
      }
    } else {
      todoDate.textContent = "";
    }

    // Attach event listeners for this todo
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;