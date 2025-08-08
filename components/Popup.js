
class Popup {
  // Set up the popup and bind the Escape key handler
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // The popup DOM element
    this._handleEscClose = this._handleEscClose.bind(this); // Ensure correct 'this' for event handler
  }

  // Close the popup when Escape is pressed
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Open the popup and listen for Escape key
  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Close the popup and remove Escape key listener
  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Set up listeners for overlay and close button
  setEventListeners() {
    // Close when clicking the overlay
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
    // Close when clicking the close button
    const closeBtn = this._popup.querySelector(".popup__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }
  }
}

export default Popup;
