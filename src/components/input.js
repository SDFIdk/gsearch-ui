export class GSearchInput extends HTMLElement {

  // public properties
  default_placeholder_text = 'søg...'
  styles = /* css */`
    input {
      box-sizing: border-box;
      width: var(--gs-input-width, 100%);
      padding: var(--gs-input-padding, 0.5rem);
      border: var(--gs-border-width, 1px) solid var(--gs-border-color, #000);
      background-color: var(--gs-background-color, transparent);
    }
  `
  template = /* html */`
    <style>
      ${this.styles}
    </style>
    <input type="text" placeholder="${ this.dataset.placeholder || this.default_placeholder_text }">
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
    const input = this.shadowRoot.querySelector('input').value = searchString
  }

  constructor() {
    super()
    this.createShadowDOM()
  }

  createShadowDOM() {
    // Create a shadow root
    this.attachShadow({mode: 'open'}) // sets and returns 'this.shadowRoot'
    const container = document.createElement('article')
    container.innerHTML = this.template
    // Attach the elements to the shadow DOM
    this.shadowRoot.append(container)
  }

  connectedCallback() {
    const input = this.shadowRoot.querySelector('input')
    input.addEventListener('input', (event) => {
      this.dispatchEvent(new CustomEvent('input-change', { detail: input.value, bubbles: true, composed: true }))
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-placeholder') {
      if (newValue) {
        this.shadowRoot.querySelector('input').placeholder = newValue
      }
    }
  }
}
