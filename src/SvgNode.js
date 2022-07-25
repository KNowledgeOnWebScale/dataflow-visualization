import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

import eightStar from "./assets/8-star.svg"
import bigStar from "./assets/big-star.svg"
import cylinder from "./assets/cylinder.svg";
import diamond from "./assets/diamond.svg";
import hexagon from "./assets/hexagon.svg";
import note from "./assets/note.svg";
import star from "./assets/star.svg";
import triangle from "./assets/triangle.svg";

import comunica from "./assets/comunica.svg";
import rmlio from "./assets/rmlio.png"

export default memo(({ data, isConnectable }) => {

    const SHAPES = {
       "8-star": eightStar, "big-star": bigStar, "cylinder": cylinder, "diamond": diamond, "hexagon": hexagon, "note": note, "star": star, "triangle": triangle,
        "comunica": comunica, "rmlio": rmlio
    };

    // console.log(`Data van SvgNode is ${JSON.stringify(data)}`);

    return (
        <>
            <svg width="50" height="50">
                <image width="50" height="50" href={SHAPES[data.shape]}/>
                <text fontSize="12px" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{data.label}</text>
            </svg>



            <Handle
                type="target"
                position="left"
                id="left-target"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="target"
                position="top"
                id="top-target"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="right"
                id="right-src"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position="bottom"
                id="bot-src"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />

        </>
    );
});
