# Global defaults

_This schema is to define the properties inside the global defaults config._

Type: `object`

<i id="globalDefaultSchema">path: #globalDefaultSchema</i>

<b id="globaldefaultschema">&#36;id: globalDefaultSchema</b>

**_Properties_**

 - <b id="#globalDefaultSchema/properties/graph">graph</b>
	 - ### graph
	 - _graph in global defaults_
	 - Type: `object`
	 - <i id="globalDefaultsGraph">path: #globalDefaultsGraph</i>
	 - <b id="globaldefaultsgraph">&#36;id: globalDefaultsGraph</b>
	 - **_Properties_**
		 - <b id="#globalDefaultsGraph/properties/autoLayout">autoLayout</b>
			 - _If set to true, an algorithm is used to automaticaly determine the positions of the nodes._
			 - Type: `boolean`
			 - <i id="globalDefaultsGraph/properties/autoLayout">path: #globalDefaultsGraph/properties/autoLayout</i>
		 - <b id="#globalDefaultsGraph/properties/orientation">orientation</b>
			 - _The orientation of the graph. Set to `vertical` if you want to work from top to bottom or bottom to top._
			 - Type: `string`
			 - <i id="globalDefaultsGraph/properties/orientation">path: #globalDefaultsGraph/properties/orientation</i>
			 - The value is restricted to the following: 
				 1. _"vertical"_
				 2. _"horizontal"_
 - <b id="#globalDefaultSchema/properties/node">node</b>
	 - ### node
	 - _node in global defaults_
	 - Type: `object`
	 - <i id="globalDefaultsNode">path: #globalDefaultsNode</i>
	 - <b id="globaldefaultsnode">&#36;id: globalDefaultsNode</b>
	 - **_Properties_**
		 - <b id="#globalDefaultsNode/properties/fill">fill</b>
			 - _Color of the node._
			 - Type: `string`
			 - <i id="globalDefaultsNode/properties/fill">path: #globalDefaultsNode/properties/fill</i>
		 - <b id="#globalDefaultsNode/properties/fontsize">fontsize</b>
			 - _Size of the text inside the nodes._
			 - Type: `number`
			 - <i id="globalDefaultsNode/properties/fontsize">path: #globalDefaultsNode/properties/fontsize</i>
		 - <b id="#globalDefaultsNode/properties/shape">shape</b>
			 - _The shape of the node._
			 - Type: `string`
			 - <i id="globalDefaultsNode/properties/shape">path: #globalDefaultsNode/properties/shape</i>
			 - The value is restricted to the following: 
				 1. _"8-star"_
				 2. _"big-star"_
				 3. _"circle"_
				 4. _"cylinder"_
				 5. _"diamond"_
				 6. _"hexagon"_
				 7. _"note"_
				 8. _"rectangle"_
				 9. _"square"_
				 10. _"star"_
				 11. _"triangle"_
				 12. _"comunica"_
				 13. _"rmlio"_
				 14. _"solid"_
		 - <b id="#globalDefaultsNode/properties/stroke">stroke</b>
			 - _The color of the stroke of the node._
			 - Type: `string`
			 - <i id="globalDefaultsNode/properties/stroke">path: #globalDefaultsNode/properties/stroke</i>
		 - <b id="#globalDefaultsNode/properties/strokeDasharray">strokeDasharray</b>
			 - _The dash pattern of the node._
			 - Types: `number`, `string`
			 - <i id="globalDefaultsNode/properties/strokeDasharray">path: #globalDefaultsNode/properties/strokeDasharray</i>
		 - <b id="#globalDefaultsNode/properties/strokeWidth">strokeWidth</b>
			 - _The thickness of the stroke of the nodes._
			 - Type: `number`
			 - <i id="globalDefaultsNode/properties/strokeWidth">path: #globalDefaultsNode/properties/strokeWidth</i>
		 - <b id="#globalDefaultsNode/properties/height">height</b>
			 - _The height of the node._
			 - Type: `number`
			 - <i id="globalDefaultsNode/properties/height">path: #globalDefaultsNode/properties/height</i>
		 - <b id="#globalDefaultsNode/properties/width">width</b>
			 - _The width of the node._
			 - Type: `number`
			 - <i id="globalDefaultsNode/properties/width">path: #globalDefaultsNode/properties/width</i>
		 - <b id="#globalDefaultsNode/properties/zIndex">zIndex</b>
			 - _Controls the stacking order of the nodes._
			 - Type: `number`
			 - <i id="globalDefaultsNode/properties/zIndex">path: #globalDefaultsNode/properties/zIndex</i>
		 - <b id="#globalDefaultsNode/properties/image">image</b>
			 - _The image inside a node. This image takes up the entire width and height of the node._
			 - Type: `string`
			 - <i id="globalDefaultsNode/properties/image">path: #globalDefaultsNode/properties/image</i>
		 - <b id="#globalDefaultsNode/properties/label">label</b>
			 - _The text inside a node._
			 - Type: `string`
			 - <i id="globalDefaultsNode/properties/label">path: #globalDefaultsNode/properties/label</i>
 - <b id="#globalDefaultSchema/properties/edge">edge</b>
	 - ### edge
	 - _edge in global defaults_
	 - Type: `object`
	 - <i id="globalDefaultsEdge">path: #globalDefaultsEdge</i>
	 - <b id="globaldefaultsedge">&#36;id: globalDefaultsEdge</b>
	 - **_Properties_**
		 - <b id="#globalDefaultsEdge/properties/color">color</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/color">path: #globalDefaultsEdge/properties/color</i>
		 - <b id="#globalDefaultsEdge/properties/thickness">thickness</b>
			 - Type: `number`
			 - <i id="globalDefaultsEdge/properties/thickness">path: #globalDefaultsEdge/properties/thickness</i>
		 - <b id="#globalDefaultsEdge/properties/strokeDasharray">strokeDasharray</b>
			 - Types: `number`, `string`
			 - <i id="globalDefaultsEdge/properties/strokeDasharray">path: #globalDefaultsEdge/properties/strokeDasharray</i>
		 - <b id="#globalDefaultsEdge/properties/animated">animated</b>
			 - Type: `boolean`
			 - <i id="globalDefaultsEdge/properties/animated">path: #globalDefaultsEdge/properties/animated</i>
		 - <b id="#globalDefaultsEdge/properties/animation">animation</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/animation">path: #globalDefaultsEdge/properties/animation</i>
		 - <b id="#globalDefaultsEdge/properties/type">type</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/type">path: #globalDefaultsEdge/properties/type</i>
			 - The value is restricted to the following: 
				 1. _"default"_
				 2. _"step"_
				 3. _"smoothstep"_
				 4. _"straight"_
		 - <b id="#globalDefaultsEdge/properties/zIndex">zIndex</b>
			 - Type: `number`
			 - <i id="globalDefaultsEdge/properties/zIndex">path: #globalDefaultsEdge/properties/zIndex</i>
		 - <b id="#globalDefaultsEdge/properties/label">label</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/label">path: #globalDefaultsEdge/properties/label</i>
		 - <b id="#globalDefaultsEdge/properties/source">source</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/source">path: #globalDefaultsEdge/properties/source</i>
		 - <b id="#globalDefaultsEdge/properties/target">target</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/target">path: #globalDefaultsEdge/properties/target</i>
		 - <b id="#globalDefaultsEdge/properties/sourceHandle">sourceHandle</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/sourceHandle">path: #globalDefaultsEdge/properties/sourceHandle</i>
			 - The value is restricted to the following: 
				 1. _"left-source"_
				 2. _"right-source"_
				 3. _"top-source"_
				 4. _"bottom-source"_
		 - <b id="#globalDefaultsEdge/properties/targetHandle">targetHandle</b>
			 - Type: `string`
			 - <i id="globalDefaultsEdge/properties/targetHandle">path: #globalDefaultsEdge/properties/targetHandle</i>
			 - The value is restricted to the following: 
				 1. _"left-target"_
				 2. _"right-target"_
				 3. _"top-target"_
				 4. _"bottom-target"_
		 - <b id="#globalDefaultsEdge/properties/markerStart">markerStart</b>
			 - ##### Arrowhead schema
			 - Type: `object`
			 - <i id="globalDefaultsEdge/properties/markerStart">path: #globalDefaultsEdge/properties/markerStart</i>
			 - **_Properties_**
				 - <b id="#globalDefaultsEdge/properties/markerStart/properties/type">type</b>
					 - Type: `string`
					 - <i id="globalDefaultsEdge/properties/markerStart/properties/type">path: #globalDefaultsEdge/properties/markerStart/properties/type</i>
					 - The value is restricted to the following: 
						 1. _"arrow"_
						 2. _"arrowclosed"_
				 - <b id="#globalDefaultsEdge/properties/markerStart/properties/orient">orient</b>
					 - Types: `string`, `number`
					 - <i id="globalDefaultsEdge/properties/markerStart/properties/orient">path: #globalDefaultsEdge/properties/markerStart/properties/orient</i>
				 - <b id="#globalDefaultsEdge/properties/markerStart/properties/color">color</b>
					 - Type: `string`
					 - <i id="globalDefaultsEdge/properties/markerStart/properties/color">path: #globalDefaultsEdge/properties/markerStart/properties/color</i>
		 - <b id="#globalDefaultsEdge/properties/markerEnd">markerEnd</b>
			 - ##### Arrowhead schema
			 - Type: `object`
			 - <i id="globalDefaultsEdge/properties/markerEnd">path: #globalDefaultsEdge/properties/markerEnd</i>
			 - **_Properties_**
				 - <b id="#globalDefaultsEdge/properties/markerEnd/properties/type">type</b>
					 - Type: `string`
					 - <i id="globalDefaultsEdge/properties/markerEnd/properties/type">path: #globalDefaultsEdge/properties/markerEnd/properties/type</i>
					 - The value is restricted to the following: 
						 1. _"arrow"_
						 2. _"arrowclosed"_
				 - <b id="#globalDefaultsEdge/properties/markerEnd/properties/orient">orient</b>
					 - Types: `string`, `number`
					 - <i id="globalDefaultsEdge/properties/markerEnd/properties/orient">path: #globalDefaultsEdge/properties/markerEnd/properties/orient</i>
				 - <b id="#globalDefaultsEdge/properties/markerEnd/properties/color">color</b>
					 - Type: `string`
					 - <i id="globalDefaultsEdge/properties/markerEnd/properties/color">path: #globalDefaultsEdge/properties/markerEnd/properties/color</i>

_Generated with [json-schema-md-doc](https://brianwendt.github.io/json-schema-md-doc/)_