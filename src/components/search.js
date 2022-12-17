import { GSearchInput } from './input.js'
import { GSearchResults } from './results.js'
import { search } from '../modules/api.js'

customElements.define('g-search-input', GSearchInput)
customElements.define('g-search-results', GSearchResults)

class GSearchUI extends HTMLElement {

  // public properties
  input_element
  results_element
  timerId
  styles = /* css */`

    .gs-input {
      box-sizing: border-box;
    }

    g-search-results {
      position: relative; 
      width: 100%; 
      display: block;
    }

    .gs-result-list {
      position: absolute; 
      top: 0; 
      left: 0; 
      right: 0; 
      list-style: none; 
      padding: 0; 
      margin: 0;
    }

    .gs-result-item,
    .gs-no-result-item {
      cursor: pointer;
      display: block;
    }

    .gs-title-text {
      margin: 0;
    }

    .gs-result-item:hover,
    .gs-result-item:focus {
      background-color: var(--highlight, #eee);
    }
  `
  template = /* html */`
    <style>
      ${ this.styles }
    </style>
    <g-search-input data-placeholder="${ this.dataset.placeholder || '' }"></g-search-input>
    <g-search-results></g-search-results>
  `

  // getters
  static get observedAttributes() { 
    return [
      'data-placeholder'
    ]
  }

  constructor() {
    super()
    this.createDOM()
  }

  createDOM() {
    const container = document.createElement('div')
    container.className = 'gs-wrapper'
    container.innerHTML = this.template
    
    // Attach the elements to the component DOM
    this.append(container)

    // Save element references
    this.input_element = this.querySelector('g-search-input')
    this.results_element = this.querySelector('g-search-results')
  }

  connectedCallback() {
    this.addEventListener('input-change', (event) => {
      this.debounce(() => {
        if (!event.detail) {
          return
        }
        this.runSearch(event.detail)
      })
    })
    this.addEventListener('search-road', (event) => {
      // set input text to road + postnr + city
      this.input_element.searchString = event.detail.vejnavn
      clearTimeout(this.timerId)
      this.runSearch(event.detail.vejnavn)
    })

    // Clears result list when a result was selected
    this.addEventListener('gsearch:select', (event) => {
      this.input_element.searchString = event.detail.label
      this.results_element.clear()
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-placeholder') {
      if (newValue) {
        this.input_element.dataset.placeholder = newValue
      }
    }
  }

  runSearch(searchString) {
    search(searchString, this.dataset.token, this.dataset.resources, this.dataset.limit).then((response) => {
      this.results_element.results = response
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