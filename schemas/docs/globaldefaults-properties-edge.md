## edge Type

`object` ([edge](globaldefaults-properties-edge.md))

# edge Properties

| Property                            | Type      | Required | Nullable       | Defined by                                                                                                                                       |
| :---------------------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| [color](#color)                     | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-color.md "globalDefaultsEdge#/properties/edge/properties/color")                     |
| [thickness](#thickness)             | `number`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-thickness.md "globalDefaultsEdge#/properties/edge/properties/thickness")             |
| [strokeDasharray](#strokedasharray) | Multiple  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-strokedasharray.md "globalDefaultsEdge#/properties/edge/properties/strokeDasharray") |
| [animated](#animated)               | `boolean` | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-animated.md "globalDefaultsEdge#/properties/edge/properties/animated")               |
| [animation](#animation)             | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-animation.md "globalDefaultsEdge#/properties/edge/properties/animation")             |
| [type](#type)                       | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-type.md "globalDefaultsEdge#/properties/edge/properties/type")                       |
| [zIndex](#zindex)                   | `number`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-zindex.md "globalDefaultsEdge#/properties/edge/properties/zIndex")                   |
| [label](#label)                     | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-label.md "globalDefaultsEdge#/properties/edge/properties/label")                     |
| [source](#source)                   | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-source.md "globalDefaultsEdge#/properties/edge/properties/source")                   |
| [target](#target)                   | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-target.md "globalDefaultsEdge#/properties/edge/properties/target")                   |
| [sourceHandle](#sourcehandle)       | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-sourcehandle.md "globalDefaultsEdge#/properties/edge/properties/sourceHandle")       |
| [targetHandle](#targethandle)       | `string`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-targethandle.md "globalDefaultsEdge#/properties/edge/properties/targetHandle")       |
| [markerStart](#markerstart)         | `object`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-arrowhead-schema.md "globalDefaultsEdge#/properties/edge/properties/markerStart")    |
| [markerEnd](#markerend)             | `object`  | Optional | cannot be null | [Global defaults](globaldefaults-properties-edge-properties-arrowhead-schema-1.md "globalDefaultsEdge#/properties/edge/properties/markerEnd")    |

## color



`color`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-color.md "globalDefaultsEdge#/properties/edge/properties/color")

### color Type

`string`

## thickness



`thickness`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-thickness.md "globalDefaultsEdge#/properties/edge/properties/thickness")

### thickness Type

`number`

## strokeDasharray



`strokeDasharray`

*   is optional

*   Type: any of the folllowing: `number` or `string` ([Details](globaldefaults-properties-edge-properties-strokedasharray.md))

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-strokedasharray.md "globalDefaultsEdge#/properties/edge/properties/strokeDasharray")

### strokeDasharray Type

any of the folllowing: `number` or `string` ([Details](globaldefaults-properties-edge-properties-strokedasharray.md))

## animated



`animated`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-animated.md "globalDefaultsEdge#/properties/edge/properties/animated")

### animated Type

`boolean`

## animation



`animation`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-animation.md "globalDefaultsEdge#/properties/edge/properties/animation")

### animation Type

`string`

## type



`type`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-type.md "globalDefaultsEdge#/properties/edge/properties/type")

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

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-zindex.md "globalDefaultsEdge#/properties/edge/properties/zIndex")

### zIndex Type

`number`

## label



`label`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-label.md "globalDefaultsEdge#/properties/edge/properties/label")

### label Type

`string`

## source



`source`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-source.md "globalDefaultsEdge#/properties/edge/properties/source")

### source Type

`string`

## target



`target`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-target.md "globalDefaultsEdge#/properties/edge/properties/target")

### target Type

`string`

## sourceHandle



`sourceHandle`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-sourcehandle.md "globalDefaultsEdge#/properties/edge/properties/sourceHandle")

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

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-targethandle.md "globalDefaultsEdge#/properties/edge/properties/targetHandle")

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

*   Type: `object` ([Arrowhead schema](globaldefaults-properties-edge-properties-arrowhead-schema.md))

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-arrowhead-schema.md "globalDefaultsEdge#/properties/edge/properties/markerStart")

### markerStart Type

`object` ([Arrowhead schema](globaldefaults-properties-edge-properties-arrowhead-schema.md))

## markerEnd



`markerEnd`

*   is optional

*   Type: `object` ([Arrowhead schema](globaldefaults-properties-edge-properties-arrowhead-schema-1.md))

*   cannot be null

*   defined in: [Global defaults](globaldefaults-properties-edge-properties-arrowhead-schema-1.md "globalDefaultsEdge#/properties/edge/properties/markerEnd")

### markerEnd Type

`object` ([Arrowhead schema](globaldefaults-properties-edge-properties-arrowhead-schema-1.md))
