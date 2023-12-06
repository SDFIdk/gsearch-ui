import icons from '@dataforsyningen/designsystem/assets/designsystem-icons.svg'

export class GSearchResourceButton extends HTMLElement {

  // public properties
  container
  styles = /* css */`
    .gs-button {
      height: auto;
      padding: 0.25rem 0.5rem 0.25rem 0.25rem;
    }

    .gs-button > svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.25rem;
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
    this.container.insertAdjacentHTML('beforeend', `<svg><use href="${ icons + '#' + this.dataset.icon}"></svg>`)
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
