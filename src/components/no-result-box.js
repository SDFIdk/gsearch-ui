export class GSearchNoResultBox extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = '<p class="gs-title-text">Der er ingen resultater, der matchede din søgning.</p>'
  }
}