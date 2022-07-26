import React, {memo} from 'react';

import {Handle} from 'react-flow-renderer';

import eightStar from "./assets/8-star.svg";
import bigStar from "./assets/big-star.svg";
import circle from "./assets/circle.svg";
import cylinder from "./assets/cylinder.svg";
import diamond from "./assets/diamond.svg";
import hexagon from "./assets/hexagon.svg";
import note from "./assets/note.svg";
import square from "./assets/square.svg";
import star from "./assets/star.svg";
import triangle from "./assets/triangle.svg";

import comunica from "./assets/comunica.svg";
import rmlio from "./assets/rmlio.png";



const SHAPES = {
    "8-star": eightStar,
    "big-star": bigStar,
    "circle": circle,
    "cylinder": cylinder,
    "diamond": diamond,
    "hexagon": hexagon,
    "note": note,
    "square": square,
    "star": star,
    "triangle": triangle,
    "comunica": comunica,
    "rmlio": rmlio
};

export function getShape(shapeId, fill="none", stroke="#000", strokeWidth=1) {
    const SHAPES = {
        "8-star":
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <path style={{fill:fill, fillRule:"evenodd", stroke:stroke,strokeWidth:strokeWidth,strokeDasharray:"none",paintOrder:"markers fill stroke"}} d="m28.78 35.452-8.39-.1-5.86 6.003-5.86-6.002-8.39.1.1-8.389-6.001-5.86L.38 15.341l-.1-8.388 8.388.1 5.861-6.002 5.86 6.002 8.39-.1-.1 8.388 6.001 5.861-6.002 5.861z" transform="matrix(1.22893 0 0 1.2302 7.144 -1.063)"/>
                </svg>,

        "big-star":
            `<svg xml:space="preserve" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <path style="fill:${fill};fill-rule:evenodd;stroke:${stroke};stroke-width:${strokeWidth};paint-order:markers fill stroke" d="m20.048 19.912-7.264-3.291-1.742 7.783-2.81-7.464-6.735 4.272 3.292-7.265-7.783-1.742 7.464-2.81L.198 2.662l7.265 3.291L9.204-1.83l2.81 7.464 6.735-4.272-3.291 7.265 7.783 1.742-7.465 2.81z" transform="matrix(1.7695 -.4742 .47414 1.76976 1.41 9.952)"/>
                </svg>`,

       // "circle":
        //    <svg width="50mm" height="50mm" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
         //           <circle style="fill:${fill};fill-rule:evenodd;stroke:${stroke};stroke-width:${strokeWidth};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:.4;stroke-dasharray:none;paint-order:markers fill stroke" cx="25" cy="25" r="25"/>
          //      </svg>
    }

    return SHAPES[shapeId];
}


export default memo(({data, isConnectable}) => {



    //console.log(`Data van SvgNode is ${JSON.stringify(data)}`);

    //alert(JSON.stringify(data))



    let width = data["width"] || 50;
    let height = data["height"] || 50;

    let element = getShape("8-star");
   // console.log(element)

    return (

        <>
            <svg style={{width: width, height: height}}>
                getShape("8-star")
                <svg style={{width: width}}>

                    {
                       element
                    }

                </svg>




                {/*<image style={{width: width, height: height}} href={SHAPES[data.shape]}/>*/}

                <text fontSize="12px"  /*x="50%" y="50%"*/ /*dominantBaseline="middle" textAnchor="middle"*/>
                    {data.label.split("\n").map((e, i) => {
                        if (i !== 0) {
                            return <tspan key={i} x="50%" dy="12px" dominantBaseline="middle"
                                          textAnchor="middle">{e}</tspan>
                        } else {
                            return <tspan key={i} x="50%" y={50 - ((data.label.split("\n").length - 1) * height/12/2) + "%"}  // height/12, want fontsize is 12, TODO: dynamisch maken
                                          dominantBaseline="middle" textAnchor="middle">{e}</tspan>
                        }
                    })}
                </text>

            </svg>

            <Handle
                type="source"
                position="right"
                id="right-source"
                style={{visibility: "hidden"}}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="bottom"
                id="bottom-source"
                style={{visibility: "hidden"}}
                isConnectable={isConnectable}
            />

            <Handle
                type="target"
                position="left"
                id="left-target"
                // style={{background: '#555'}}
                style={{visibility: "hidden"}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="target"
                position="top"
                id="top-target"
                style={{visibility: "hidden"}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="top"
                id="top-source"
                style={{visibility: "hidden"}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="left"
                id="left-source"
                style={{visibility: "hidden"}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="target"
                position="bottom"
                id="bottom-target"
                style={{visibility: "hidden"}}
                isConnectable={isConnectable}
            />

            <Handle
                type="target"
                position="right"
                id="right-target"
                style={{visibility: "hidden"}}
                isConnectable={isConnectable}
            />

        </>
    );
});
