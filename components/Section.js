
class Section {
  // Set up the section with items, a renderer, and a container selector
  constructor({items, renderer, containerSelector}) {
    this._items = items; // Array of data to render
    this._renderer = renderer; // Function to create a DOM element from data
    this._container = document.querySelector(containerSelector); // Where to add items
  }

  // Render all items in the array using the renderer and add them to the container
  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  // Add a single DOM element to the container
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;