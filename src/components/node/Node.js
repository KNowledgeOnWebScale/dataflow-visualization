import React, {memo} from 'react';

import {Handle} from 'react-flow-renderer';

import {KEY_VALUES, NODE} from "../../lib/configParsing";
import {getShape} from "./nodeUtil";
import customComponents from '../custom';

import loadable from '@loadable/component'

//import * as icons from 'react-icons/all'

import * as Ai from "react-icons/ai";
import * as Bi from "react-icons/bi";
import * as Fa from "react-icons/fa";



function shape({
                   shape,
                   iconName,
                   fill,
                   stroke,
                   strokeWidth,
                   strokeDashArray,
                   topText,
                   fontSize,
                   width,
                   height,
                   image,
                   title,
                   label
               }) {
    if (shape === "icon" && iconName) {

        iconName = "Fa/Bee";

        /* // Credits: https://github.com/react-icons/react-icons/issues/364#issuecomment-688817589
        const getDynamicIcon = (iconName = 'fa/FaFileExcel') => {
            const [library, iconComponent] = iconName.split('/')
            // console.log({ library, iconComponent })
            if (!library || !iconComponent) return

            const lib = library.toLowerCase()
            let ReactIcons = loadable.lib(() => import(`react-icons/ai`))
            if (lib === 'bs') {
                ReactIcons = loadable.lib(() => import(`react-icons/bs`))
            } else if (lib === 'bi') {
                ReactIcons = loadable.lib(() => import(`react-icons/bi`))
            } else if (lib === 'di') {
                ReactIcons = loadable.lib(() => import(`react-icons/di`))
            } else if (lib === 'fi') {
                ReactIcons = loadable.lib(() => import(`react-icons/fi`))
            } else if (lib === 'fc') {
                ReactIcons = loadable.lib(() => import(`react-icons/fc`))
            } else if (lib === 'fa') {
                ReactIcons = loadable.lib(() => import(`react-icons/fa`))
            } else if (lib === 'gi') {
                ReactIcons = loadable.lib(() => import(`react-icons/gi`))
            } else if (lib === 'go') {
                ReactIcons = loadable.lib(() => import(`react-icons/go`))
            } else if (lib === 'gr') {
                ReactIcons = loadable.lib(() => import(`react-icons/gr`))
            } else if (lib === 'hi') {
                ReactIcons = loadable.lib(() => import(`react-icons/hi`))
            } else if (lib === 'im') {
                ReactIcons = loadable.lib(() => import(`react-icons/im`))
            } else if (lib === 'io') {
                ReactIcons = loadable.lib(() => import(`react-icons/io`))
            } else if (lib === 'md') {
                ReactIcons = loadable.lib(() => import(`react-icons/md`))
            } else if (lib === 'ri') {
                ReactIcons = loadable.lib(() => import(`react-icons/ri`))
            } else if (lib === 'si') {
                ReactIcons = loadable.lib(() => import(`react-icons/si`))
            } else if (lib === 'ti') {
                ReactIcons = loadable.lib(() => import(`react-icons/ti`))
            } else if (lib === 'vsc') {
                ReactIcons = loadable.lib(() => import(`react-icons/vsc`))
            } else if (lib === 'wi') {
                ReactIcons = loadable.lib(() => import(`react-icons/wi`))
            } else if (lib === 'cg') {
                ReactIcons = loadable.lib(() => import(`react-icons/cg`))
            }


            return (
                <ReactIcons>
                    {({ [iconComponent]: Icon }) => {
                        return <Icon style={{ fontSize: 15, marginRight: 5 }} />
                    }}
                </ReactIcons>
            )

        }

        let icon = getDynamicIcon(iconName);

        //console.log(icon.type)
       // console.log(icon)

        return icon || <p>no</p>;*/

        let comp;

        let target = "FaBeer"

        /*try {
            console.log("ai")
            comp = Ai[target];
        } catch (e) {
            try {
                console.log("bi")
                comp = Bi[target];
            } catch (e) {
                try {
                    console.log("fa")
                    comp = Fa[target];  // should be this
                } catch (e) {
                    console.log("not found")
                    comp = <p>not found</p>
                }
            }
        }*/

       // console.log(Ai[target])

        if (Ai[target]) {
            // console.log("ai")
            comp = Ai[target];
        } else if (Bi[target]) {
            // console.log("bi")
            comp = Bi[target];
        } else if (Fa[target]) {
            // console.log("fa")
            comp = Fa[target]
        } else {
            // console.log("niet gevonden")
            comp = <p>not found</p>
        }


        // https://codesandbox.io/s/o715x22m4z?file=/src/index.js:365-426

        //console.log(comp)
        return React.createElement(comp)
    }


    let element = getShape(shape, fill, stroke, strokeWidth, strokeDashArray);
    if (!element) {
        return null;
    }
    return <>
        {topText &&
            <p style={{margin: 0, padding: 0, textAlign: "center", fontSize: fontSize - 1}}>{topText}</p>
        }
        <svg style={{width: width, height: height}}>
            {element}

            <svg /*viewBox={`0 ${s} ${width} ${height}`}*/ width={width} height={height}>
                {image &&
                    (getShape(image) || <image key={Math.random()} href={image} width={width} height={height}/>)
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

function component(props) {
    const {shape} = props;
    let Element = customComponents[shape];
    if (Element) {
        return <Element {...props}></Element>
    }
}

export default memo(({data, isConnectable}) => {

    let myShape = shape({
        shape: data[KEY_VALUES[NODE].SHAPE.id],
        iconName: data[KEY_VALUES[NODE].ICON_NAME.id],
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
            {myShape || <button></button>}

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
