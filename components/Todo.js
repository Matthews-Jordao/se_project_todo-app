class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._templateElement = document.querySelector(selector);
    this._todoElement = null;
  }

  // Private method to set event listeners
  _setEventListeners() {
    const deleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const checkbox = this._todoElement.querySelector(".todo__completed");

    // Delete button removes the todo element
    deleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    // Checkbox toggles completed status (UI only)
    checkbox.addEventListener("change", () => {
      this._data.completed = checkbox.checked;
      // Optionally, you could add a class to visually indicate completion
      // this._todoElement.classList.toggle("todo_completed", checkbox.checked);
    });
  }

  // Public method to generate and return the todo element
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");

    // Set name
    todoNameEl.textContent = this._data.name;

    // Set completed status
    todoCheckboxEl.checked = !!this._data.completed;

    // Set id and for attributes (handle undefined id for new todos)
    const todoId = this._data.id || crypto.randomUUID();
    todoCheckboxEl.id = `todo-${todoId}`;
    todoLabel.setAttribute("for", `todo-${todoId}`);

    // Set due date if present and valid
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

    // Set up event listeners
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;