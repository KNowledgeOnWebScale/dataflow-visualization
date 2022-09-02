<!-- omit in toc -->

# Flow Visualization

This is a [React] application to generate flow graphs from [JSON] or [YAML].
It is built on top of [ReactFlow].

- [How to run](#how-to-run)
- [Documentation](#documentation)
    - [Global defaults](#global-defaults)
    - [Nodes](#nodes)
    - [Edges](#edges)
    - [Buttons](#buttons)
- [FAQ](#faq)
- [License](#license)

## How to run

Visit https://knowledgeonwebscale.github.io/dataflow-visualization/. If you want to run this application locally,
run `npm start`
and open http://localhost:3000/.

## Documentation

If you [run the application](#how-to-run), you'll see that there are three editors. One to
set [global defaults](#global-defaults), one to describe the [nodes](#nodes) and one for the [connections](#edges)
between these nodes (edges). The editors you see are the same editors used
by [Visual Studio Code](https://code.visualstudio.com/).
This means that you can use shortcuts like `ctrl+shift+i` for indentation or `ctrl+z` to undo your last change. You can
also open the command palette by hitting the `F1`-key.

Note when reading this documentation: this is a [React] application, so all ID's/properties are
written in [camelCase](https://en.wikipedia.org/wiki/Camel_case).

### Global defaults

Global defaults are useful when a lot of nodes and/or edges have the same properties and you don't want to repeat
yourself every time. These global default values are used as fallbacks if certain properties are not specified within
the
nodes or edges.

* More info: [global defaults](schemas/docs/globaldefaults-doc.md)

### Nodes

* More info: [nodes](schemas/docs/nodes-doc.md)

#### ID

IDs are used by the edges to refer to a node. But IDs are not mandatory. If no ID is specified:

* If the node has a unique `title`, the title becomes the ID.
* If the node has a unique `label`, that label becomes the ID.
* If the node has a unique `shape`, that shape becomes the ID.
* If the node has a unique `image`, that image becomes the ID.
* Otherwise, there is no way (as the end user) to refer to that node.

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

* More info: [edges](schemas/docs/edges-doc.md)

### Controls

When running this application, you'll see that there are a few buttons visible.

#### Example buttons

These buttons are for loading examples.

#### Import/export buttons

These buttons are to import and export entire configs (format is JSON). This feature is useful if you want to save
configurations for later.

There is also a button to export the raw data. This is the data needed for [ReactFlow] to draw up a flow.

#### 'Fill in' button

Manually typing positions for the nodes is not so easy. And sometimes mechanisms like `vgroup`, `hgroup` or `autoLayout`
might give different results then expected.

When a diagram is visible, you can drag the nodes around with your mouse. Once all nodes are in the correct place, click
the button and the new positions will be filled in into the node config.

#### Language switcher button

There are two languages supported in which you can describe your flow: [JSON] and [YAML]. Use this dropdown button to
pick the language of your preference.

#### Permalink button

If you click on that button, a link is copied to the clipboard. If you paste this link into your favorite search engine,
the flow will show up in full screen. This is useful if you want to embed the flow into your website.

If you have a link, you can create an iframe like this:

```html

<iframe width=600 height=600 src="<permalink>"></iframe>

```

See [DEVELOPMENT.md](DEVELOPMENT.md#permalink) for more information about the structure of the link.

#### Autosync button

If this switch is toggled on, the flow will render automatically if the config has been changed and is valid.

#### Snap to grid button

If this switch is toggled, the nodes will be snapped to the grid. If this switch is not toggled, you can move the nodes
more freely.

#### Enter permalink input field

If you have a link `https://knowledgeonwebscale.github.io/dataflow-visualization/#/customdata?...`, you can enter that
link in the text input field. The configs encoded in that URL will be filled in into the editors, so you can edit and
create a new permalink.

#### Undo/redo buttons

With undo, you can go to a previous (valid) configuration, and with redo, you can move forward.

*Autosync enabled*  
The state of the configs is saved if there has been more than two seconds elapsed since the latest change in one of
the editors.

If you click on e.g. redo you load in the previous config. That configuration will, of course, not be saved again (
unless you make a change).

*Autsync disabled*  
The state of the configs will be saved every time you press 'convert' and your configs are valid.

#### Create simulation button

When clicking on this button, you'll be redirected to a new page. On that page you can create multiple configs. When
clicking 'convert' you'll be able to animate the flow by visualizing one config after the other.

#### Navigation bar

Next to the window where your flow is shown, you see a gray bar. This is some sort of "jump bar". Depending on where
you click on the bar, you'll jump to the height of a different node. If you click somewhere at the very top of the bar,
you'll jump to the height of the most upper node. The lower you click, the lower the node that will be picked as
reference height. If you click somewhere at the bottom of the bar, you'll jump to the y position of the lowest node.

This navigation bar is very useful when you want to quickly navigate in a very large network of (vertical oriented)
nodes.

## FAQ

#### I have an animated edge. How do I change the direction of this animation without messing up my layout?

You could of course switch `source` and `target`. But when using `autoLayout`, this may mess up your layout a bit. A
solution could be to use the `animation` key. If you have `animation` set to e.g. `dashdraw .6s linear infinite`, you
can just change this to `dashdraw .6s linear infinite reverse` and your problem is solved. If you're satisfied with the
default animations, there is also an option to set `animation` to `reverse`.

#### The sizing of some nodes don't seem to work. Why?

Some shapes are only defined by an aspect ratio. So changing that ratio simply makes it another shape. For example,
setting a
different width and height for the shapes `square`
, `cirle` ... does not make sense.

If you do set e.g. a `square` to a width of e.g. 50 and a height of e.g. 100. Then the largest possible square will be
drawn inside a box of 50 by 100 (so in this case, you can expect a height of 50).

## License

This project is licensed under the terms of the MIT License. See [LICENSE.md](LICENSE.md) for details.


[JSON]: https://www.json.org/

[YAML]: https://yaml.org/

[React]: https://reactjs.org/

[ReactFlow]: https://reactflow.dev/
