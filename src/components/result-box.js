import { RESOURCES, FALLBACK_ICON } from '../constants.js'

export class GSearchResultBox extends HTMLElement {

  // public properties
  data = {}
  styles = /* css */`
    g-search-result-box > svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.25rem;
    }
    g-search-result-box > p {
      display: inline-block;
    }
  `

  // setters

  /**
   * @param {any} data
   */
  set result(data) {
    this.data = data
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
    const rInfo = RESOURCES.find(r => r.resource === this.data.type)
    const template = /* html */`
      <style>${ this.styles }</style>
      ${ rInfo.icon ? rInfo.icon : FALLBACK_ICON }
      <p class="gs-title-text">${ title }</p>
    `
    this.innerHTML = template
  }
}
