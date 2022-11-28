import { GSearchInput } from './input.js'
import { search } from '../modules/api.js'

customElements.define('gsearch-input', GSearchInput)

export class GSearch extends HTMLElement {

  // public properties
  styles = /* css */``
  template = /* html */`
    <div class="gsearch">
      <gsearch-input></gsearch-input>
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
    console.log(this.dataset)
    search('e', 'fd44f26ab5701c01ca9f570e507fe9ab').then((response) => {
      console.log(response)
    })
  }

}