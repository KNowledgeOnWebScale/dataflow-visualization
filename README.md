# Flow Visualization

This is an application to generate flow graphs from JSON.

## How to run

Visit https://tibostr.github.io/dataflow-visualization/. If you want to run this application locally, run `npm start`
and open http://localhost:3000/.

## Documentation

If you [run the application](#how-to-run), you'll see that there are three editors. One to
set [global defaults](#global-defaults), one to describe the [nodes](#nodes) and one for the [connections](#edges)
between these nodes.

### Global defaults

Global defaults are useful when a lot of nodes and/or edges have the same properties and you don't want to repeat
yourself everytime. These global default values are used as fallbacks if certain properties are not specified within the
nodes or edges.

|        Key        |                                                                                                     Possible Values                                                                                                     |            Default             | Explanation                                                                                                                                                                                                                                                                                                                                              |  
|:-----------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    `edgeColor`    |                               Any [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color_keywords) is valid, e.g. `steelblue`, `#FFD700`, `rgb(65, 105, 225)` ...                               |            `black`             | The color of the edges between the nodes.                                                                                                                                                                                                                                                                                                                |
|  `edgeThickness`  |                                                                                                       Any number                                                                                                        |             `1.2`              | The thickness of the edges between the nodes.                                                                                                                                                                                                                                                                                                            |
|      `fill`       |                                                                                                      Any CSS color                                                                                                      |            `white`             | The color of the nodes.                                                                                                                                                                                                                                                                                                                                  |  
|    `fontsize`     |                                                                                                       Any number                                                                                                        |              `12`              | The fontsize of the text in the nodes.                                                                                                                                                                                                                                                                                                                   |
|      `shape`      |                                  `8-star`, `big-star`, `circle`, `cylinder`, `diamond`, `hexagon`, `note`, `rectangle`, `square`, `star`, `triangle`,<br/>`comunica`,`rmlio`, `solid`                                   |            `square`            | The shape of the nodes.                                                                                                                                                                                                                                                                                                                                  |
|     `stroke`      |                                                                                                      Any CSS color                                                                                                      |            `black`             | The color of the stroke of the nodes.                                                                                                                                                                                                                                                                                                                    |
|   `strokeWidth`   |                                                                                                       Any number                                                                                                        |              `1`               | The thickness of hte stroke of the nodes.                                                                                                                                                                                                                                                                                                                |
|   `orientation`   |                                                                                                `horizontal`, `vertical`                                                                                                 |          `horizontal`          | The orientation of the graph. If you want to work from top to bottom or from bottom to top, set `orientation` to `"vertical"`.                                                                                                                                                                                                                           |
|     `height`      |                                                                                                       Any number                                                                                                        |              `50`              | The height of the nodes.                                                                                                                                                                                                                                                                                                                                 |
|      `width`      |                                                                                                       Any number                                                                                                        |              `50`              | The width of the nodes. It is recommended to use the same value for `width` and `height`.                                                                                                                                                                                                                                                                |   
|   `autoLayout`    |                                                                                                    `true` or `false`                                                                                                    |            `false`             | If set to `true`, [dagre](https://github.com/dagrejs/dagre) is used to automatically determine to positions of the nodes. Individually set positions will be overwritten see [Node positioning](#node-positioning) for more information.                                                                                                                 |
| `strokeDasharray` |                                e.g. `3`, `5 3 1 3` ...<br/> see [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray#example) for more information                                |              `0`               | The pattern of dashes of the edges.                                                                                                                                                                                                                                                                                                                      |
|    `markerEnd`    | <code>{type: arrow&#124;arrowclosed, orient: &#60;orient value>, color: &#60;any CSS color>}</code><br/>For `orient`, see [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient#usage_notes) |              `{}`              | The arrowhead at the end of the edges. Notice that there are two options for `type`. `arrow` is a shallow arrow and `arrowclosed` will by filled. If you do not specify `color`, the color of the edge will also be the color of the arrow.                                                                                                              |
|   `makerStart`    | <code>{type: arrow&#124;arrowclosed, orient: &#60;orient value>, color: &#60;any CSS color>}</code><br/>For `orient`, see [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient#usage_notes) | `{orient: auto-start-reverse}` | The arrowhead at the beginning of the edges. Everytime you use `markerStart`, you should actually reverse the arrow if you want the arrow to point to the outside. If you do not specify an `orient`, this is done for you. You're welcome. If you want to point `markerStart` to the inside, you can still do that by giving `orient` the value `auto`. |

### Nodes

|     Key      |            Possible Values             |                                                                                               Default                                                                                               | Explanation                                                                                                                                                                                                                            |  
|:------------:|:--------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     `id`     |               Any string               | If `title` is unique among the nodes with no ID's, `title` becomes the ID. Otherwise `label`, otherwise `shape`, otherwise `image`. If nothing of that is possible, a random number becomes the ID. | Used to refer to the node.                                                                                                                                                                                                             |
|  `position`  |      `{x: <number>, y: <number>}`      |                                   `{x: 0, y: 0}`<br/> Except for when `autoLayout` is `true` in the global default settings of when `vgroup` or `hgroup` is used.                                   | The position of the node.                                                                                                                                                                                                              |
|   `vgroup`   |               Any string               |                                                                                             `undefined`                                                                                             | Used to vertically align a group of nodes. See [Node positioning](#node-positioning) for more information.                                                                                                                             |
|   `hgroup`   |               Any string               |                                                                                             `undefined`                                                                                             | Used to horizontally align a group of nodes. See [Node positioning](#node-positioning) for more information.                                                                                                                           |
|   `label`    |               Any string               |                                                                                             `undefined`                                                                                             | The text inside a node.                                                                                                                                                                                                                |
|   `title`    |               Any string               |                                                                                             `undefined`                                                                                             | The title of a node. E.g. useful to name a `parentNode`.                                                                                                                                                                               |
|   `image`    | Any URL, `comunica`,`rmlio` or `solid` |                                                                                             `undefined`                                                                                             | The image inside a node. This image takes up the entire `width` and `height` of the node. If `width` and `height` are different, the image might not scale well. It is best to use images in nodes with the same `width` and `height`. |
| `parentNode` |          The ID of the parent          |                                                                                             `undefined`                                                                                             | The parent of other nodes. If you want to add a node inside another node, you have to set `parentNode` in the child as the ID of the parent.                                                                                           |

`fill`, `fontsize`, `shape`, `stroke`, `strokeWidth`, `height` and `width` are explained in the
section [Global defaults](#global-defaults).

#### Node positioning

[As seen before](#nodes), you can set the positions of all nodes individually with the `position` key. But it is not
very efficient to set all nodes manually. There are three mechanisms to make the user's life easier:

- Use the `vgroup` attribute
    - See example 5 for a clear example. With `vgroup`, you can group nodes and automatically align them vertically. It
      is recommended to set the `position` of one node. All the other nodes are being placed below that node. Notice
      that the nodes is a list of JSON objects. The first node which position does not equal `{x: 0, y:0}` is used as a
      reference. All the `x` values are the value of the `x` of the reference node. The `y` values are adapted so that
      all nodes of the `vgroup` are being placed vertically. So if there are two or more nodes with a location not equal
      to `{x: 0, y:0}`, only the location of the first node of the array is kept. All the other locations are being
      overridden.
- Use the `hgroup` attribute
    - This is the same as `vgroup`, but the nodes are horizontally aligned. It is of course possible to mix vertical
      groups with horizontal groups. The order of evaluation is the order in which they occur in the array of nodes. If
      a node in the array is part of both a `vgroup` and an `hgroup`, the `vgroup` is evaluated first.
- Use the `autoLayout` key:
    - If set to `true`, [dagre](https://github.com/dagrejs/dagre) is used to position all the nodes. The keys `position`
      , `vgroup` and `hgroup` are ignored. This method works for very simple flows (e.g. example 1). If your flows start
      to get a little more complex, this method is not recommended, because dagre does not always work very well in
      combination with this project.

#### Predefined images

As mentioned before, the value of `image` can be a predefined value or a URL. If you want to add your own predefined
image, edit the hashmap `SHAPES` in the file [nodeUtil.js](/src/custom/node/nodeUtil.js). Pull requests are always
welcome.

#### Add examples

When using this application, you'll notice there are buttons to load examples. These buttons load in the
files [exampleData1.js](/src/data/exampleData1.js), [exampleData2.js](/src/data/exampleData2.js) ... So if you want to
add
an example, just create another file. In this file you should have a JSON object for the global defaults, an array of
nodes
and an array of edges. If your file is ready, import the JSON object and the arrays
in [EditorArea.js](/src/custom/editors/EditorArea.js) and add your imports to the array `examples`. A button to load in
your example will automatically be generated.

### Edges

TODO: alle properties in een tabelletje zetten
ook uitleggen da het eignl met style kan
voorbeelden geven hoe je animaties doet (ook reverse animaties enz)
