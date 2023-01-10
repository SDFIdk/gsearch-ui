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
    if (data.type === 'navngivenvej') {
      title += ' ' + data.postnummer + ' ' + data.postnummernavne
    } else if (data.type === 'matrikel') {
      title += ' (Matrikel)'
    }
    */
    this.updateResult(title)
  }

  constructor() {
    super()
  }

  updateResult(title) {
    const template = /* html */`
      <p class="gs-title-text">${ title }</p>
    `
    this.innerHTML = template
  }
}
