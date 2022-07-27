import React, {memo} from 'react';

import {Handle} from 'react-flow-renderer';

import comunica from "./assets/comunica.svg";
import rmlio from "./assets/rmlio.png";
import solid from "./assets/solid.svg";


/*const SHAPES = {
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
};*/

export function getShape(shapeId, fill, stroke, strokeWidth ) {
    const SHAPES = {
        "8-star":
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }}
                      d="m28.78 35.452-8.39-.1-5.86 6.003-5.86-6.002-8.39.1.1-8.389-6.001-5.86L.38 15.341l-.1-8.388 8.388.1 5.861-6.002 5.86 6.002 8.39-.1-.1 8.388 6.001 5.861-6.002 5.861z"
                      transform="matrix(1.22893 0 0 1.2302 7.144 -1.063)"/>
            </svg>,

        "big-star":
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path style={{fill: fill, fillRule: "evenodd", stroke: stroke, paintOrder: "markers fill stroke"}}
                      d="m20.048 19.912-7.264-3.291-1.742 7.783-2.81-7.464-6.735 4.272 3.292-7.265-7.783-1.742 7.464-2.81L.198 2.662l7.265 3.291L9.204-1.83l2.81 7.464 6.735-4.272-3.291 7.265 7.783 1.742-7.465 2.81z"
                      transform="matrix(1.7695 -.4742 .47414 1.76976 1.41 9.952)"/>
            </svg>,

        "circle":
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 0.4,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }} cx="25" cy="25" r="25"/>
            </svg>,

        "cylinder":
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                <g>
                    <path style={{fill: fill,/* TODO: opacity:0.8,*/ stroke: stroke, strokeWidth: strokeWidth}}
                          d="M25 6.897C11.669 6.897 0.862 5.353 0.862 3.448v43.103c0 1.904 10.807 3.448 24.138 3.448s24.138 -1.544 24.138 -3.448V3.448C49.138 5.353 38.331 6.897 25 6.897z"/>
                    <path style={{stroke: stroke, fill: fill, strokeWidth: strokeWidth}} cx="29" cy="4" rx="28" ry="4"
                          d="M49.138 3.448A24.138 3.448 0 0 1 25 6.897A24.138 3.448 0 0 1 0.862 3.448A24.138 3.448 0 0 1 49.138 3.448z"/>
                    <path style={{fill: fill, stroke: stroke, strokeWidth: strokeWidth}} cx="29" cy="54" rx="28" ry="4"
                          d="M49.138 46.552A24.138 3.448 0 0 1 25 50A24.138 3.448 0 0 1 0.862 46.552A24.138 3.448 0 0 1 49.138 46.552z"/>
                </g>
            </svg>,

        "diamond":
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }} transform="rotate(44.999)" d="M18.025-17.331h34.663v34.663H18.025z"/>
            </svg>,

        "hexagon":
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }} d="M14.249 25.648H-6.29L-16.56 7.862-6.29-9.924h20.538L24.517 7.862z"
                      transform="matrix(1.181 0 0 1.37277 20.3 14.253)"/>
            </svg>,


        "note":
        // Eerste fill op none laten, want dat is background
            <svg viewBox="6.579 6.579 50 50" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h63.158v63.158H0z"/>
                <path style={{stroke: stroke, fill: fill, strokeWidth: strokeWidth}}
                      d="M55.263 42.105l-13.166 13.158H10.521A2.621 2.621 0 0 1 7.895 52.65V10.508C7.895 9.066 9.066 7.895 10.508 7.895h42.142c1.442 0 2.613 1.176 2.613 2.629V42.105z"/>
            </svg>,

        "rectangle":
                <rect style={{fill:fill, stroke:stroke, strokeWidth: strokeWidth}} width="100%" height="100%" rx="3" />,

        "square":
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 0.4,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }} d="M0 0h49.5v49.5H0z"/>
            </svg>,

        "star":
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }}
                      d="m19.25 21.139-6.74-3.952-6.628 4.14 1.675-7.633-5.985-5.025 7.777-.765L12.278.66l3.131 7.159 7.795.547-5.841 5.19z"
                      transform="matrix(2.19417 0 0 2.30024 -2.178 -.121)"/>
            </svg>,

        "triangle":
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path style={{
                    fill: fill,
                    fillRule: "evenodd",
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    strokeDasharray: "none",
                    paintOrder: "markers fill stroke"
                }} d="M19.419 52.828H-8.407L5.506 28.731z" transform="matrix(1.73845 0 0 2.00674 15.428 -56.539)"/>
            </svg>,

        "comunica": <image href={comunica} width="100%" height="100%" preserveAspectRatio="xMinYMin slice"/>,
        "rmlio": <image href={rmlio} width="100%" height="100%" preserveAspectRatio="xMinYMin slice"/>,
        "solid": <image href={solid} width="100%" height="100%" preserveAspectRatio="xMinYMin slice" />
    }

    return SHAPES[shapeId];
}


export default memo(({data, isConnectable}) => {

    let width = data.width || 50;
    let height = data.height || 50;

    //console.log(`data.width is: ${data.width} en width is ${width}`)

    let element = getShape(data.shape || "square", data.fill || "white", data.stroke || "black", data.strokeWidth || 1);
    // console.log(element)

   // console.log(getShape("rmlio"))

    return (
        <>
            <svg style={{width: width, height: height}}>
                <svg style={{width: width}} key={Math.random()}>

                     {
                        element
                    }

                </svg>

                {/*<image style={{width: width, height: height}} href={SHAPES[data.shape]}/>*/}

                {/* <image href={rmlio} width="100%" height="100%" preserveAspectRatio="xMinYMin slice"/> */}

                  <svg style={{width: width, height:height}}>
                    {data.image &&
                        (getShape(data.image) || <image key={Math.random()} href={data.image} width="100%" height="100%" preserveAspectRatio="xMinYMin slice"/>)
                    }
                </svg>



                <text fontSize="12px"  /*x="50%" y="50%"*/ /*dominantBaseline="middle" textAnchor="middle"*/>
                    {data.title &&
                           <tspan key={Math.random()} x="50%" y={(data.strokeWidth || 1) + 12} dominantBaseline="middle" textAnchor="middle">{data.title}</tspan>
                    }
                    {data.label &&
                        data.label.split("\n").map((e, i) => {
                            if (i !== 0) {
                                return <tspan key={i} x="50%" dy="12px" dominantBaseline="middle"
                                              textAnchor="middle">{e}</tspan>
                            } else {
                                return <tspan key={i} x="50%"
                                              y={50 - ((data.label.split("\n").length - 1) * height / 12 / 2) + "%"}  // height/12, want fontsize is 12, TODO: dynamisch maken
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
