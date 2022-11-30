export class GSearchResultBox extends HTMLElement {

  // public properties
  data = {}
  styles = /* css */`
    .result {
      display: flex;
      flex-direction: row;
    }
    .icon, .title {
      display: inline-block;
    }
  `

  // getters

  // setters

  /**
   * @param {any} data
   */
  set result(data) {
    this.data = data
    this.updateResult(data.type, data.skrivemaade)
  }

  constructor() {
    super()
    this.createShadowDOM()
  }

  createShadowDOM() {
    // Create a shadow root
    this.attachShadow({mode: 'open'}) // sets and returns 'this.shadowRoot'
    this.container = document.createElement('li')
    // this.container.innerHTML = this.template
    // Attach the elements to the shadow DOM
    this.shadowRoot.append(this.container)
  }

  updateResult(icon, title) {
    const template = /* html */`
      <style>
        ${this.styles}
      </style>
      <div class="result">
        <div class="icon">
          <p class="icon-text">${ icon }</p>
        </div>
        <div class="title">
          <p class="title-text">${ title }</p>
        </div>
        <div class="arrow"></div>
      </div>
    `
    this.container.innerHTML = template
  }
}