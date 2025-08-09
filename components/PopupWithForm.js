import Popup from "./Popup.js";


class PopupWithForm extends Popup {
  // Return the cached form element
  getForm() {
    return this._form;
  }
  // Set up the popup with a form and a submit handler
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // Callback for form submission
    this._form = this._popup.querySelector(".popup__form"); // The form element inside the popup
    this._inputList = Array.from(this._form.querySelectorAll("input, textarea")); // All form inputs
  }

  // Gather all input values from the form and return as an object
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Set up listeners for the popup and handle form submission
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset(); // Reset only after successful submission
    });
  }

  // Close the popup and reset the form fields
  close() {
  super.close();
  // Do not reset the form here; only reset after successful submission
  }
}

export default PopupWithForm;
