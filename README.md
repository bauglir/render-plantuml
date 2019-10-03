# `render-plantuml` Web Component

A web component capable of rendering PlantUML diagrams using an external
server.

## Installation

Enable the element on any web page using code similar to

```html
<script type="module">
  import enableElement from "./render-plantuml.js"
  enableElement();
</script>
```

## Usage

```html
<render-plantuml>
  Bob -> Alice : Hello
</render-plantuml>
```

PlantUML diagram definitions containing HTML entities either need to have them
escaped or be wrapped in a comment.

### Attributes

* `renderMode` - Used to specify the output format. Should be one of `img`,
                 `png`, `svg` or `txt`. Invalid values show an error. Defaults
                 to `svg`.
* `server` - The address of the server to use for rendering the PlantUML
             diagrams. Defaults to the publicly available demo server at
             http://plantuml.com/plantuml. Note that this server does not use
             HTTPS!