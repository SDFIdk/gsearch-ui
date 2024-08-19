import { GSearchResourceButton } from './resource-button.js'

if (!customElements.get('g-search-resource-button')) {
  customElements.define('g-search-resource-button', GSearchResourceButton)
}

export class GSearchResources extends HTMLElement {

  // public properties
  list_element

  constructor() {
    super()
  }

  createDOM() {
    this.list_element = document.createElement('article')
    this.list_element.className = 'gs-resources-list'

    // Attach the elements to the component DOM
    this.append(this.list_element)
  }

  connectedCallback() {
    this.createDOM()
  }

  updateButtons(resources) {
    const buttons = []
    resources.forEach(resource => {
      const button = document.createElement('g-search-resource-button')
      button.dataset.resource = resource.resource
      button.dataset.title = resource.title
      button.dataset.icon = resource.icon
      button.dataset.enabled = resource.enabled
      button.addEventListener('click', () => {
        resource.enabled = !resource.enabled
        button.setEnabled(resource.enabled)
      })
      buttons.push(button)
    })
    this.list_element.innerHTML = ''
    buttons.forEach(button => this.list_element.append(button))
  }
}
