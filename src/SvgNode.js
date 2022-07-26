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

export default memo(({data, isConnectable}) => {

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

    //console.log(`Data van SvgNode is ${JSON.stringify(data)}`);

    return (
        <>
            <svg width="70" height="70">
                <image style={{width: 70, height: 70}} href={SHAPES[data.shape]}/>
                <text fontSize="12px"  /*x="50%" y="50%"*/ /*dominantBaseline="middle" textAnchor="middle"*/>


                    {data.label.split("\n").map((e, i) => {
                        if (i !== 0) {
                            return <tspan key={i} x="50%" dy="1.2em" dominantBaseline="middle" textAnchor="middle">{e}</tspan>
                        } else {
                            return <tspan key={i} x="50%" y={50-(data.label.split("\n").length-1)*10 + "%"} dominantBaseline="middle" textAnchor="middle">{e}</tspan>
                        }
                    })}
                </text>
            </svg>


            <Handle
                type="target"
                position="left"
                id="left-target"
                style={{background: '#555'}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="target"
                position="top"
                id="top-target"
                style={{background: '#555'}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="right"
                id="right-source"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="bottom"
                id="bottom-source"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />

        </>
    );
});
