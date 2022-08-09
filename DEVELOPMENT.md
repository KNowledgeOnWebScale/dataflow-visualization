# Development

This document is aimed at developers.

### How to autogenerate documentation

TODO

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


