# Array of edges

Type: `array`

<i id="edgeSchema">path: #edgeSchema</i>

<b id="edgeschema">&#36;id: edgeSchema</b>

 - **_Items_**
 - ## Edge
 - Type: `object`
 - <i id="edgeSchema/items">path: #edgeSchema/items</i>
 - **_Properties_**
	 - <b id="#edgeSchema/items/properties/color">color</b>
		 - _The color of the edge._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/color">path: #edgeSchema/items/properties/color</i>
	 - <b id="#edgeSchema/items/properties/thickness">thickness</b>
		 - _The thickness of the edge._
		 - Type: `number`
		 - <i id="edgeSchema/items/properties/thickness">path: #edgeSchema/items/properties/thickness</i>
	 - <b id="#edgeSchema/items/properties/strokeDasharray">strokeDasharray</b>
		 - _The pattern of dashes of the edges. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray#example) for more information._
		 - Types: `number`, `string`
		 - <i id="edgeSchema/items/properties/strokeDasharray">path: #edgeSchema/items/properties/strokeDasharray</i>
	 - <b id="#edgeSchema/items/properties/animated">animated</b>
		 - _Set a default animation for the edge. See also [Animations](https://github.com/KNowledgeOnWebScale/dataflow-visualization/tree/main#animations)._
		 - Type: `boolean`
		 - <i id="edgeSchema/items/properties/animated">path: #edgeSchema/items/properties/animated</i>
	 - <b id="#edgeSchema/items/properties/animation">animation</b>
		 - _See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) for more information about animation._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/animation">path: #edgeSchema/items/properties/animation</i>
	 - <b id="#edgeSchema/items/properties/type">type</b>
		 - _Set how the edge should look like (straight line, curve ...). `default` = [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/type">path: #edgeSchema/items/properties/type</i>
		 - The value is restricted to the following: 
			 1. _"default"_
			 2. _"step"_
			 3. _"smoothstep"_
			 4. _"straight"_
	 - <b id="#edgeSchema/items/properties/zIndex">zIndex</b>
		 - _Controls the stacking order of the edge. For more information, go to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)._
		 - Type: `number`
		 - <i id="edgeSchema/items/properties/zIndex">path: #edgeSchema/items/properties/zIndex</i>
	 - <b id="#edgeSchema/items/properties/label">label</b>
		 - _Set the label of the edge._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/label">path: #edgeSchema/items/properties/label</i>
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
			 1. _"left-source"_
			 2. _"right-source"_
			 3. _"top-source"_
			 4. _"bottom-source"_
	 - <b id="#edgeSchema/items/properties/targetHandle">targetHandle</b>
		 - _Set where the edge should attach to the target node._
		 - Type: `string`
		 - <i id="edgeSchema/items/properties/targetHandle">path: #edgeSchema/items/properties/targetHandle</i>
		 - The value is restricted to the following: 
			 1. _"left-target"_
			 2. _"right-target"_
			 3. _"top-target"_
			 4. _"bottom-target"_
	 - <b id="#edgeSchema/items/properties/markerStart">markerStart</b>
		 - #### Arrowhead schema
		 - Type: `object`
		 - <i id="edgeSchema/items/properties/markerStart">path: #edgeSchema/items/properties/markerStart</i>
		 - **_Properties_**
			 - <b id="#edgeSchema/items/properties/markerStart/properties/type">type</b>
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerStart/properties/type">path: #edgeSchema/items/properties/markerStart/properties/type</i>
				 - The value is restricted to the following: 
					 1. _"arrow"_
					 2. _"arrowclosed"_
			 - <b id="#edgeSchema/items/properties/markerStart/properties/orient">orient</b>
				 - Types: `string`, `number`
				 - <i id="edgeSchema/items/properties/markerStart/properties/orient">path: #edgeSchema/items/properties/markerStart/properties/orient</i>
			 - <b id="#edgeSchema/items/properties/markerStart/properties/color">color</b>
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerStart/properties/color">path: #edgeSchema/items/properties/markerStart/properties/color</i>
	 - <b id="#edgeSchema/items/properties/markerEnd">markerEnd</b>
		 - #### Arrowhead schema
		 - Type: `object`
		 - <i id="edgeSchema/items/properties/markerEnd">path: #edgeSchema/items/properties/markerEnd</i>
		 - **_Properties_**
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/type">type</b>
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/type">path: #edgeSchema/items/properties/markerEnd/properties/type</i>
				 - The value is restricted to the following: 
					 1. _"arrow"_
					 2. _"arrowclosed"_
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/orient">orient</b>
				 - Types: `string`, `number`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/orient">path: #edgeSchema/items/properties/markerEnd/properties/orient</i>
			 - <b id="#edgeSchema/items/properties/markerEnd/properties/color">color</b>
				 - Type: `string`
				 - <i id="edgeSchema/items/properties/markerEnd/properties/color">path: #edgeSchema/items/properties/markerEnd/properties/color</i>

_Generated with [json-schema-md-doc](https://brianwendt.github.io/json-schema-md-doc/)_