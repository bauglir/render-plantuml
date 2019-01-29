class RenderPlantUML extends HTMLElement {
  constructor() {
    super();

    const publicDemoServerAddress = 'http://www.plantuml.com/plantuml';
    const validRenderModes = [ 'png', 'svg' ];

    const plantUmlServerAddress = this.getAttribute('server') || publicDemoServerAddress;
    const renderMode = (this.getAttribute('renderMode') || 'svg').toLowerCase();

    const payload = btoa(this.innerText.trim() || 'license');

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
      fetch(`${plantUmlServerAddress}/${renderMode}/-base64-${payload}`).then(
        response => {
          switch (renderMode) {
            case 'svg':
              this.renderAsSvg(response);
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
}

window.customElements.define('render-plantuml', RenderPlantUML);
