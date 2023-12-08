import { GSearchInput } from './input.js'
import { GSearchResults } from './results.js'
import { GSearchResources } from './resources.js'
import { search, setApiUrl } from '../modules/api.js'
import { RESOURCES } from '../constants.js'

customElements.define('g-search-input', GSearchInput)
customElements.define('g-search-results', GSearchResults)
customElements.define('g-search-resources', GSearchResources)

class GSearchUI extends HTMLElement {

  // public properties
  input_container
  resources = [] // element containing a list of the selected resources and whether they are enabled/disabled
  results_element
  timerId
  styles = /* css */`
    .gs-input {
      box-sizing: border-box;
    }

    g-search-input {
      display: block;
      height: fit-content;
    }

    g-search-results {
      position: relative; 
      width: 100%; 
      display: block;
    }

    g-search-result-box {
      display: flex;
      align-items: center;
    }

    g-search-resources {
      display: block;
      margin: 0.5rem 0;
    }

    .gs-result-list {
      position: absolute; 
      top: 0; 
      left: 0; 
      right: 0; 
      list-style: none; 
      padding: 0; 
      margin: 0;
      background-color: var(--grey1, #ddd);
    }

    .gs-result-item {
      cursor: pointer;
    }

    .gs-result-item,
    .gs-no-result-item {
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

    .gs-result-item,
    .gs-no-result-item {
      padding: 0.5rem 0.25rem;
      background-color: var(--gs-background, #fff);
    }

    .gs-resources-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .hidden {
      display: none;
    }
  `
  template = /* html */`
    <style>
      ${ this.styles }
    </style>
    <g-search-input></g-search-input>
    <g-search-resources class="hidden"></g-search-resources>
    <g-search-results></g-search-results>
  `

  // getters
  static get observedAttributes() { 
    return [
      'data-placeholder',
      'data-api',
      'data-filter',
      'data-resources',
      'data-resource-filter-enabled'
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
    this.results_element = this.querySelector('g-search-results')
    this.resources_element = this.querySelector('g-search-resources')
    this.input_container = this.querySelector('g-search-input')
    this.input_element = this.input_container.querySelector('input')
  }

  connectedCallback() {
    this.createDOM()
    // Update some values based on attributes
    if (this.dataset.placeholder) {
      this.input_container.dataset.placeholder = this.dataset.placeholder 
    }
    if (this.dataset.api) {
      setApiUrl(this.dataset.api)
    }
    this.setResources(this.dataset.resources)
    if (this.dataset.resourceFilterEnabled === 'true') this.resources_element?.classList.remove('hidden')

    // add event listeners
    this.addEventListener('input-change', event => {
      this.debounce(() => {
        if (!event.detail || !(/\S/.test(event.detail))) {
          this.results_element.clear()
          return
        }
        this.runSearch(event.detail)
      })
    })

    this.addEventListener('search-road', event => {
      // set input text to road + postnr + city
      this.input_container.searchString = event.detail.vejnavn
      clearTimeout(this.timerId)
      this.runSearch(event.detail.vejnavn)
    })

    // Clears result list when a result was selected
    this.addEventListener('gsearch:select', event => {
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
    if (oldValue === newValue) return
    if (name === 'data-placeholder') {
      if (newValue && this.input_container) {
        this.input_container.dataset.placeholder = newValue
      }
    }
    if (name === 'data-resources') {
      this.setResources(newValue)
    }
    if (name === 'data-resource-filter-enabled') {
      const bool = newValue === 'true'
      if (bool) {
        this.resources_element?.classList.remove('hidden')
      } else {
        this.resources_element?.classList.add('hidden')
      }
    }
    if (name === 'data-api') {
      setApiUrl(newValue)
    }
  }

  setResources(resources) {
    if (!resources) return
    this.resources = resources.split(',').map(resource => {
      const oldR = this.resources.find(r => r.resource === resource)
      const rInfo = RESOURCES.find(r => r.resource === resource)
      return { 
        resource: resource,
        title: rInfo ? rInfo.title : resource,
        icon: rInfo ? rInfo.icon : '',
        enabled: oldR ? oldR.enabled : true
      }
    })
    this.resources_element?.updateButtons(this.resources)
  }

  runSearch(searchString) {
    let resourceString = this.resources.filter(r => r.enabled).map(r => {
      return r.resource
    }).toString()
    if (!resourceString) resourceString = this.dataset.resources
    search(searchString, this.dataset.token, resourceString, this.dataset.limit, this.dataset.filter).then((response) => {
      this.results_element.results = response.flat()
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
    current_item.dispatchEvent(new Event('click'))
    this.endSearchHandler()
  }

}

export {
  GSearchUI
}
