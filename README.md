# `render-plantuml` Web Component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/render-plantuml)

A web component capable of rendering PlantUML diagrams using an external
server.

## Installation

Enable the element on any web page using code similar to

```html
<script type="module">
  import enableElement from 'https://cdn.pika.dev/render-plantuml';
  enableElement();
</script>
```

## Usage

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script type="module">
      import enableElement from './dist-web/index.min.js';
      enableElement();
    </script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<render-plantuml>
  <!--
    /' The diagram definition is inside an HTML comment as it contains
       characters (i.e. `>`) with meaning in HTML. This is not necessary in all
       cases, but some care should be taken when using these characters '/
    Bob -> Alice : Hello
  -->
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
* `src` - An absolute URI to a file containing a PlantUML description. The file
          needs to be available to the `server` that is used. Defining a `src`
          takes precedence over any PlantUML defined within the element!
