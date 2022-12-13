import { GSearchInput } from './input.js'
import { GSearchResults } from './results.js'
import { search } from '../modules/api.js'
import { getLabel } from '../modules/type-label.js'

customElements.define('g-search-input', GSearchInput)
customElements.define('g-search-results', GSearchResults)

class GSearchUI extends HTMLElement {

  // public properties
  timerId
  styles = /* css */`
    g-search-results {
      position: relative;
      width: 100%;
      display: block;
    }
  `
  template = /* html */`
    <style>
      ${ this.styles }
    </style>
    <div class="gsearch">
      <g-search-input></g-search-input>
      <g-search-results></g-search-results>
    </div>
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

  connectedCallback() {
    this.shadowRoot.addEventListener('input-change', (event) => {
      this.debounce(() => {
        if (!event.detail) {
          return
        }
        this.runSearch(event.detail)
      })
    })
    this.shadowRoot.addEventListener('search-road', (event) => {
      // set input text to road + postnr + city
      this.shadowRoot.querySelector('g-search-input').searchString = event.detail.vejnavn
      clearTimeout(this.timerId)
      this.runSearch(event.detail.vejnavn)
    })

    // Clears result list when a result was selected
    this.shadowRoot.addEventListener('gsearch:select', (event) => {
      this.shadowRoot.querySelector('g-search-input').searchString = getLabel(event.detail)
      this.shadowRoot.querySelector('g-search-results').clear()
    })
  }

  runSearch(searchString) {
    search(searchString, this.dataset.token, this.dataset.resources, this.dataset.limit).then((response) => {
      this.shadowRoot.querySelector('g-search-results').results = response
    })
  }

  debounce(func, wait = 500) {
    clearTimeout(this.timerId)
    this.timerId = setTimeout(func, wait)
  }
}

export {
  GSearchUI
}