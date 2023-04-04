export class GSearchInput extends HTMLElement {

  // public properties
  input_element
  default_placeholder_text = 'Søg...'

  // getters
  static get observedAttributes() { 
    return [
      'data-placeholder'
    ]
  }


  // setters

  /**
   * @param {string} searchString
   */
  set searchString(searchString) {
    this.input_element.value = searchString
  }

  constructor() {
    super()
    this.createDOM()
  }

  createDOM() {
    this.input_element = document.createElement('input')
    this.input_element.type = 'search'
    this.input_element.className = 'gs-input'
    this.input_element.placeholder = this.dataset.placeholder || this.default_placeholder_text
    // Attach the elements to the component DOM
    this.append(this.input_element)
  }

  connectedCallback() {
    this.input_element.addEventListener('input', (event) => {
      this.dispatchEvent(new CustomEvent('input-change', { detail: event.target.value, bubbles: true, composed: true }))
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-placeholder') {
      if (newValue) {
        this.input_element.placeholder = newValue
      }
    }
  }
}
