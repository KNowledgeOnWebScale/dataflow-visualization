# Array of edges

Type: `array`

<i id="edgeSchema">path: #edgeSchema</i>

<b id="edgeschema">&#36;id: edgeSchema</b>

 - **_Items_**
 - ## Edge
 - Type: `object`
 - <i id="edgeSchema/items">path: #edgeSchema/items</i>
 - **_Properties_**
	 - <b id="#edgeSchema/items/properties/animation">animation</b>
		 - _See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) for more information about animation. An example is e.g. `dashdraw .2s linear infinite` (has to start with 'dashdraw'). Note that you can just the value to `default`. The animation will then fall back to `dashdraw .45s linear infinite`. If the value is `reverse`, the fall back value will be `dashdraw .45s linear infinite reverse`. The strokeDashArray (if none is specified) will fall back to `6 4`. When set to `none`, no animation will be shown._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/animation">path: #edgeSchema/items/properties/animation</i>
		 - Example values: 
			 1. _"default"_
			 2. _"reverse"_
			 3. _"none"_
	 - <b id="#edgeSchema/items/properties/color">color</b>
		 - _The color of the edge._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/color">path: #edgeSchema/items/properties/color</i>
		 - Default: _"black"_
	 - <b id="#edgeSchema/items/properties/label">label</b>
		 - _Set the label of the edge._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/label">path: #edgeSchema/items/properties/label</i>
	 - <b id="#edgeSchema/items/properties/preset">preset</b>
		 - _Refer to a preset defined in the config of the global defaults. If you haven't used a key in your config (but that key is used in your preset), the key from the preset is taken as a key in your individual config. You can refer to multiple presets: the first preset has priority on the second, the second on the third, ... In general, the priority of the keys is: local > first preset > second preset > ... > keys in global default._
		 - Types: `array`, `string`
		 - <i id="edgeSchema/items/properties/preset">path: #edgeSchema/items/properties/preset</i>
	 - <b id="#edgeSchema/items/properties/thickness">thickness</b>
		 - _The thickness of the edge._
		 - Type: `number`
		 - <i id="edgeSchema/items/properties/thickness">path: #edgeSchema/items/properties/thickness</i>
		 - Default: `1.2`
	 - <b id="#edgeSchema/items/properties/strokeDasharray">strokeDasharray</b>
		 - _The pattern of dashes of the edges. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray#example) for more information. The default value `solid` will fall back to the CSS value `0`, `dashed` to `6 4, `dotted` to `1 3`, `varied` to `5 2 1 2` and dashed-wide-gaps will fall back to `4 8`._
		 - Types: `number`, `string`
		 - <i id="edgeSchema/items/properties/strokeDasharray">path: #edgeSchema/items/properties/strokeDasharray</i>
		 - Example values: 
			 1. _"solid"_
			 2. _"dashed"_
			 3. _"dotted"_
			 4. _"varied"_
			 5. _"dashed-wide-gaps"_
		 - Default: _"solid"_
	 - <b id="#edgeSchema/items/properties/source">source</b> `required`
		 - _ID of the source node._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/source">path: #edgeSchema/items/properties/source</i>
	 - <b id="#edgeSchema/items/properties/target">target</b> `required`
		 - _ID of the target node._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/target">path: #edgeSchema/items/properties/target</i>
	 - <b id="#edgeSchema/items/properties/sourceHandle">sourceHandle</b>
		 - _Set where the edge should attach to the source node._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/sourceHandle">path: #edgeSchema/items/properties/sourceHandle</i>
		 - The value is restricted to the following: 
			 1. _"left"_
			 2. _"right"_
			 3. _"top"_
			 4. _"bottom"_
	 - <b id="#edgeSchema/items/properties/targetHandle">targetHandle</b>
		 - _Set where the edge should attach to the target node._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/targetHandle">path: #edgeSchema/items/properties/targetHandle</i>
		 - The value is restricted to the following: 
			 1. _"left"_
			 2. _"right"_
			 3. _"top"_
			 4. _"bottom"_
	 - <b id="#edgeSchema/items/properties/type">type</b>
		 - _Set how the edge should look like (straight line, curve ...). `default` = [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/type">path: #edgeSchema/items/properties/type</i>
		 - The value is restricted to the following: 
			 1. _"default"_
			 2. _"step"_
			 3. _"smoothstep"_
			 4. _"straight"_
		 - Default: _"default"_
	 - <b id="#edgeSchema/items/properties/zIndex">zIndex</b>
		 - _Controls the stacking order of the edge. For more information, go to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)._
		 - Type: `number`
		 - <i id="edgeSchema/items/properties/zIndex">path: #edgeSchema/items/properties/zIndex</i>
	 - <b id="#edgeSchema/items/properties/markerStart">markerStart</b>
		 - #### Arrowhead schema
		 - Type: `object`
		 - <i id="edgeSchema/items/properties/markerStart">path: #edgeSchema/items/properties/markerStart</i>
		 - **_Properties_**
			 - <b id="#edgeSchema/items/properties/markerStart/properties/type">type</b>
				 - _Set the type of the arrowhead._
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerStart/properties/type">path: #edgeSchema/items/properties/markerStart/properties/type</i>
				 - The value is restricted to the following: 
					 1. _"arrow"_
					 2. _"arrowclosed"_
			 - <b id="#edgeSchema/items/properties/markerStart/properties/orient">orient</b>
				 - _Set the orient of the arrowhead. See [the MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient) for more information._
				 - Types: `string`, `number`
				 - <i id="edgeSchema/items/properties/markerStart/properties/orient">path: #edgeSchema/items/properties/markerStart/properties/orient</i>
			 - <b id="#edgeSchema/items/properties/markerStart/properties/color">color</b>
				 - _Set the color of the arrowhead. If you do not specify a color, the color of the arrowhead will be the same as the color of the edge._
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerStart/properties/color">path: #edgeSchema/items/properties/markerStart/properties/color</i>
			 - <b id="#edgeSchema/items/properties/markerStart/properties/size">size</b>
				 - _Set the size of the arrowhead._
				 - Type: `number`
				 - <i id="edgeSchema/items/properties/markerStart/properties/size">path: #edgeSchema/items/properties/markerStart/properties/size</i>
	 - <b id="#edgeSchema/items/properties/markerEnd">markerEnd</b>
		 - #### Arrowhead schema
		 - Type: `object`
		 - <i id="edgeSchema/items/properties/markerEnd">path: #edgeSchema/items/properties/markerEnd</i>
		 - **_Properties_**
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/type">type</b>
				 - _Set the type of the arrowhead._
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/type">path: #edgeSchema/items/properties/markerEnd/properties/type</i>
				 - The value is restricted to the following: 
					 1. _"arrow"_
					 2. _"arrowclosed"_
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/orient">orient</b>
				 - _Set the orient of the arrowhead. See [the MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient) for more information._
				 - Types: `string`, `number`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/orient">path: #edgeSchema/items/properties/markerEnd/properties/orient</i>
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/color">color</b>
				 - _Set the color of the arrowhead. If you do not specify a color, the color of the arrowhead will be the same as the color of the edge._
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/color">path: #edgeSchema/items/properties/markerEnd/properties/color</i>
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/size">size</b>
				 - _Set the size of the arrowhead._
				 - Type: `number`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/size">path: #edgeSchema/items/properties/markerEnd/properties/size</i>

_Generated with [json-schema-md-doc](https://brianwendt.github.io/json-schema-md-doc/)_