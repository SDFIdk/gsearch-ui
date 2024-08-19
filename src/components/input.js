import closeIcon from '@dataforsyningen/designsystem/assets/icons/close.svg'

export class GSearchInput extends HTMLElement {

  // public properties
  input_element
  clear_button
  default_placeholder_text = 'Søg...'
  styles = /* css */`
    g-search-input {
      position: relative;
    }
    g-search-input > input[type=search].hide-icon {
      background-image: none;
    }
    .gs-input-button {
      display: none;
      position: absolute;
      right: 0;
      height: 100%;
      padding-top: 0;
      padding-bottom: 0;
    }
    button.gs-input-button > svg:first-child {
      margin-right: -0.5rem;
    }
  `

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
    // Add css
    const style = document.createElement('style')
    this.append(style)
    style.textContent = this.styles

    // Add input
    this.input_element = document.createElement('input')
    this.input_element.type = 'search'
    this.input_element.className = 'gs-input'
    this.input_element.placeholder = this.dataset.placeholder || this.default_placeholder_text
    // Attach the elements to the component DOM
    this.append(this.input_element)

    // create clear search button
    this.clear_button = document.createElement('button')
    this.clear_button.className = 'quiet gs-input-button'
    this.clear_button.innerHTML = closeIcon
    this.append(this.clear_button)
  }

  connectedCallback() {
    this.input_element.addEventListener('input', event => {
      if (event.target.value === '') {
        // hide cross
        this.input_element.classList.remove('hide-icon')
        this.clear_button.style.display = 'none'
      } else {
        // show cross
        this.input_element.classList.add('hide-icon')
        this.clear_button.style.display = 'inline-flex'
      }
      this.dispatchEvent(new CustomEvent('input-change', { detail: event.target.value, bubbles: true, composed: true }))
    })
    this.clear_button.addEventListener('click', () => {
      this.input_element.value = ''
      this.input_element.dispatchEvent(new Event('input'))
      this.dispatchEvent(new CustomEvent('gsearch:clear', { bubbles: true, composed: true }))
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    if (name === 'data-placeholder') {
      if (newValue) {
        this.input_element.placeholder = newValue
      }
    }
  }
}
