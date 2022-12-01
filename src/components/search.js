import { GSearchInput } from './input.js'
import { GSearchResults } from './results.js'
import { search } from '../modules/api.js'

customElements.define('g-search-input', GSearchInput)
customElements.define('g-search-results', GSearchResults)

export class GSearch extends HTMLElement {

  // public properties
  timerId
  styles = /* css */``
  template = /* html */`
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
        search(event.detail, this.dataset.token).then((response) => {
          this.shadowRoot.querySelector('g-search-results').results = response
        })
      })
    })
    this.shadowRoot.addEventListener('search-road', (event) => {
      // set input text to road + postnr + city
      this.shadowRoot.querySelector('g-search-input').searchString = event.detail.vejnavn
      clearTimeout(this.timerId)
      search(event.detail.vejnavn, this.dataset.token).then((response) => {
        this.shadowRoot.querySelector('g-search-results').results = response
      })
    })
  }

  debounce(func, wait = 500) {
    clearTimeout(this.timerId)
    this.timerId = setTimeout(func, wait)
  }
}
