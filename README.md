# Flow Visualization

This is an application to generate flow graphs from JSON.

## How to run
Visit https://tibostr.github.io/dataflow-visualization/. If you want to run this application run locally, run `npm start` and open http://localhost:3000/.

## Documentation

If you [run the application](#how-to-run), you'll see that there are three editors. One to set [global defaults](#global-defaults), one to describe the [nodes](#nodes) and one for the [connections](#edges) between these nodes.

### Global defaults
Global defaults are useful when a lot of nodes and/or edges have the same properties and you don't want to repeat yourself everytime. These global default values are used as fallbacks if certain properties are not specified within the nodes or edges.

|       Key       |                                                                                 Possible Values                                                                                  | Default        | Explanation                                                                                                                    |  
|:---------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------|:-------------------------------------------------------------------------------------------------------------------------------|
|   `edgeColor`   |                                                Any css color is valid, e.g. `"steelblue"`, `"#FFD700"`, `"rgb(65, 105, 225)"` ...                                                | `"black"`      | The color of the edges between the nodes.                                                                                      |
| `edgeThickness` |                                                                                    Any number                                                                                    | `1.2`          | The thickness of the edges between the nodes.                                                                                  |
|     `fill`      |                                                                                  Any css color                                                                                   | `white`        | The color of the nodes.                                                                                                        |  
 |   `fontsize`    |                                                                                    Any number                                                                                    | `12`           | The fontsize of the text in the nodes.                                                                                         |
 |     `shape`     | `"8-star"`, `"big-star"`, `"circle"`, `"cylinder"`, `"diamond"`, `"hexagon"`, `"note"`, `"rectangle"`, `"square"`, `"star"`, `"triangle"`,<br/>`"comunica"`,`"rmlio"`, `"solid"` | `"square"`     | The shape of the nodes.                                                                                                        |
|    `stroke`     |                                                                                  Any css color                                                                                   | `"black"`      | The color of the stroke of the nodes.                                                                                          |
|  `strokeWidth`  |                                                                                    Any number                                                                                    | `1`            | The thickness of hte stroke of the nodes.                                                                                      |
|  `orientation`  |                                                                           `"horizontal"`, `"vertical"`                                                                           | `"horizontal"` | The orientation of the graph. If you want to work from top to bottom or from bottom to top, set `orientation` to `"vertical"`. |
|    `height`     |                                                                                    Any number                                                                                    | `50`           | The height of the nodes.                                                                                                       |
|     `width`     |                                                                                    Any number                                                                                    | `50`           | The width of the nodes. It is recommended to use the same value for `width` and `height`.                                      |


### Nodes


### Edges
