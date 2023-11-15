export class GSearchResourceButton extends HTMLElement {

  // public properties
  container
  styles = /* css */`
    button[class*=ds-icon-] {
      height: auto;
      padding: 0.25rem 0.5rem 0.25rem 2rem;
    }

    .ds-icon-icon-plus::before {
      background-size: 1.25rem auto;
      width: 1.25rem;
      height: 1.25rem;
      top: auto;
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
    // replace icon name below with: this.dataset.icon
    this.container.className = 'gs-button ' + ('ds-icon-icon-plus ' || ' ') + (this.dataset.enabled ? '' : 'outline')
    this.container.innerHTML = this.template
    this.container.insertAdjacentHTML('beforeend', (this.dataset.title || this.dataset.resource))

    // Attach the elements to the component DOM
    this.append(this.container)
  }

  connectedCallback() { 
    this.createDOM()
  }

  setEnabled(enabled) {
    if (enabled) {
      this.container.classList.remove('outline')
    } else {
      this.container.classList.add('outline')
    }
  }
}
