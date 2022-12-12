import { GSearchResultBox } from './result-box.js'
import { GSearchNoResultBox } from './no-result-box.js'

customElements.define('g-search-result-box', GSearchResultBox)
customElements.define('g-search-no-result-box', GSearchNoResultBox)

export class GSearchResults extends HTMLElement {

  // public properties
  styles = /* css */`
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  `
  template = /* html */`
    <style>
      ${this.styles}
    </style>
  `

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
    const list = document.createElement('ul')
    // If no results, show a message for that
    if (!data[0]) {
      const listItem = document.createElement('g-search-no-result-box')
      list.append(listItem)
    }
    /* Commented out for testing purposes to show the clean data.
    // find any roadnames so we can hide any adresse/husnummer that matches
    const roads = []
    data.forEach((el) => {
      if (el.type === 'navngivenvej') {
        roads.push(el)
      }
    }) */
    data.forEach((el) => {
      /* Commented out for testing purposes to show the clean data.
      if (el.type === 'husnummer' || el.type === 'adresse') {
        if (roads.length > 1 && roads.find((road) => {
          return road.vejnavn === el.vejnavn && road.postnummer === el.postnummer
        })) {
          return
        }
      } */
      // if the result boxes end up with enough significant differences to justify a class for each, use this:
      // const listItem = document.createElement('g-search-result-box-' + el.type)
      const listItem = document.createElement('g-search-result-box')
      listItem.result = el
      list.append(listItem)
    })
    this.shadowRoot.innerHTML = this.template
    this.shadowRoot.append(list)
  }
}