import { GSearchResultBox } from './result-box.js'
import { GSearchNoResultBox } from './no-result-box.js'

customElements.define('g-search-result-box', GSearchResultBox)
customElements.define('g-search-no-result-box', GSearchNoResultBox)

export class GSearchResults extends HTMLElement {

  // public properties
  list_element


  // setters

  /**
   * @param {any[]} data
   */
  set results(data) {
    this.updateResults(data)
  }

  constructor() {
    super()
  }

  createDOM() {
    this.list_element = document.createElement('ul')
    this.list_element.className = 'gs-result-list'

    // Attach the elements to the component DOM
    this.append(this.list_element)
  }

  connectedCallback() { 
    this.createDOM()
  }

  updateResults(data) {
    
    this.list_element.innerHTML = ''

    // If no results, show a message for that
    if (!data[0]) {
      
      const noResultListItem = document.createElement('li')
      noResultListItem.className = 'gs-no-result-item'
      const noResultBox = document.createElement('g-search-no-result-box')

      this.list_element.append(noResultListItem)
      noResultListItem.append(noResultBox)
    
    /* Commented out for testing purposes to show the clean data.
    // find any roadnames so we can hide any adresse/husnummer that matches
    const roads = []
    data.forEach((el) => {
      if (el.type === 'navngivenvej') {
        roads.push(el)
      }
    }) */
    } else {
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

        const listItem = document.createElement('li')
        listItem.className = 'gs-result-item'
        const resultBox = document.createElement('g-search-result-box')
        resultBox.result = el
        listItem.append(resultBox)
        this.list_element.append(listItem)
      })
      // Set first element in list as active
      const first_li_element = this.list_element.querySelector('li')
      first_li_element.classList.add('active')
    }
  }

  /** Clears the result list
   */
  clear() {
    this.list_element.innerHTML = ''
  }

}