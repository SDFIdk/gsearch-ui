import { GSearchResultBox } from './result-box.js'

customElements.define('g-search-result-box', GSearchResultBox)

export class GSearchResults extends HTMLElement {

  // public properties
  styles = /* css */``
  template = /* html */``

  // getters

  // setters

  /**
   * @param {any[]} data
   */
  set results(data) {
    this.updateResults(data)
  }

  constructor() {
    super()
    this.createShadowDOM()
  }

  createShadowDOM() {
    // Create a shadow root
    this.attachShadow({mode: 'open'}) // sets and returns 'this.shadowRoot'
    const container = document.createElement('ul')
    container.innerHTML = this.template
    // Attach the elements to the shadow DOM
    this.shadowRoot.append(container)
  }

  updateResults(data) {
    console.log(data)
    const list = document.createElement('ul')
    data.forEach((el) => {
      // const listItem = document.createElement('g-search-result-box-' + el.type)
      const listItem = document.createElement('g-search-result-box')
      listItem.result = el
      list.append(listItem)
    })
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.append(list)
  }
}