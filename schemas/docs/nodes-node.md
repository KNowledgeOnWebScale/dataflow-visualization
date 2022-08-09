## items Type

`object` ([Node](nodes-node.md))

# items Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                |
| :---------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------- |
| [fill](#fill)                       | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-fill.md "nodeSchema#/items/properties/fill")                       |
| [fontsize](#fontsize)               | `number` | Optional | cannot be null | [Array of nodes](nodes-node-properties-fontsize.md "nodeSchema#/items/properties/fontsize")               |
| [shape](#shape)                     | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-shape.md "nodeSchema#/items/properties/shape")                     |
| [stroke](#stroke)                   | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-stroke.md "nodeSchema#/items/properties/stroke")                   |
| [strokeDasharray](#strokedasharray) | Multiple | Optional | cannot be null | [Array of nodes](nodes-node-properties-strokedasharray.md "nodeSchema#/items/properties/strokeDasharray") |
| [strokeWidth](#strokewidth)         | `number` | Optional | cannot be null | [Array of nodes](nodes-node-properties-strokewidth.md "nodeSchema#/items/properties/strokeWidth")         |
| [height](#height)                   | `number` | Optional | cannot be null | [Array of nodes](nodes-node-properties-height.md "nodeSchema#/items/properties/height")                   |
| [width](#width)                     | `number` | Optional | cannot be null | [Array of nodes](nodes-node-properties-width.md "nodeSchema#/items/properties/width")                     |
| [id](#id)                           | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-id.md "nodeSchema#/items/properties/id")                           |
| [zIndex](#zindex)                   | `number` | Optional | cannot be null | [Array of nodes](nodes-node-properties-zindex.md "nodeSchema#/items/properties/zIndex")                   |
| [image](#image)                     | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-image.md "nodeSchema#/items/properties/image")                     |
| [label](#label)                     | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-label.md "nodeSchema#/items/properties/label")                     |
| [title](#title)                     | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-title.md "nodeSchema#/items/properties/title")                     |
| [parentNode](#parentnode)           | `string` | Optional | cannot be null | [Array of nodes](nodes-node-properties-parentnode.md "nodeSchema#/items/properties/parentNode")           |
| [position](#position)               | `object` | Optional | cannot be null | [Array of nodes](nodes-node-properties-position-schema.md "positionSchema#/items/properties/position")    |

## fill

Color of the node.

`fill`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-fill.md "nodeSchema#/items/properties/fill")

### fill Type

`string`

## fontsize

Size of the text inside the nodes.

`fontsize`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-fontsize.md "nodeSchema#/items/properties/fontsize")

### fontsize Type

`number`

## shape

The shape of the node.

`shape`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-shape.md "nodeSchema#/items/properties/shape")

### shape Type

`string`

### shape Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"8-star"`    |             |
| `"big-star"`  |             |
| `"circle"`    |             |
| `"cylinder"`  |             |
| `"diamond"`   |             |
| `"hexagon"`   |             |
| `"note"`      |             |
| `"rectangle"` |             |
| `"square"`    |             |
| `"star"`      |             |
| `"triangle"`  |             |
| `"comunica"`  |             |
| `"rmlio"`     |             |
| `"solid"`     |             |

## stroke

The color of the stroke of the node.

`stroke`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-stroke.md "nodeSchema#/items/properties/stroke")

### stroke Type

`string`

## strokeDasharray

The dash pattern of the node.

`strokeDasharray`

*   is optional

*   Type: any of the folllowing: `number` or `string` ([Details](nodes-node-properties-strokedasharray.md))

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-strokedasharray.md "nodeSchema#/items/properties/strokeDasharray")

### strokeDasharray Type

any of the folllowing: `number` or `string` ([Details](nodes-node-properties-strokedasharray.md))

## strokeWidth

The thickness of the stroke of the nodes.

`strokeWidth`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-strokewidth.md "nodeSchema#/items/properties/strokeWidth")

### strokeWidth Type

`number`

## height

The height of the node.

`height`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-height.md "nodeSchema#/items/properties/height")

### height Type

`number`

## width

The width of the node.

`width`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-width.md "nodeSchema#/items/properties/width")

### width Type

`number`

## id

Used to refer to the node.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-id.md "nodeSchema#/items/properties/id")

### id Type

`string`

## zIndex

Controls the stacking order of the nodes.

`zIndex`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-zindex.md "nodeSchema#/items/properties/zIndex")

### zIndex Type

`number`

## image

The image inside a node. This image takes up the entire width and height of the node.

`image`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-image.md "nodeSchema#/items/properties/image")

### image Type

`string`

## label

The text inside a node.

`label`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-label.md "nodeSchema#/items/properties/label")

### label Type

`string`

## title

The title of a node. E.g. useful to name a parentNode.

`title`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-title.md "nodeSchema#/items/properties/title")

### title Type

`string`

## parentNode

The parent of other nodes. If you want to add a node inside another node, you have to set `parentNode` in the child as the ID of the parent.

`parentNode`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-parentnode.md "nodeSchema#/items/properties/parentNode")

### parentNode Type

`string`

## position



`position`

*   is optional

*   Type: `object` ([Position schema](nodes-node-properties-position-schema.md))

*   cannot be null

*   defined in: [Array of nodes](nodes-node-properties-position-schema.md "positionSchema#/items/properties/position")

### position Type

`object` ([Position schema](nodes-node-properties-position-schema.md))
