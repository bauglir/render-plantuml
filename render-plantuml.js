class RenderPlantUMLElement extends HTMLElement {
  constructor() {
    super();

    const publicDemoServerAddress = 'http://www.plantuml.com/plantuml';
    const validRenderModes = [ 'png', 'svg', 'txt' ];

    const plantUmlServerAddress = this.getAttribute('server') || publicDemoServerAddress;
    const renderMode = (this.getAttribute('renderMode') || 'svg').toLowerCase();

    const diagramDescription = this.innerText.trim() || 'license';

    // Convert the diagram description into a hex-encoded string for easier
    // inclusion in URIs. Other encodings are possible (deflate, base64), but
    // those either require additional dependencies or have caused issues with
    // certain diagram definitions (e.g. with multiple includes)
    const payload = diagramDescription.split('').map(
      // Make sure the stringified hex representation is always at least 2
      // digits long, otherwise the encoding will not be interpreted correctly
      // by the server
      char => `0${char.codePointAt(0).toString(16)}`.slice(-2)
    ).join('');

    this.renderedContainer = this.attachShadow({ mode: 'open' });

    const styleSheet = document.createElement('style');
    styleSheet.textContent = '.error { color: red }';
    this.renderedContainer.appendChild(styleSheet);

    if (validRenderModes.indexOf(renderMode) < 0) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error');
      errorMessage.innerText = `Invalid render mode '${renderMode}'. `
        + `Must be one of '${validRenderModes.join('\', \'')}'.`;

      this.renderedContainer.appendChild(errorMessage);
    } else {
      fetch(`${plantUmlServerAddress}/${renderMode}/-hex-${payload}`).then(
        response => {
          switch (renderMode) {
            case 'svg':
              this.renderAsSvg(response);
              break;
            case 'txt':
              this.renderAsTxt(response);
              break;
            default:
              this.renderAsPng(response);
          }
        }
      );
    }
  }

  renderAsPng(response) {
    response.blob().then(pngContent => {
      const image = document.createElement('img');
      image.src = window.URL.createObjectURL(pngContent);
      this.renderedContainer.appendChild(image);
    });
  }

  renderAsSvg(response) {
    response.text().then(svgContent => this.renderedContainer.appendChild(
        document.createRange().createContextualFragment(svgContent)
    ));
  }

  renderAsTxt(response) {
    response.text().then(textContent => {
      const preTag = document.createElement('pre');
      preTag.innerText = textContent;
      this.renderedContainer.appendChild(preTag);
    });
  }
}

export const enableElement = () => {
  window.customElements.define('render-plantuml', RenderPlantUMLElement);
};
