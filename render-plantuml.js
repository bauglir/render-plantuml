class RenderPlantUML extends HTMLElement {
  constructor() {
    super();

    fetch('http://www.plantuml.com/plantuml/svg/oybCJiqhJWK0').then(response =>
      response.text().then(svgContent => {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.appendChild(
          document.createRange().createContextualFragment(svgContent)
        )
      })
    );
  }
}

window.customElements.define('render-plantuml', RenderPlantUML);
