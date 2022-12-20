import { normalize } from "../modules/data.js"

export class GSearchResultBox extends HTMLElement {

  // public properties
  data = {}


  // setters

  /**
   * @param {any} data
   */
  set result(data) {
    this.data = data
    // husnummer uses `adgangsadressebetegnelse`, adresse uses `adressebetegnelse`. Rest has `praesentation`.
    let title = data.visningstekst
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
  }

  onClick(data) {
    if (this.data.type === 'navngivenvej') {
      this.dispatchEvent(new CustomEvent('search-road', { detail: data, bubbles: true, composed: true }))
    }
    this.dispatchEvent(new CustomEvent('gsearch:select', { detail: normalize(data), bubbles: true, composed: true }))
  }

  updateResult(title) {
    const template = /* html */`
      <p class="gs-title-text">${ title }</p>
    `
    this.innerHTML = template
    this.addEventListener("click", () => {
      this.onClick(this.data)
    })
  }
}