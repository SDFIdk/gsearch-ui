export class GSearchInput extends HTMLElement {

  // public properties
  placeholder_text = 'søg...'
  styles = /* css */``
  template = /* html */`
    <input type="text" placeholder="${ this.placeholder_text }">
  `

  // getters

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
}