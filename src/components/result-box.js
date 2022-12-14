import { normalize } from "../modules/data.js"

export class GSearchResultBox extends HTMLElement {

  // public properties
  data = {}
  styles = /* css */`
    p {
      margin: 0.5rem 0;
    }
    .result {
      display: flex;
      flex-direction: row;
      border: 1px solid var(--border-color, #000);
      border-top: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      background-color: var(--background-color, #fff);
    }
    .result:hover {
      background-color:  var(--highlight-color, #F3F3F3);
    }
    .icon, .title {
      display: inline-block;
    }
  `

  // getters

  // setters

  /**
   * @param {any} data
   */
  set result(data) {
    this.data = data
    // husnummer uses `adgangsadressebetegnelse`, adresse uses `adressebetegnelse`. Rest has `praesentation`.
    let title = data.praesentation || data.adgangsadressebetegnelse || data.adressebetegnelse
    /* Commented out for testing purposes to show the clean data.
    if (data.type === 'navngivenvej') { // add postnummer and postdistrikter to name
      title += ' ' + data.postnummer + ' ' + data.postdistrikter
    } else if (data.type === 'matrikelnummer') { // add postnummer and postdistrikter to name
      title += ' (Matrikel)'
    }
    */
    this.updateResult(title)
  }

  constructor() {
    super()
    this.createShadowDOM()
  }

  createShadowDOM() {
    // Create a shadow root
    this.attachShadow({mode: 'open'}) // sets and returns 'this.shadowRoot'
    this.container = document.createElement('li')
    // this.container.innerHTML = this.template
    // Attach the elements to the shadow DOM
    this.shadowRoot.append(this.container)
  }

  onClick(data) {
    if (this.data.type === 'navngivenvej') {
      this.dispatchEvent(new CustomEvent('search-road', { detail: data, bubbles: true, composed: true }))
    }
    this.dispatchEvent(new CustomEvent('gsearch:select', { detail: normalize(data), bubbles: true, composed: true }))
  }

  updateResult(title) {
    const template = /* html */`
      <style>
        ${this.styles}
      </style>
      <div class="result">
        <div class="title">
          <p class="title-text">${ title }</p>
        </div>
        <div class="arrow"></div>
      </div>
    `
    this.container.innerHTML = template
    this.container.querySelector('.result').addEventListener("click", () => {
      this.onClick(this.data)
    })
  }
}