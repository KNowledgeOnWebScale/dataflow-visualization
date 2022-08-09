# Array of nodes

Type: `array`

<i id="nodeSchema">path: #nodeSchema</i>

<b id="nodeschema">&#36;id: nodeSchema</b>

 - **_Items_**
 - ## Node
 - Type: `object`
 - <i id="nodeSchema/items">path: #nodeSchema/items</i>
 - **_Properties_**
	 - <b id="#nodeSchema/items/properties/fill">fill</b>
		 - _Color of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/fill">path: #nodeSchema/items/properties/fill</i>
	 - <b id="#nodeSchema/items/properties/fontsize">fontsize</b>
		 - _Size of the text inside the nodes._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/fontsize">path: #nodeSchema/items/properties/fontsize</i>
	 - <b id="#nodeSchema/items/properties/shape">shape</b>
		 - _The shape of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/shape">path: #nodeSchema/items/properties/shape</i>
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
	 - <b id="#nodeSchema/items/properties/stroke">stroke</b>
		 - _The color of the stroke of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/stroke">path: #nodeSchema/items/properties/stroke</i>
	 - <b id="#nodeSchema/items/properties/strokeDasharray">strokeDasharray</b>
		 - _The dash pattern of the node._
		 - Types: `number`, `string`
		 - <i id="nodeSchema/items/properties/strokeDasharray">path: #nodeSchema/items/properties/strokeDasharray</i>
	 - <b id="#nodeSchema/items/properties/strokeWidth">strokeWidth</b>
		 - _The thickness of the stroke of the nodes._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/strokeWidth">path: #nodeSchema/items/properties/strokeWidth</i>
	 - <b id="#nodeSchema/items/properties/height">height</b>
		 - _The height of the node._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/height">path: #nodeSchema/items/properties/height</i>
	 - <b id="#nodeSchema/items/properties/width">width</b>
		 - _The width of the node._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/width">path: #nodeSchema/items/properties/width</i>
	 - <b id="#nodeSchema/items/properties/id">id</b>
		 - _Used to refer to the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/id">path: #nodeSchema/items/properties/id</i>
	 - <b id="#nodeSchema/items/properties/zIndex">zIndex</b>
		 - _Controls the stacking order of the nodes._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/zIndex">path: #nodeSchema/items/properties/zIndex</i>
	 - <b id="#nodeSchema/items/properties/image">image</b>
		 - _The image inside a node. This image takes up the entire width and height of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/image">path: #nodeSchema/items/properties/image</i>
	 - <b id="#nodeSchema/items/properties/label">label</b>
		 - _The text inside a node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/label">path: #nodeSchema/items/properties/label</i>
	 - <b id="#nodeSchema/items/properties/title">title</b>
		 - _The title of a node. E.g. useful to name a parentNode._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/title">path: #nodeSchema/items/properties/title</i>
	 - <b id="#nodeSchema/items/properties/parentNode">parentNode</b>
		 - _The parent of other nodes. If you want to add a node inside another node, you have to set `parentNode` in the child as the ID of the parent._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/parentNode">path: #nodeSchema/items/properties/parentNode</i>
	 - <b id="#nodeSchema/items/properties/position">position</b>
		 - #### Position schema
		 - Type: `object`
		 - <i id="positionSchema">path: #positionSchema</i>
		 - <b id="positionschema">&#36;id: positionSchema</b>
		 - **_Properties_**
			 - <b id="#positionSchema/properties/x">x</b>
				 - Type: `number`
				 - <i id="positionSchema/properties/x">path: #positionSchema/properties/x</i>
			 - <b id="#positionSchema/properties/y">y</b>
				 - Type: `number`
				 - <i id="positionSchema/properties/y">path: #positionSchema/properties/y</i>

_Generated with [json-schema-md-doc](https://brianwendt.github.io/json-schema-md-doc/)_