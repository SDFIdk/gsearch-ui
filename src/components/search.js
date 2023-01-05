import { GSearchInput } from './input.js'
import { GSearchResults } from './results.js'
import { search } from '../modules/api.js'

customElements.define('g-search-input', GSearchInput)
customElements.define('g-search-results', GSearchResults)

class GSearchUI extends HTMLElement {

  // public properties
  input_container
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
      background-color: var(--gs-background, #fff);
    }

    .gs-result-item,
    .gs-no-result-item {
      cursor: pointer;
      display: block;
    }

    .gs-title-text {
      margin: 0;
    }

    .gs-result-list .active {
      background-color: var(--gs-current, #eee)
    }
    
    .gs-result-item:hover,
    .gs-result-item:focus {
      background-color: var(--gs-highlight, #ddd);
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
  }

  createDOM() {
    const container = document.createElement('div')
    container.className = 'gs-wrapper'
    container.innerHTML = this.template
    
    // Attach the elements to the component DOM
    this.append(container)

    // Save element references
    this.input_container = this.querySelector('g-search-input')
    this.results_element = this.querySelector('g-search-results')
    this.input_element = this.input_container.querySelector('input')
    
  }

  connectedCallback() {
    this.createDOM()

    // add event listeners
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
      this.input_container.searchString = event.detail.vejnavn
      clearTimeout(this.timerId)
      this.runSearch(event.detail.vejnavn)
    })

    // Clears result list when a result was selected
    this.addEventListener('gsearch:select', (event) => {
      this.input_container.searchString = event.detail.label
      this.results_element.clear()
    })

    // Close result list when user moves focus
    this.addEventListener('blur', () => {
      this.results_element.clear()
    })

    this.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'Enter':
          this.selectActiveItemHandler()
          break
        case 'Escape':
          this.endSearchHandler()
          break
        case 'ArrowDown':
          this.moveActiveItemHandler('next')
          break
        case 'ArrowUp':
          event.preventDefault() // Don't let the cursor return to position 0 in input field
          this.moveActiveItemHandler('previous')
          break
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-placeholder') {
      if (newValue) {
        this.input_container.dataset.placeholder = newValue
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

  setFocusOnElement(element) {
    element.classList.add('active')
    this.input_element.value = element.querySelector('.gs-title-text').innerText
  }

  endSearchHandler() {
    this.input_element.focus()
    this.results_element.clear()
  }

  moveActiveItemHandler(direction) {
    const current_item = this.querySelector('.active')
    const next_item = current_item[`${ direction }Sibling`]
    if (next_item) {
      this.setFocusOnElement(next_item)
      current_item.classList.remove('active')
    }
  }

  selectActiveItemHandler() {
    const current_item = this.querySelector('.active')
    // Dispatch click event to set selection methods on element in motion
    current_item.childNodes[0].dispatchEvent(new Event('click'))
    this.endSearchHandler()
  }

}

export {
  GSearchUI
}
