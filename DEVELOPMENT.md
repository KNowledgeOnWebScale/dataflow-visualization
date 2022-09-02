# Development

This document is aimed at developers.

### How to autogenerate the documentation

Run `npm run build:docs`. This uses the Jest runner to re-create the schemas and their documentation,
and stores them in the accompanying
files in the directory [schemas/schemas](schemas/schemas).
The new markdowns will be generated, [README.md](README.md) already links to these
files.

Note that there is a pre-commit hook (see [.husky](.husky)) that regenerates the docs.

### How to add shapes/images

As mentioned in the documentation, the value of `image` can be a predefined value or a URL. If you want to add your own
predefined
image, edit the hashmap `SHAPES` in the file [nodeUtil.js](./src/components/node/nodeUtil.js). Then add the name of your
shape to the array `shapes` in [configParsing.js](src/lib/configParsing.js). Pull requests are always
welcome.

Note that there are already thousands of shapes supported. In your node config, you can set `shape` to `icon`. Then you
can set the key `iconName` to anything defined in the [react-icons](https://react-icons.github.io/react-icons) library.

### How to add a custom React component as a node

Add your custom React component under the [custom](./src/components/custom/) folder and add an entry
to [index.js](./src/components/custom/index.js).
See the `Details` component for an example.

### How to add examples

#### Single-config flow

When using this application, you'll notice there are buttons to load examples. These buttons load in the
files [exampleData1.js](src/data/single-flow/examples/exampleData1.js)
, [exampleData2.js](src/data/single-flow/examples/exampleData2.js) ...
So if you want to
add
an example, just create another file. In this file, you should have a JSON object for the global defaults, an array of
nodes
and an array of edges. Optionally, you can set a title as well. This will be the text inside the button (so the contents
of the buttons don't have to be `example x`). If your file is ready, import everything
in [examples.js](src/data/single-flow/examples.js) and add your imports to the array `examples`. A button to load in
your example will automatically show up if you restart the application.

#### Multi-config flow

The buttons to load in multi-config flows are shown on the page where you build your simulation.
There is already an example provided. See e.g., [example1/](src/data/simulation-flow/examples). To make your own
example,
make a new folder where you put every step in a different file. As with the single-config examples, you should have a
JSON object for the global defaults, an array for the nodes, and an array for the edges. When you have created your
configs, import them in [examples.js](src/data/simulation-flow/examples.js). Next, add your imports to the
hashmap `examples` the same way
this is done by the other examples. The keys of the hashmap (e.g. `example 1`) will be the text on the buttons (that
once again will show up automatically). However, you can't deviate from the keys `step0`, `step1`, `...` .

### Permalink

There is a button to get a link to your flow. There are three formats for a link.

1) `https://knowledgeonwebscale.github.io/dataflow-visualization/#/customdata?globaldefaults=...&nodes=...&edges=...`
    * The query parameters are the URI-encoded values of what's inside the editors.
2) `https://knowledgeonwebscale.github.io/dataflow-visualization/#/rawdata?nodes=...&edges=...`
    * The query parameters are the URI-encoded values of the raw data of the flow. Remember, there is a button to export
      the raw data.
3) `https://knowledgeonwebscale.github.io/dataflow-visualization/#/online?location=...`
    * The query parameter is a URL to an online JSON file. The structure of that file should be the same as the
      structure when you export your config.

If you press the button to copy the permalink to your clipboard, you get the first link (`customdata`). 

