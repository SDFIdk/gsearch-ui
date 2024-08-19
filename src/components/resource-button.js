import { FALLBACK_ICON } from '../constants.js'

export class GSearchResourceButton extends HTMLElement {

  // public properties
  container
  styles = /* css */`
    .gs-button {
      height: auto;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  `
  template = /* html */`
    <style>
      ${ this.styles }
    </style>
  `

  // getters
  static get observedAttributes() { 
    return [
      'data-resource',
      'data-enabled',
      'data-title',
      'data-icon'
    ]
  }

  constructor() {
    super()
  }

  createDOM() {
    this.container = document.createElement('button')
    this.container.className = 'gs-button ' + (this.dataset.enabled ? '' : 'secondary')
    this.container.innerHTML = this.template
    this.container.insertAdjacentHTML('afterbegin', this.dataset.icon ? this.dataset.icon : FALLBACK_ICON)
    this.container.insertAdjacentHTML('beforeend', (this.dataset.title || this.dataset.resource))

    // Attach the elements to the component DOM
    this.append(this.container)
  }

  connectedCallback() { 
    this.createDOM()
  }

  setEnabled(enabled) {
    if (enabled) {
      this.container.classList.remove('secondary')
    } else {
      this.container.classList.add('secondary')
    }
  }
}
