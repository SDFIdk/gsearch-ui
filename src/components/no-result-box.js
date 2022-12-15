export class GSearchNoResultBox extends HTMLElement {

  // public properties
  data = {}
  styles = /* css */`
    p {
      margin: 0;
    }
    .result {
      display: flex;
      flex-direction: row;
      border: var(--gs-border-width, 1px) solid var(--gs-border-color, #000);
      border-top: none;
      padding: var(--gs-list-padding, 0.5rem 1rem);
      cursor: pointer;
    }
    .title {
      display: inline-block;
    }
  `
  template = /* html */`
    <style>
      ${this.styles}
    </style>
    <div class="result">
      <div class="title">
        <p class="title-text">Der er ingen resultater der matchede din søgning.</p>
      </div>
    </div>
  `

  // getters

  // setters

  constructor() {
    super()
    this.createShadowDOM()
  }

  createShadowDOM() {
    // Create a shadow root
    this.attachShadow({mode: 'open'}) // sets and returns 'this.shadowRoot'
    this.container = document.createElement('li')
    this.container.innerHTML = this.template
    // Attach the elements to the shadow DOM
    this.shadowRoot.append(this.container)
  }
}