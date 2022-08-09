## graph Type

`object` ([graph](globaldefaults-properties-graph.md))

# graph Properties

| Property                    | Type      | Required | Nullable       | Defined by                                                                                                                                  |
| :-------------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| [autoLayout](#autolayout)   | `boolean` | Optional | cannot be null | [Global defaults](globaldefaults-properties-graph-properties-autolayout.md "globalDefaultsGraph#/properties/graph/properties/autoLayout")   |
| [orientation](#orientation) | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-graph-properties-orientation.md "globalDefaultsGraph#/properties/graph/properties/orientation") |

## autoLayout

If set to true, an algorithm is used to automaticaly determine the positions of the nodes.

`autoLayout`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-graph-properties-autolayout.md "globalDefaultsGraph#/properties/graph/properties/autoLayout")

### autoLayout Type

`boolean`

## orientation

The orientation of the graph. Set to `vertical` if you want to work from top to bottom or bottom to top.

`orientation`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-graph-properties-orientation.md "globalDefaultsGraph#/properties/graph/properties/orientation")

### orientation Type

`string`

### orientation Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"vertical"`   |             |
| `"horizontal"` |             |
