# Development

This document is aimed at developers.

### How to autogenerate the documentation

In [index.js](src/index.js) set the variable `download` to `true`. Rerun the application and set the variable to `false`
again. You will notice there were three JSON files downloaded. Paste the contents of these files in the accompanying
files in the directory [schemas/schemas](schemas/schemas). Open your terminal, `cd` to `/schemas` and
run `node JSONSchemaMarkdown.js`. The new markdowns will be generated. [README.md](README.md) already links to these files.

### How to add shapes/images

As mentioned in the documentation, the value of `image` can be a predefined value or a URL. If you want to add your own
predefined
image, edit the hashmap `SHAPES` in the file [nodeUtil.js](./src/components/node/nodeUtil.js). Pull requests are always
welcome.

### How to add examples

When using this application, you'll notice there are buttons to load examples. These buttons load in the
files [exampleData1.js](./src/data/examples/exampleData1.js), [exampleData2.js](./src/data/examples/exampleData2.js) ...
So if you want to
add
an example, just create another file. In this file, you should have a JSON object for the global defaults, an array of
nodes
and an array of edges. If your file is ready, import the JSON object and the arrays
in [examples.js](./src/data/examples.js) and add your imports to the array `examples`. A button to load in
your example will automatically show up if you restart this application.


