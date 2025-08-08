
class TodoCounter {
  // Set up the counter and display the initial counts
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // The element that shows the counter
    this._completed = todos.filter(todo => todo.completed).length; // Number of completed todos
    this._total = todos.length; // Total number of todos
    this._updateText(); // Show the initial text
  }

  // Update the completed count (call when a todo is checked/unchecked or a completed todo is deleted)
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  // Update the total count (call when a todo is added or deleted)
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  // Update the counter text in the DOM
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
