<!-- omit in toc -->
# Flow Visualization

This is a [React] application to generate flow graphs from [JSON](https://www.json.org/) or [YAML](https://yaml.org/).
It is built on top of [ReactFlow].

- [How to run](#how-to-run)
- [Documentation](#documentation)
  - [Global defaults](#global-defaults)
  - [Nodes](#nodes)
  - [Edges](#edges)
- [License](#license)

## How to run

Visit https://knowledgeonwebscale.github.io/dataflow-visualization/. If you want to run this application locally, run `npm start`
and open http://localhost:3000/.

## Documentation

If you [run the application](#how-to-run), you'll see that there are three editors. One to
set [global defaults](#global-defaults), one to describe the [nodes](#nodes) and one for the [connections](#edges)
between these nodes (edges).

Note when reading this documentation: this is a [React] application, so all ID's/properties are
written in [camelCase](https://en.wikipedia.org/wiki/Camel_case).

### Global defaults

Global defaults are useful when a lot of nodes and/or edges have the same properties and you don't want to repeat
yourself every time. These global default values are used as fallbacks if certain properties are not specified within
the
nodes or edges.

* [Global defaults](schemas/docs/globaldefaults-doc.md)


### Nodes

*   [Array of nodes](schemas/docs/nodes-doc.md) 

#### Node positioning

[As seen before](#nodes), you can set the positions of all nodes individually with the `position` key. But it is not
very efficient to set all nodes manually. There are three mechanisms to make the user's life easier:

- Use the `vgroup` attribute
    - See example 4 for a clear example. With `vgroup`, you can group nodes and automatically align them vertically. It
      is recommended to set the `position` of one node. All the other nodes are being placed below that node. Notice
      that the nodes is a list of JSON objects. The first node whose position does not equal `{x: 0, y:0}` is used as a
      reference. All the `x` values are the value of the `x` of the reference node. The `y` values are adapted so that
      all nodes of the `vgroup` are placed vertically. So if there are two or more nodes with a location not equal
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


### Edges

*   [Edges](schemas/docs/edges-doc.md)


Note that you can also set `animation`, `edgeColor`, `edgeThickness` and `strokeDasharray` as CSS properties in `style`.
If that
happens, `animation`, `stroke`, `strokeWidth` or `strokeDasharray` in `style` are of course not overwritten by possible
values in
global defaults.

#### Animations

There is a key `animated`, which you can set to `true`. But if you want custom animations, you should use
the `animation` property. An example of the standard `animated` key can be found in example 2. Custom animations can be
found in example 6. For more information about the `animation` property, please check out
the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation). If you use `animated` with
no `strokeDasharray`, `strokeDasharray` is set to a value of `5`. If you use a custom `animation`, the `animated` key
has no effect anymore.

## License

This project is licensed under the terms of the MIT License. See [LICENSE.md](/LICENSE.md) for details.

[React]: https://reactjs.org/
[ReactFlow]: https://reactflow.dev/
