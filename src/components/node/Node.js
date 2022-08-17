import React, {memo} from 'react';

import {Handle} from 'react-flow-renderer';

import {KEY_VALUES, NODE} from "../../lib/configParsing";
import {getShape} from "./nodeUtil";
import customComponents from '../custom';

//import cylinder from "../../assets/cylinder.svg"

function shape({ shape, fill, stroke, strokeWidth, strokeDashArray, topText, fontSize, width, height, image, title, label }) {
    let element = getShape(shape, fill, stroke, strokeWidth, strokeDashArray);
    if (!element) {
        return null;
    }
    return <>
        {topText &&
            <p style={{ margin: 0, padding: 0, textAlign: "center", fontSize: fontSize - 1 }}>{topText}</p>
        }
        <svg style={{ width: width, height: height }}>
            {element}

            <svg /*viewBox={`0 ${s} ${width} ${height}`}*/ width={width} height={height}>
                {image &&
                    (getShape(image) || <image key={Math.random()} href={image} width={width} height={height} />)
                }
            </svg>

            <text fontSize={fontSize}>
                {title &&
                    <tspan key={Math.random()} x="50%"
                        y={(strokeWidth || 1) + fontSize}
                        dominantBaseline="middle" textAnchor="middle">{title}</tspan>
                }
                {label &&
                    label.split("\n").map((e, i) => {
                        if (i !== 0) {
                            return <tspan key={i} x="50%" dy={fontSize} dominantBaseline="middle"
                                textAnchor="middle">{e}</tspan>
                        } else {
                            return <tspan key={i} x="50%"
                                y={50 - ((label.split("\n").length - 1) * height / fontSize / 2) + "%"}
                                dominantBaseline="middle" textAnchor="middle">{e}</tspan>
                        }
                    })}
            </text>
        </svg>
    </>
}

function component(props){
    const {shape} = props;
    let Element = customComponents[shape];
    if (Element) {
        return <Element {...props}></Element>
    }
}

export default memo(({ data, isConnectable }) => {

    let myShape = shape({
        shape: data[KEY_VALUES[NODE].SHAPE.id],
        fill: data[KEY_VALUES[NODE].FILL.id],
        stroke: data[KEY_VALUES[NODE].STROKE.id],
        strokeWidth: data[KEY_VALUES[NODE].STROKE_WIDTH.id],
        strokeDashArray: data[KEY_VALUES[NODE].STROKE_DASHARRAY.id],
        topText: data[KEY_VALUES[NODE].TOP_TEXT.id],
        fontSize: data[KEY_VALUES[NODE].FONTSIZE.id],
        width: data[KEY_VALUES[NODE].WIDTH.id],
        height: data[KEY_VALUES[NODE].HEIGHT.id],
        image: data[KEY_VALUES[NODE].IMAGE.id],
        title: data[KEY_VALUES[NODE].TITLE.id],
        label: data[KEY_VALUES[NODE].LABEL.id]
    })

    let myCustomComponent = component({
        shape: data[KEY_VALUES[NODE].SHAPE.id],
        topText: data[KEY_VALUES[NODE].TOP_TEXT.id],
        fontSize: data[KEY_VALUES[NODE].FONTSIZE.id],
        width: data[KEY_VALUES[NODE].WIDTH.id],
        height: data[KEY_VALUES[NODE].HEIGHT.id],
        image: data[KEY_VALUES[NODE].IMAGE.id],
        title: data[KEY_VALUES[NODE].TITLE.id],
        label: data[KEY_VALUES[NODE].LABEL.id]
    })

    // TODO refactor this: should be either a shape OR a custom component
    return (
        <>
            {myShape}

            {myCustomComponent}

            {
                // TODO: niet hardcoded, deze waarden zijn al eens gedefinieerd in een hashmap
                //  dus hergebruiken!!!

                // type, position, id
                /* [["source", "right", "right-source"], ["source", "bottom", "bottom-source"],
                     ["target", "left", "left-target"], ["target", "top", "top-target"],
                     ["source", "top", "top-source"], ["source", "left", "left-source"],
                     ["target", "bottom", "bottom-target"], ["target", "right", "right-target"]*/
                [["source", "right", "right"], ["source", "bottom", "bottom"],
                ["target", "left", "left"], ["target", "top", "top"],
                ["source", "top", "top"], ["source", "left", "left"],
                ["target", "bottom", "bottom"], ["target", "right", "right"]
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
