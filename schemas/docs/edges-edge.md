## items Type

`object` ([Edge](edges-edge.md))

# items Properties

| Property                            | Type      | Required | Nullable       | Defined by                                                                                                |
| :---------------------------------- | :-------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------- |
| [color](#color)                     | `string`  | Optional | cannot be null | [Array of edges](edges-edge-properties-color.md "edgeSchema#/items/properties/color")                     |
| [thickness](#thickness)             | `number`  | Optional | cannot be null | [Array of edges](edges-edge-properties-thickness.md "edgeSchema#/items/properties/thickness")             |
| [strokeDasharray](#strokedasharray) | Multiple  | Optional | cannot be null | [Array of edges](edges-edge-properties-strokedasharray.md "edgeSchema#/items/properties/strokeDasharray") |
| [animated](#animated)               | `boolean` | Optional | cannot be null | [Array of edges](edges-edge-properties-animated.md "edgeSchema#/items/properties/animated")               |
| [animation](#animation)             | `string`  | Optional | cannot be null | [Array of edges](edges-edge-properties-animation.md "edgeSchema#/items/properties/animation")             |
| [type](#type)                       | `string`  | Optional | cannot be null | [Array of edges](edges-edge-properties-type.md "edgeSchema#/items/properties/type")                       |
| [zIndex](#zindex)                   | `number`  | Optional | cannot be null | [Array of edges](edges-edge-properties-zindex.md "edgeSchema#/items/properties/zIndex")                   |
| [label](#label)                     | `string`  | Optional | cannot be null | [Array of edges](edges-edge-properties-label.md "edgeSchema#/items/properties/label")                     |
| [source](#source)                   | `string`  | Required | cannot be null | [Array of edges](edges-edge-properties-source.md "edgeSchema#/items/properties/source")                   |
| [target](#target)                   | `string`  | Required | cannot be null | [Array of edges](edges-edge-properties-target.md "edgeSchema#/items/properties/target")                   |
| [sourceHandle](#sourcehandle)       | `string`  | Optional | cannot be null | [Array of edges](edges-edge-properties-sourcehandle.md "edgeSchema#/items/properties/sourceHandle")       |
| [targetHandle](#targethandle)       | `string`  | Optional | cannot be null | [Array of edges](edges-edge-properties-targethandle.md "edgeSchema#/items/properties/targetHandle")       |
| [markerStart](#markerstart)         | `object`  | Optional | cannot be null | [Array of edges](edges-edge-properties-arrowhead-schema.md "edgeSchema#/items/properties/markerStart")    |
| [markerEnd](#markerend)             | `object`  | Optional | cannot be null | [Array of edges](edges-edge-properties-arrowhead-schema-1.md "edgeSchema#/items/properties/markerEnd")    |

## color



`color`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-color.md "edgeSchema#/items/properties/color")

### color Type

`string`

## thickness



`thickness`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-thickness.md "edgeSchema#/items/properties/thickness")

### thickness Type

`number`

## strokeDasharray



`strokeDasharray`

*   is optional

*   Type: any of the folllowing: `number` or `string` ([Details](edges-edge-properties-strokedasharray.md))

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-strokedasharray.md "edgeSchema#/items/properties/strokeDasharray")

### strokeDasharray Type

any of the folllowing: `number` or `string` ([Details](edges-edge-properties-strokedasharray.md))

## animated



`animated`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-animated.md "edgeSchema#/items/properties/animated")

### animated Type

`boolean`

## animation



`animation`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-animation.md "edgeSchema#/items/properties/animation")

### animation Type

`string`

## type



`type`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-type.md "edgeSchema#/items/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"default"`    |             |
| `"step"`       |             |
| `"smoothstep"` |             |
| `"straight"`   |             |

## zIndex



`zIndex`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-zindex.md "edgeSchema#/items/properties/zIndex")

### zIndex Type

`number`

## label



`label`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-label.md "edgeSchema#/items/properties/label")

### label Type

`string`

## source



`source`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-source.md "edgeSchema#/items/properties/source")

### source Type

`string`

## target



`target`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-target.md "edgeSchema#/items/properties/target")

### target Type

`string`

## sourceHandle



`sourceHandle`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-sourcehandle.md "edgeSchema#/items/properties/sourceHandle")

### sourceHandle Type

`string`

### sourceHandle Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"left-source"`   |             |
| `"right-source"`  |             |
| `"top-source"`    |             |
| `"bottom-source"` |             |

## targetHandle



`targetHandle`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-targethandle.md "edgeSchema#/items/properties/targetHandle")

### targetHandle Type

`string`

### targetHandle Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"left-target"`   |             |
| `"right-target"`  |             |
| `"top-target"`    |             |
| `"bottom-target"` |             |

## markerStart



`markerStart`

*   is optional

*   Type: `object` ([Arrowhead schema](edges-edge-properties-arrowhead-schema.md))

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-arrowhead-schema.md "edgeSchema#/items/properties/markerStart")

### markerStart Type

`object` ([Arrowhead schema](edges-edge-properties-arrowhead-schema.md))

## markerEnd



`markerEnd`

*   is optional

*   Type: `object` ([Arrowhead schema](edges-edge-properties-arrowhead-schema-1.md))

*   cannot be null

*   defined in: [Array of edges](edges-edge-properties-arrowhead-schema-1.md "edgeSchema#/items/properties/markerEnd")

### markerEnd Type

`object` ([Arrowhead schema](edges-edge-properties-arrowhead-schema-1.md))
