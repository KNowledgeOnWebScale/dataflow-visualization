# Array of nodes

Type: `array`

<i id="nodeSchema">path: #nodeSchema</i>

<b id="nodeschema">&#36;id: nodeSchema</b>

 - **_Items_**
 - ## Node
 - Type: `object`
 - <i id="nodeSchema/items">path: #nodeSchema/items</i>
 - **_Properties_**
	 - <b id="#nodeSchema/items/properties/height">height</b>
		 - _The height of the node._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/height">path: #nodeSchema/items/properties/height</i>
		 - Default: `50`
	 - <b id="#nodeSchema/items/properties/width">width</b>
		 - _The width of the node._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/width">path: #nodeSchema/items/properties/width</i>
		 - Default: `50`
	 - <b id="#nodeSchema/items/properties/fill">fill</b>
		 - _Color of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/fill">path: #nodeSchema/items/properties/fill</i>
		 - Default: _"white"_
	 - <b id="#nodeSchema/items/properties/fontsize">fontsize</b>
		 - _Size of the text inside the nodes._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/fontsize">path: #nodeSchema/items/properties/fontsize</i>
		 - Default: `12`
	 - <b id="#nodeSchema/items/properties/id">id</b>
		 - _Used to refer to the node. Used by e.g. an edge to connect two nodes or used by children to specify its parent node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/id">path: #nodeSchema/items/properties/id</i>
	 - <b id="#nodeSchema/items/properties/image">image</b>
		 - _The image inside a node. This image takes up the entire width and height of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/image">path: #nodeSchema/items/properties/image</i>
	 - <b id="#nodeSchema/items/properties/label">label</b>
		 - _The text inside a node. If you want a newline in your text, you should manually put '\n' in your string. If the label does not fit the node in which it appears, `fontsize` will be made smaller so label fits its node (the minimum value to which `fontsize` will be reduced, is the defined `fontsize` divided by two)._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/label">path: #nodeSchema/items/properties/label</i>
	 - <b id="#nodeSchema/items/properties/parentNode">parentNode</b>
		 - _The parent of other nodes. If you want to add a node inside another node, you have to set `parentNode` in the child as the ID of the parent._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/parentNode">path: #nodeSchema/items/properties/parentNode</i>
	 - <b id="#nodeSchema/items/properties/preset">preset</b>
		 - _Refer to a preset defined in the config of the global defaults. If you haven't used a key in your config (but that key is used in your preset), the key from the preset is taken as a key in your individual config. You can refer to multiple presets: the first preset has priority on the second, the second on the third, ... In general, the priority of the keys is: local > first preset > second preset > ... > keys in global default._
		 - Types: `array`, `string`
		 - <i id="nodeSchema/items/properties/preset">path: #nodeSchema/items/properties/preset</i>
	 - <b id="#nodeSchema/items/properties/shape">shape</b>
		 - _The shape of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/shape">path: #nodeSchema/items/properties/shape</i>
		 - The value is restricted to the following: 
			 1. _"icon"_
			 2. _"8-star"_
			 3. _"big-star"_
			 4. _"circle"_
			 5. _"cylinder"_
			 6. _"diamond"_
			 7. _"ellipse"_
			 8. _"hexagon"_
			 9. _"note"_
			 10. _"rectangle"_
			 11. _"square"_
			 12. _"star"_
			 13. _"triangle"_
			 14. _"comunica"_
			 15. _"rmlio"_
			 16. _"solid"_
			 17. _"Details"_
		 - Default: _"square"_
	 - <b id="#nodeSchema/items/properties/iconName">iconName</b>
		 - _When 'shape' is set to 'icon', you can set 'iconName' to anything you find in [react-icons](https://react-icons.github.io/react-icons/). Since this is a third-party library, not all styling will work. Only `fill`, `strokeWidth`, `width` and `height` will have effect._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/iconName">path: #nodeSchema/items/properties/iconName</i>
	 - <b id="#nodeSchema/items/properties/stroke">stroke</b>
		 - _The color of the stroke of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/stroke">path: #nodeSchema/items/properties/stroke</i>
		 - Default: _"black"_
	 - <b id="#nodeSchema/items/properties/strokeDasharray">strokeDasharray</b>
		 - _The dash pattern of the node. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray#example) for more information. The default value `solid` will fall back to the CSS value `0`, `dashed` to `6 4, `dotted` to `1 3`, `varied` to `5 2 1 2` and dashed-wide-gaps will fall back to `4 8`._
		 - Types: `number`, `string`
		 - <i id="nodeSchema/items/properties/strokeDasharray">path: #nodeSchema/items/properties/strokeDasharray</i>
		 - Example values: 
			 1. _"solid"_
			 2. _"dashed"_
			 3. _"dotted"_
			 4. _"varied"_
			 5. _"dashed-wide-gaps"_
		 - Default: _"solid"_
	 - <b id="#nodeSchema/items/properties/strokeWidth">strokeWidth</b>
		 - _The thickness of the stroke of the nodes._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/strokeWidth">path: #nodeSchema/items/properties/strokeWidth</i>
		 - Default: `1`
	 - <b id="#nodeSchema/items/properties/title">title</b>
		 - _The title of a node. E.g. useful to name a parentNode. Notice that this is not the same as an ID. If you give a node a title, that title will show up not in the middle of the node, but at the top. If the title does not fit the node in which it appears, `fontsize` will be made smaller to fit the node (the minimum value to which `fontsize` will be reduced, is the defined `fontsize` divided by two)._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/title">path: #nodeSchema/items/properties/title</i>
	 - <b id="#nodeSchema/items/properties/topText">topText</b>
		 - _Set on top of the node._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/topText">path: #nodeSchema/items/properties/topText</i>
	 - <b id="#nodeSchema/items/properties/zIndex">zIndex</b>
		 - _Controls the stacking order of the nodes._
		 - Type: `number`
		 - <i id="nodeSchema/items/properties/zIndex">path: #nodeSchema/items/properties/zIndex</i>
		 - Default: `0`
	 - <b id="#nodeSchema/items/properties/hgroup">hgroup</b>
		 - _Align a group of nodes vertically._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/hgroup">path: #nodeSchema/items/properties/hgroup</i>
	 - <b id="#nodeSchema/items/properties/vgroup">vgroup</b>
		 - _Align a group of nodes horizontally._
		 - Type: `string`
		 - <i id="nodeSchema/items/properties/vgroup">path: #nodeSchema/items/properties/vgroup</i>
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