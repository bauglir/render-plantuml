class RenderPlantUML extends HTMLElement {
  constructor() {
    super();

    const publicDemoServerAddress = 'http://www.plantuml.com/plantuml';
    const plantUmlServerAddress = this.getAttribute('server') || publicDemoServerAddress;

    fetch(`${plantUmlServerAddress}/svg/oybCJiqhJWK0`).then(response =>
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
