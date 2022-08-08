import React, {memo} from 'react';

import {Handle} from 'react-flow-renderer';

import {KEY_VALUES, NODE} from "../../lib/configParsing";
import {getShape} from "./nodeUtil";


//import cylinder from "../../assets/cylinder.svg"

export default memo(({data, isConnectable}) => {

    let width = data[KEY_VALUES[NODE].WIDTH.id];
    let height = data[KEY_VALUES[NODE].HEIGHT.id];

    let fontsize = data[KEY_VALUES[NODE].FONTSIZE.id];

    let element = getShape(data[KEY_VALUES[NODE].SHAPE.id], data[KEY_VALUES[NODE].FILL.id], data[KEY_VALUES[NODE].STROKE.id], data[KEY_VALUES[NODE].STROKE_WIDTH.id]);

    return (
        <>


            {/*

            https://www.geeksforgeeks.org/how-to-import-a-svg-file-in-javascript/

            <object type="image/svg+xml" data={cylinder} className="logo" style={{width: width, height: height, fill: "green", stroke: "blue", strokeWidth: 2}}>
                Logo
            </object>
            */}

            {/*
                 <img src={cylinder} alt="some file"  height='50'
                    width='50' style={{width: width, height: height, fill: "green", stroke: "blue", strokeWidth: 2}}
                   />
                 */}

            <svg style={{width: width, height: height}}>

                <svg style={{width: width}} key={Math.random()}>
                    {
                        element
                    }
                </svg>

                <svg style={{width: width, height: height}}>
                    {data[KEY_VALUES[NODE].IMAGE.id] &&
                        (getShape(data[KEY_VALUES[NODE].IMAGE.id]) ||
                            <image key={Math.random()} href={data[KEY_VALUES[NODE].IMAGE.id]} width="100%" height="100%"
                                   preserveAspectRatio="xMinYMin slice"/>)
                    }
                </svg>


                <text fontSize={fontsize}>
                    {data[KEY_VALUES[NODE].TITLE.id] &&
                        <tspan key={Math.random()} x="50%" y={(data[KEY_VALUES[NODE].STROKE_WIDTH.id] || 1) + fontsize}
                               dominantBaseline="middle" textAnchor="middle">{data.title}</tspan>
                    }
                    {data[KEY_VALUES[NODE].LABEL.id] &&
                        data.label.split("\n").map((e, i) => {
                            if (i !== 0) {
                                return <tspan key={i} x="50%" dy={fontsize} dominantBaseline="middle"
                                              textAnchor="middle">{e}</tspan>
                            } else {
                                return <tspan key={i} x="50%"
                                              y={50 - ((data[KEY_VALUES[NODE].LABEL.id].split("\n").length - 1) * height / fontsize / 2) + "%"}
                                              dominantBaseline="middle" textAnchor="middle">{e}</tspan>
                            }
                        })}

                </text>

            </svg>

            {
                // TODO: niet hardcoded, deze waarden zijn al eens gedefinieerd in een hashmap
                //  dus hergebruiken!!!

                // type, position, id
                [["source", "right", "right-source"], ["source", "bottom", "bottom-source"],
                    ["target", "left", "left-target"], ["target", "top", "top-target"],
                    ["source", "top", "top-source"], ["source", "left", "left-source"],
                    ["target", "bottom", "bottom-target"], ["target", "right", "right-target"]
                ].map((e, i) => {
                    return (
                        <Handle
                            type={e[0]}
                            position={e[1]}
                            id={e[2]}
                            style={{visibility: "hidden"}}
                            isConnectable={isConnectable}
                            key={i}
                        />
                    );
                })
            }

        </>
    );
});
