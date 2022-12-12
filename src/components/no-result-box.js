export class GSearchNoResultBox extends HTMLElement {

  // public properties
  data = {}
  styles = /* css */`
    p {
      margin: 0.5rem 0;
    }
    .result {
      display: flex;
      flex-direction: row;
      border: 1px solid black;
      border-top: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    .result:hover {
      background-color: #F3F3F3;
    }
    .icon, .title {
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